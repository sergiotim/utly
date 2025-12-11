"use client";
import Link from "next/link";
import {
  QrCode,
  Image as ImageIcon,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto py-10 animate-in fade-in duration-500">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Ferramentas essenciais.
          <br />
          <span className="text-slate-400">Design impecável.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Uma suíte de utilitários gratuita, anônima e focada em qualidade para
          desenvolvedores e criadores de conteúdo.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/qrcode"
          className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <QrCode className="w-24 h-24 rotate-12" />
          </div>
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <QrCode className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            QR Code Studio
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Gere códigos QR personalizados com cores, logos e alta resolução
            vetorial.
          </p>
          <div className="flex items-center text-indigo-600 text-sm font-medium font-mono group-hover:underline decoration-2 underline-offset-4">
            Acessar Ferramenta <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </Link>
        {/* Repetir lógica para os outros cards, trocando href e ícones */}
        <Link
          href="/remove-bg"
          className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ImageIcon className="w-24 h-24 -rotate-12" />
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <ImageIcon className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Magic Eraser
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Remova fundos de imagens instantaneamente usando IA sem perder
            qualidade.
          </p>
          <div className="flex items-center text-purple-600 text-sm font-medium font-mono group-hover:underline decoration-2 underline-offset-4">
            Acessar Ferramenta <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </Link>
        <Link
          href="/shortener"
          className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <LinkIcon className="w-24 h-24 rotate-45" />
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <LinkIcon className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Encurtador</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            URLs curtas e amigáveis com slugs personalizados para suas
            campanhas.
          </p>
          <div className="flex items-center text-emerald-600 text-sm font-medium font-mono group-hover:underline decoration-2 underline-offset-4">
            Acessar Ferramenta <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
