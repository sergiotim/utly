import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "./lib/prisma";

export async function proxy(request: NextRequest) {
  // coleta o pathname e tira o "/"
  const slug = request.nextUrl.pathname.slice(1);

  if (!slug) {
    return NextResponse.next();
  }

  try {
    // faz o update de lastAccessedAt e retorna o link original
    const link = await prisma.link.update({
      where: {
        slug: slug,
      },
      data: {
        lastAccessedAt: new Date(),
      },
      select: { originalUrl: true },
    });

    return NextResponse.redirect(new URL(link.originalUrl));
  } catch (error) {
    // !!!Colocar 404 personalizado
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Matcher Unificado:
     * A regex diz: "Execute em tudo, EXCETO se começar com..."
     * Adicionamos tudo na mesma lista negativa para funcionar como um "E".
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|shortener|remove-bg|qrcode|.*\\.svg|.*\\.png|.*\\.jpg).*)',
  ],
}
