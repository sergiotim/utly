"use server";

import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import z from "zod";

async function checkUrl(url: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1500);
  try {
    await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
    });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function detectProtocol(domain: string) {
  const clean = domain.trim();

  let tempUrlStr = `https://${clean}`;

  if (/^https?:\/\//i.test(clean)) {
    tempUrlStr = clean;
  }

  let hostname;

  try {
    hostname = new URL(tempUrlStr).hostname;
  } catch {
    return clean;
  }

  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.") ||
    hostname.endsWith(".local")
  ) {
    return null;
  }

  if (/^https?:\/\//i.test(clean)) {
    return clean;
  }

  if (await checkUrl(`https://${clean}`)) {
    return `https://${clean}`;
  }
  if (await checkUrl(`http://${clean}`)) {
    return `http://${clean}`;
  }

  return `https://${clean}`;
}

const slugSchema = z
  .string()
  .min(3, "O apelido deve ter pelo menos 3 caracteres.")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "O apelido só pode ter letras, números, hífens e underlines."
  )
  .optional()
  .or(z.literal(""));

const urlSchema = z.string().refine((val) => {
  try {
    return !!new URL(val);
  } catch {
    return false;
  }
}, "O site informado não parece ser válido.");

export async function createShortLink(formData: FormData) {
  const rawUrl = ((formData.get("url") as string) || "").trim();
  const rawSlug = formData.get("slug");

  if (!rawUrl) {
    return {
      error: "A URL é obrigatória.",
    };
  }

  const finalUrl = await detectProtocol(rawUrl);

  if (!finalUrl) {
    return {
      error: "Esta URL não é permitida por motivos de segurança.",
    };
  }

  const urlValidation = urlSchema.safeParse(finalUrl);

  if (!urlValidation.success) {
    return { error: "O site informado não parece ser válido." };
  }

  const slugValidation = slugSchema.safeParse(
    rawSlug === "" ? undefined : rawSlug
  );

  if (!slugValidation.success) {
    return { error: slugValidation.error.issues[0].message };
  }

  const finalSlug = slugValidation.data || nanoid(6);

  try {
    await prisma.link.create({
      data: {
        originalUrl: finalUrl,
        slug: finalSlug,
      },
    });

    return { success: true, slug: finalSlug };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: "Este apelido já está em uso. Por favor, escolha outro.",
      };
    }

    console.error("Erro interno:", error);
    return { error: "Ocorreu um erro ao criar o link. Tente novamente." };
  }
}
