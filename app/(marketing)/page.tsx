"use client"

import { Header } from "@/components/header"
import { ToolCard } from "@/components/tool-card"
import { AdBanner } from "@/components/ad-banner"
import { QrCode, Link2, Wand2 } from "lucide-react"

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              Ferramentas Digitais
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {" "}
                Rápidas
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Utilitários poderosos para aumentar sua produtividade. Sem login necessário, rápido e seguro.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ToolCard
                title="QR Code"
                description="Gere códigos QR personalizados para URLs e textos"
                icon={QrCode}
                href="/qrcode"
              />
              <ToolCard
                title="Encurtador"
                description="Encurte e compartilhe links de forma rápida"
                icon={Link2}
                href="/encurtador"
              />
              <ToolCard
                title="Remove BG"
                description="Remova fundos de imagens com um clique"
                icon={Wand2}
                href="/removedor-fundo"
              />
            </div>
          </div>
        </section>

        {/* Ad Space */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <AdBanner />
          </div>
        </section>
      </main>
    </>
  )
}
