import type React from "react"
import { Header } from "@/components/header"
import { ToolSidebar } from "@/components/tool-sidebar"

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="flex flex-1 min-h-screen">
        <ToolSidebar />
        <main className="flex-1 md:ml-64">{children}</main>
      </div>
    </>
  )
}
