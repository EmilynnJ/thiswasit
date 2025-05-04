"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

// Context
type SidebarContextType = {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Provider
interface SidebarProviderProps {
  children: React.ReactNode
  defaultCollapsed?: boolean
}

export function SidebarProvider({ children, defaultCollapsed = false }: SidebarProviderProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  const isMobile = useMobile()

  return <SidebarContext.Provider value={{ collapsed, setCollapsed, isMobile }}>{children}</SidebarContext.Provider>
}

// Sidebar
const sidebarVariants = cva("flex flex-col h-screen transition-all duration-300 border-r bg-background", {
  variants: {
    variant: {
      default: "border-border",
      floating: "border-transparent",
    },
    collapsible: {
      none: "",
      icon: "",
      full: "",
    },
  },
  defaultVariants: {
    variant: "default",
    collapsible: "none",
  },
})

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "floating"
  collapsible?: "none" | "icon" | "full"
}

export function Sidebar({ className, variant = "default", collapsible = "none", ...props }: SidebarProps) {
  const { collapsed, isMobile } = useSidebar()

  const widthClass = React.useMemo(() => {
    if (collapsible === "none") return "w-64"
    if (collapsible === "icon" && collapsed) return "w-16"
    if (collapsible === "full" && collapsed) return "w-0"
    return "w-64"
  }, [collapsible, collapsed])

  return <div className={cn(sidebarVariants({ variant, collapsible }), widthClass, className)} {...props} />
}

// Sidebar Header
export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed, collapsible } = useSidebar()

  return <div className={cn("flex items-center h-14 px-4", className)} {...props} />
}

// Sidebar Content
export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-auto", className)} {...props} />
}

// Sidebar Footer
export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto", className)} {...props} />
}

// Sidebar Menu
export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("py-2", className)} {...props} />
}

// Sidebar Menu Item
export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 last:mb-0", className)} {...props} />
}

// Sidebar Menu Button
interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  tooltip?: string
  asChild?: boolean
}

export function SidebarMenuButton({
  className,
  isActive = false,
  tooltip,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const { collapsed } = useSidebar()

  if (asChild) {
    return (
      <div className="relative group">
        {React.cloneElement(props.children as React.ReactElement, {
          className: cn(
            "flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm transition-colors",
            isActive ? "bg-pink-400/20 text-pink-400" : "text-gray-400 hover:text-white hover:bg-gray-800/50",
            className,
            (props.children as React.ReactElement).props.className,
          ),
        })}
        {collapsed && tooltip && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-800 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {tooltip}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative group">
      <button
        className={cn(
          "flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm transition-colors",
          isActive ? "bg-pink-400/20 text-pink-400" : "text-gray-400 hover:text-white hover:bg-gray-800/50",
          className,
        )}
        {...props}
      />
      {collapsed && tooltip && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-800 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
          {tooltip}
        </div>
      )}
    </div>
  )
}

// Sidebar Trigger
export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <button
      className={cn("p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground", className)}
      onClick={() => setCollapsed(!collapsed)}
      {...props}
    >
      {collapsed ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      )}
    </button>
  )
}
