"use client"

import { useState, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdBanner } from "@/components/ad-banner"
import { Download } from "lucide-react"

export default function QRCodePage() {
  const [text, setText] = useState("https://example.com")
  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const qrRef = useRef<any>(null)

  const downloadQR = (format: "png" | "svg") => {
    if (qrRef.current) {
      const element = qrRef.current.querySelector("svg") || qrRef.current.querySelector("canvas")
      const link = document.createElement("a")
      link.href = element.toDataURL(`image/${format}`)
      link.download = `qrcode.${format}`
      link.click()
    }
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gerador de QR Code</h1>
        <p className="text-muted-foreground">Crie códigos QR personalizados em segundos</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Texto ou URL</label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cor do QR Code</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-12 h-10 cursor-pointer rounded border border-border"
                />
                <span className="text-sm text-muted-foreground self-center">{fgColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cor de Fundo</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-10 cursor-pointer rounded border border-border"
                />
                <span className="text-sm text-muted-foreground self-center">{bgColor}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <p className="text-sm font-medium">Download</p>
            <div className="flex gap-2">
              <Button onClick={() => downloadQR("png")} variant="outline" className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                PNG
              </Button>
              <Button onClick={() => downloadQR("svg")} variant="outline" className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                SVG
              </Button>
            </div>
          </div>
        </Card>

        {/* Preview Section */}
        <Card className="p-6 flex flex-col items-center justify-center gap-4 bg-white dark:bg-black">
          <div ref={qrRef} className="flex items-center justify-center">
            <QRCodeSVG value={text} size={256} fgColor={fgColor} bgColor={bgColor} level="H" includeMargin={true} />
          </div>
          <p className="text-xs text-muted-foreground text-center">Preview do QR Code</p>
        </Card>
      </div>

      {/* Ad Space */}
      <AdBanner />
    </div>
  )
}
