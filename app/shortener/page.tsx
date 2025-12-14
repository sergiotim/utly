"use client";

import React, { useState, useTransition } from "react";
import {
  Link as LinkIcon,
  ExternalLink,
  Copy,
  AlertCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InputGroup } from "@/components/ui/InputGroup";
import SeeAlso from "@/components/ui/SeeAlso";
import { createShortLink } from "../actions";

export default function ShortenerPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success?: boolean;
    slug?: string;
    error?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(formData: FormData) {
    setResult(null);

    startTransition(async () => {
      const response = await createShortLink(formData);
      setResult(response);
    });
  }

  function copyToClipboard() {
    if (result?.slug) {
      const fullUrl = `${window.location.origin}/${result.slug}`;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500 pb-32">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Encurtador de Links
        </h1>
        <p className="text-slate-500">Links curtos, rastreáveis e anônimos.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
        <form action={handleSubmit}>
          <InputGroup
            label="URL Original"
            helpText="Cole o link longo que você deseja encurtar"
          >
            <div className="relative">
              <LinkIcon className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="url"
                placeholder="https://exemplo.com/link-muito-longo"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-12 pr-4 py-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </InputGroup>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="flex-1 w-full">
              <InputGroup label="Slug Personalizado (Opcional)">
                <div className="flex items-center group">
                  <span className="bg-slate-100 border border-r-0 border-slate-200 text-slate-500 px-4 py-3 rounded-l-lg text-sm font-mono group-hover:border-slate-300 transition-colors">
                    {window.location.host}/
                  </span>
                  <input
                    type="text"
                    name="slug"
                    placeholder="promocao-natal"
                    className="flex-1 bg-white border border-slate-200 rounded-r-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </InputGroup>
            </div>
            <div className="w-full md:w-auto mb-4">
              <Button
                variant="primary"
                className="w-full h-[46px]"
                disabled={isPending}
                type="submit"
              >
                {isPending ? "Encurtando..." : "Encurtar Link"}
              </Button>
            </div>
          </div>
        </form>

        {result?.error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4" />
            {result.error}
          </div>
        )}

        {result?.success && (
          <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg animate-in fade-in">
            <p className="text-green-700 text-sm font-medium mb-2 flex items-center gap-2">
              <Check className="w-4 h-4" /> Link criado com sucesso!
            </p>
            <div className="flex items-center gap-2 bg-white p-2 rounded border border-green-200">
              <span className="flex-1 text-slate-600 font-mono text-sm truncate pl-2">
                {/* Mostra a URL completa. window.location.host pega 'localhost:3000' ou 'utly.com' */}
                {typeof window !== "undefined"
                  ? window.location.host
                  : "utly.com"}
                /{result.slug}
              </span>
              <button
                onClick={copyToClipboard}
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                title="Copiar"
              >
                {/* Troca o ícone se o usuário acabou de copiar */}
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 border-t border-slate-200 pt-8">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
          Links Recentes
        </h4>
        <div className="space-y-3">
          <div className="text-center text-slate-400 text-sm italic py-4">
            Seus links criados aparecerão aqui...
          </div>
        </div>
      </div>

      <SeeAlso current="shortener" />
    </div>
  );
}
