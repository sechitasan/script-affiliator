import type React from "react"

interface DashboardHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  showBreadcrumb?: boolean
}

export function DashboardHeader({ title, description, children }: DashboardHeaderProps) {
  return (
    <div className="mb-4 sm:mb-6"> 
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-balance">{title}</h1>
          {description && <p className="text-muted-foreground mt-1 text-pretty">{description}</p>}
        </div>
        {children && <div className="flex-shrink-0">{children}</div>}
      </div>
    </div>
  )
}
