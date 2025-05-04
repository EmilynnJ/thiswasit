import type React from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("glass-card p-6 md:p-8 w-full max-w-7xl mx-auto my-8 relative z-10", className)}>{children}</div>
  )
}
