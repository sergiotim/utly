"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { QrCode, Image as ImageIcon, Link as LinkIcon, Menu, X, Home } from 'lucide-react';
import { AdSlot } from '@/components/ui/AdSlot';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Substitui o activeRoute
  const showStickyAd = pathname !== '/';

  // Helper para verificar rota ativa
  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-white flex font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50 border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <Link href="/" className="h-16 flex items-center px-6 border-b border-slate-200/50 hover:bg-slate-100/50 transition-colors" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-sm shadow-indigo-200">
               <span className="text-white font-bold text-lg leading-none pt-0.5">u</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">utly</span>
          </Link>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2 px-2">Ferramentas</div>
            
            <Link 
              href="/qrcode"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive('/qrcode') ? 'bg-white border border-slate-200 text-indigo-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <QrCode className="w-4 h-4" /> QR Code Studio
            </Link>

            <Link 
              href="/remove-bg"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive('/remove-bg') ? 'bg-white border border-slate-200 text-purple-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <ImageIcon className="w-4 h-4" /> Magic Eraser
            </Link>

            <Link 
              href="/shortener"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive('/shortener') ? 'bg-white border border-slate-200 text-emerald-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <LinkIcon className="w-4 h-4" /> Link Shortener
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-200">
            <AdSlot label="Sidebar Ad (250x250)" className="h-48 w-full bg-white" />
          </div>
        </div>
      </aside>

      {/* --- MOBILE OVERLAY --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen bg-white">
        <header className="md:hidden h-16 bg-white/80 backdrop-blur border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 transition-all">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* --- STICKY FOOTER AD --- */}
      {showStickyAd && <StickyFooter />}
    </div>
  );
}

// Sub-componente interno para o footer
function StickyFooter() {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;

    return (
        <div className="fixed bottom-0 right-0 left-0 md:left-64 bg-white/95 backdrop-blur border-t border-slate-200 p-3 shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.05)] z-40 animate-in slide-in-from-bottom-full duration-500">
           <div className="max-w-5xl mx-auto relative flex items-center justify-center pr-8">
              <AdSlot label="Sticky Footer Banner (728x90)" className="h-[90px] w-full max-w-3xl bg-slate-50/50" />
              <button onClick={() => setVisible(false)} className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
           </div>
        </div>
    );
}