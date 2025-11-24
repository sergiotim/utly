"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { QrCode, Link2, Wand2, X } from "lucide-react"
import { useState } from "react"

const tools = [
  { name: "QR Code", href: "/qrcode", icon: QrCode, description: "Gerador de QR Code" },
  { name: "Encurtador", href: "/encurtador", icon: Link2, description: "Encurtador de Links" },
  { name: "Remove BG", href: "/removedor-fundo", icon: Wand2, description: "Removedor de Fundo" },
]

export function ToolSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X /> : <QrCode />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-16 left-0 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:block z-30`}
      >
        <div className="p-4 space-y-2 h-full flex flex-col">
          <p className="text-xs font-semibold text-sidebar-foreground/70 px-2 py-4">FERRAMENTAS</p>
          {tools.map((tool) => {
            const Icon = tool.icon
            const isActive = pathname === tool.href
            return (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-start gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent text-sidebar-foreground"
                }`}
              >
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium text-sm">{tool.name}</p>
                  <p className="text-xs opacity-70">{tool.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 md:hidden z-20 mt-16" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  )
}
