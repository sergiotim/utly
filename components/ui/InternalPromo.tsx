"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { QrCode, Scissors, Link as LinkIcon, ArrowRight, ImageIcon } from "lucide-react";
import { Button } from "./Button";

// 1. Definição dos Dados:
// Aqui centralizamos as informações de cada "anúncio" interno.
// Se criar uma ferramenta nova no futuro, basta adicionar aqui.
const PROMOS = [
  {
    id: "remove-bg",
    title: "Removedor de Fundo",
    description: "Remova o fundo de qualquer imagem com IA em segundos.",
    icon: ImageIcon,
    href: "/remove-bg",
    color: "from-pink-500 to-fuchsia-600", // Gradiente bonito
  },
  {
    id: "qrcode",
    title: "QR Code Studio",
    description: "Crie QR Codes personalizados com sua logo e cores.",
    icon: QrCode,
    href: "/qrcode",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "shortener",
    title: "Encurtador de Links",
    description: "Transforme links gigantes em URLs curtas e amigáveis.",
    icon: LinkIcon,
    href: "/shortener", // Assumindo que essa rota existirá
    color: "from-emerald-400 to-cyan-600",
  },
];

type InternalPromoProps = {
  currentToolId: string; // O ID da ferramenta que o usuário JÁ está usando
  className?: string;
};

export default function InternalPromo({ currentToolId, className = "" }: InternalPromoProps) {
  // Estado para guardar qual promo vamos mostrar
  const [promo, setPromo] = useState<typeof PROMOS[0] | null>(null);

  useEffect(() => {
    // 2. Lógica de Filtragem:
    // Filtramos a lista para remover a ferramenta atual.
    const availablePromos = PROMOS.filter((p) => p.id !== currentToolId);
    
    // 3. Seleção Aleatória:
    // Escolhemos uma das restantes aleatoriamente.
    // Math.floor(Math.random() * N) pega um índice aleatório.
    const randomPick = availablePromos[Math.floor(Math.random() * availablePromos.length)];
    
    setPromo(randomPick);
  }, [currentToolId]);

  // Evita erro de hidratação ou piscar tela vazia
  if (!promo) return null;

  const Icon = promo.icon;

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-lg ${className}`}>
      {/* Background Decorativo (Efeito visual) */}
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${promo.color} opacity-20 blur-2xl transition-all group-hover:opacity-30`} />
      
      <div className="relative z-10 flex flex-col items-start gap-4">
        {/* Cabeçalho do Card */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${promo.color} shadow-inner`}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        <div>
          <h3 className="text-lg font-bold leading-tight">
            {promo.title}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            {promo.description}
          </p>
        </div>

        {/* Botão de Ação */}
        <Link href={promo.href} className="w-full">
          <Button variant="secondary" className="w-full justify-between bg-white/10 text-white hover:bg-white/20 border-0">
            Experimentar
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}