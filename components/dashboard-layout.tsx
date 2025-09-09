"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { cn } from "@/lib/utils"

import { DashboardOverview } from "@/components/pages/dashboard-overview"
import { AffiliatesPage } from "@/components/pages/affiliates-page"
import { CommissionsPage } from "@/components/pages/commissions-page"
import { AnalyticsPage } from "@/components/pages/analytics-page"
import { LinksPage } from "@/components/pages/links-page"
import { PayoutsPage } from "@/components/pages/payouts-page"
import { ReportsPage } from "@/components/pages/reports-page"
import { SettingsPage } from "@/components/pages/settings-page"

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

  const renderMainContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview />
      case "products":
        return <AffiliatesPage />
      case "scriptgenerator":
        return <CommissionsPage />
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
