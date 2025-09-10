"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { cn } from "@/lib/utils"

import { DashboardOverview } from "@/components/pages/dashboard-overview"
import { ProductsPage } from "@/components/pages/products-page"
import { ScriptGeneratorPage } from "@/components/pages/script-generator-page"
import { AnalyticsPage } from "@/components/pages/analytics-page"
import { PayoutsPage } from "@/components/pages/payouts-page"
import useAuth from "@/lib/auth"

export type PageType =
  | "dashboard"
  | "products"
  | "scriptgenerator"
  | "scriptgallery"
  | "payouts"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")
  const {session} = useAuth()
  const userId = session?.user?.id

  const renderMainContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview />
      case "products":
        return <ProductsPage userId={userId!}/>
      case "scriptgenerator":
        return <ScriptGeneratorPage  userId={userId!}/>
      case "scriptgallery":
        return <AnalyticsPage />
      case "payouts":
        return <PayoutsPage />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          "ml-0", // Mobile: no margin (sidebar is overlay)
          "md:ml-0", // Tablet: no margin (sidebar is overlay)
        )}
      >
        <AppHeader currentPage={currentPage} />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children || renderMainContent()}</main>
      </div>
    </div>
  )
}
