// app/api/cron/cleanup/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const deleted = await prisma.link.deleteMany({
      where: {
        lastAccessedAt: {
          lt: sevenDaysAgo,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Faxina concluída. ${deleted.count} links removidos.`,
    });
  } catch (error) {
    console.error('Erro na faxina:', error);
    return NextResponse.json({ success: false, error: 'Erro interno' }, { status: 500 });
  }
}