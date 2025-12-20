"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  QrCode,
  Image as ImageIcon,
  Link as LinkIcon,
  Menu,
} from "lucide-react";
// Removemos o AdSlot antigo
// import { AdSlot } from "@/components/ui/AdSlot"; 
// Importamos o novo componente de Promoção Interna
import InternalPromo from "@/components/ui/InternalPromo";
import Image from "next/image";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname(); 

  // Helper para verificar rota ativa
  const isActive = (path: string) => pathname === path;

  // Lógica para saber qual ferramenta está ativa, para não mostrar propaganda dela mesma
  // Ex: se pathname é "/remove-bg", o ID é "remove-bg"
  const currentToolId = pathname ? pathname.replace('/', '') : '';

  return (
    <div className="min-h-screen bg-white flex font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50 border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* LOGO */}
          <Link
            href="/"
            className="h-16 flex items-center px-6 border-b border-slate-200/50 hover:bg-slate-100/50 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative w-8 h-8 mr-3">
              <Image
                src="/logo.svg"
                alt="Logo Utly"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              utly
            </span>
          </Link>

          {/* MENU DE NAVEGAÇÃO */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2 px-2">
              Ferramentas
            </div>

            <Link
              href="/qrcode"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive("/qrcode")
                  ? "bg-white border border-slate-200 text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <QrCode className="w-4 h-4" /> QR Code Studio
            </Link>

            <Link
              href="/remove-bg"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive("/remove-bg")
                  ? "bg-white border border-slate-200 text-purple-600 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <ImageIcon className="w-4 h-4" /> Removedor de Fundo
            </Link>

            <Link
              href="/shortener"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive("/shortener")
                  ? "bg-white border border-slate-200 text-emerald-600 shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <LinkIcon className="w-4 h-4" /> Encurtador de Links
            </Link>
          </nav>

          {/* AREA DE PROMOÇÃO (Substituindo o AdSlot) */}
          <div className="p-4 border-t border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
               Veja Também
            </p>
            {/* O componente InternalPromo decide o que mostrar baseado no ID atual */}
            <InternalPromo currentToolId={currentToolId} />
          </div>
        </div>
      </aside>

      {/* --- MOBILE OVERLAY --- */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen bg-white">
        <header className="md:hidden h-16 bg-white/80 backdrop-blur border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 transition-all">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* Logo Mobile Opcional */}
            <span className="md:hidden text-lg font-bold text-slate-900">utly</span>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</div>
      </main>

    </div>
  );
}
