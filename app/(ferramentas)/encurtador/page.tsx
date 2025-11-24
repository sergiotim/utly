"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdBanner } from "@/components/ad-banner"
import { Copy, Check } from "lucide-react"

export default function LinkShortenerPage() {
  const [longUrl, setLongUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShorten = async () => {
    if (!longUrl) return

    setIsLoading(true)
    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setShortUrl("https://utly.io/abc123")
    setIsLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Encurtador de Links</h1>
        <p className="text-muted-foreground">Encurte seus links longos para compartilhar facilmente</p>
      </div>

      <Card className="p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Cole seu link aqui</label>
          <Input
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://exemplo.com/caminho/muito/longo"
            className="w-full h-12"
          />
        </div>

        <Button onClick={handleShorten} disabled={!longUrl || isLoading} className="w-full h-11 text-base">
          {isLoading ? "Encurtando..." : "Encurtar Link"}
        </Button>

        {shortUrl && (
          <div className="space-y-3 p-4 bg-secondary rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Link encurtado:</p>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-background rounded border border-border text-foreground break-all text-sm">
                {shortUrl}
              </div>
              <Button onClick={handleCopy} variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Ad Space */}
      <AdBanner />
    </div>
  )
}
