"use server";

import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import z from "zod";

async function detectProtocol(domain: string) {
  if (/^https?:\/\//i.test(domain)) {
    return domain;
  }

  const domainClean = domain.trim();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    await fetch(`https://${domainClean}`, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);
    return `https://${domainClean}`;
  } catch (error) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);

      await fetch(`http://${domainClean}`, {
        method: "HEAD",
        signal: controller.signal,
        cache: "no-store",
      });

      clearTimeout(timeoutId);
      console.log(`Site antigo detectado (HTTP): ${domainClean}`);
      return `http://${domainClean}`;
    } catch (e) {
      return `https://${domainClean}`;
    }
  }
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
    new URL(val);
    return true;
  } catch {
    return false;
  }
}, "O site informado não parece ser válido.");

export async function createShortLink(formData: FormData) {
  const rawUrl = ((formData.get("url") as string) || "").trim();
  const rawSlug = formData.get("slug");

  if (!rawUrl) {
    return { error: "A URL é obrigatória." };
  }

  const finalUrl = await detectProtocol(rawUrl)

  const urlValidation = urlSchema.safeParse(finalUrl)

  if(!urlValidation.success){
    return {error:urlValidation.error.issues[0].message}
  }

  const slugValidation = slugSchema.safeParse(rawSlug === "" ? undefined : rawSlug)

  if(!slugValidation.success){
    return {error: slugValidation.error.issues[0].message}
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
