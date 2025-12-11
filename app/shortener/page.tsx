"use client";

import React from "react";
import { Link as LinkIcon, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InputGroup } from "@/components/ui/InputGroup";
import SeeAlso from "@/components/ui/SeeAlso";

export default function ShortenerPage() {
  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500 pb-32">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Encurtador de Links
        </h1>
        <p className="text-slate-500">Links curtos, rastreáveis e anônimos.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
        <InputGroup
          label="URL Original"
          helpText="Cole o link longo que você deseja encurtar"
        >
          <div className="relative">
            <LinkIcon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="https://..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-12 pr-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </InputGroup>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="flex-1 w-full">
            <InputGroup label="Slug Personalizado (Opcional)">
              <div className="flex items-center group">
                <span className="bg-slate-100 border border-r-0 border-slate-200 text-slate-500 px-4 py-3 rounded-l-lg text-sm font-mono group-hover:border-slate-300 transition-colors">
                  utly.com/
                </span>
                <input
                  type="text"
                  placeholder="promocao-natal"
                  className="flex-1 bg-white border border-slate-200 rounded-r-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </InputGroup>
          </div>
          <div className="w-full md:w-auto mb-4">
            <Button variant="primary" className="w-full h-[46px]">
              Encurtar Link
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-8">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
          Links Recentes (Sessão Atual)
        </h4>
        <div className="space-y-3">
          {/* Item de Lista Simulado */}
          <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors group">
            <div>
              <p className="text-indigo-600 font-bold text-sm">
                utly.com/minha-bio
              </p>
              <p className="text-xs text-slate-400 truncate max-w-[200px]">
                https://instagram.com/usuario...
              </p>
            </div>
            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <SeeAlso current="shortener" />
    </div>
  );
}
