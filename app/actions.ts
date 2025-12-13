"use server";

import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import z from "zod";

const createLinkSchema = z.object({
  url: z.url({
    message: "Por favor, insira uma URL válida.",
  }),
  slug: z
    .string()
    .min(3, "O apelido deve ter pelo menos 3 caracteres.")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "O apelido só pode ter letras, números, hífens e underlines."
    )
    .optional()
    .or(z.literal("")),
});

export async function createShortLink(formData: FormData) {
  const rawUrl = formData.get("url");
  const rawSlug = formData.get("slug");

  const result = createLinkSchema.safeParse({
    url: rawUrl,
    slug: rawSlug,
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { url, slug } = result.data;

  const finalSlug = slug || nanoid(6);

  try {
    await prisma.link.create({
      data: {
        originalUrl: url,
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
