"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdBanner } from "@/components/ad-banner"
import { Upload, Loader2 } from "lucide-react"

export default function BackgroundRemoverPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasImage, setHasImage] = useState(false)

  const handleFileUpload = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setHasImage(true)
    }, 1500)
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Removedor de Fundo</h1>
        <p className="text-muted-foreground">Remova fundos de suas imagens automaticamente</p>
      </div>

      {/* Upload Area */}
      <Card className="p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <p className="font-medium text-foreground">Arraste uma imagem aqui</p>
            <p className="text-sm text-muted-foreground">ou clique para selecionar</p>
          </div>
          <Button onClick={handleFileUpload} className="mt-4">
            Selecionar Imagem
          </Button>
        </div>
      </Card>

      {/* Processing State */}
      {isLoading && (
        <Card className="p-12 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Processando sua imagem...</p>
        </Card>
      )}

      {/* Comparison View */}
      {hasImage && !isLoading && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="bg-muted p-4 flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">Antes</p>
              <div className="w-full h-80 bg-foreground/10 rounded flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Before"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="bg-muted p-4 flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">Depois</p>
              <div
                className="w-full h-80 rounded flex items-center justify-center"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 10px 10px",
                }}
              >
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="After"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {hasImage && !isLoading && (
        <Card className="p-6 flex gap-3">
          <Button className="flex-1">Download PNG</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Fazer Novo Upload
          </Button>
        </Card>
      )}

      {/* Ad Space */}
      <AdBanner />
    </div>
  )
}
