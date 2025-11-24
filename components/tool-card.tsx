import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ToolCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
}

export function ToolCard({ title, description, icon: Icon, href }: ToolCardProps) {
  return (
    <Link href={href}>
      <Card className="p-6 hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full group">
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
