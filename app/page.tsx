"use client";
import Link from "next/link";
import {
  QrCode,
  Image as ImageIcon,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";
import SoftwareApplicationSchema from "@/components/seo/SoftwareApplicationSchema";
import FAQStructured from "@/components/seo/FAQStructured";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto py-10 animate-in fade-in duration-500">
      <SoftwareApplicationSchema
        name="Utly - Suíte de Ferramentas Online"
        category="UtilitiesApplication"
        description="Utly é uma suíte de utilitários online, gratuita, anônima e focada em privacidade, com gerador de QR Code, sorteador, removedor de fundo por IA e encurtador de links."
        requirements="Requer suporte a HTML5 e JavaScript habilitado."
      />

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
        <Link
          href="/sorteador"
          className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dices rotate-12"><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></svg>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dices text-blue-600"><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Sorteador Aleatório
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Sorteie números, nomes ou divida equipes de forma justa e animada.
          </p>
          <div className="flex items-center text-blue-600 text-sm font-medium font-mono group-hover:underline decoration-2 underline-offset-4">
            Acessar Ferramenta <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </Link>
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
            Removedor de Fundo
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
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Encurtador de Links
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            URLs curtas e amigáveis com slugs personalizados para suas
            campanhas.
          </p>
          <div className="flex items-center text-emerald-600 text-sm font-medium font-mono group-hover:underline decoration-2 underline-offset-4">
            Acessar Ferramenta <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </Link>
      </div>

      <FAQStructured
        title="Perguntas Frequentes sobre a Utly"
        faqs={[
          {
            question: "O que é a Utly?",
            answer:
              "A Utly é uma suíte de ferramentas online gratuita, privada e focada em privacidade. Oferecemos gerador de QR Code, sorteador, removedor de fundo por IA e encurtador de links, tudo funcionando direto no seu navegador.",
          },
          {
            question: "As ferramentas da Utly são realmente gratuitas?",
            answer:
              "Sim. Todas as ferramentas da Utly são 100% gratuitas, sem cadastro, sem assinaturas e sem limites ocultos.",
          },
          {
            question: "Meus dados ficam salvos em algum servidor?",
            answer:
              "Não. Priorizamos o processamento local (client-side). Suas listas, imagens e documentos são processados no seu próprio navegador sempre que possível, sem upload para servidores externos.",
          },
          {
            question: "Preciso instalar algum programa?",
            answer:
              "Não. Todas as ferramentas funcionam diretamente no navegador, em qualquer sistema operacional (Windows, macOS, Linux, Android, iOS) com suporte a HTML5.",
          },
        ]}
      />
    </div>
  );
}
