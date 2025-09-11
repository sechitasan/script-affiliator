"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { cn } from "@/lib/utils"

import { DashboardOverview } from "@/components/pages/dashboard-overview"
import { ProductsPage } from "@/components/pages/products-page"
import { ScriptGeneratorPage } from "@/components/pages/script-generator-page"
import { ScriptGalleryPage } from "@/components/pages/script-gallery-page"
import { PayoutsPage } from "@/components/pages/payouts-page"
import useAuth from "@/lib/auth"
import ProfilePage from "./pages/profile-page"

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
  const [activeTab, setActiveTab] = useState<string | null>(null) // new state for tabs
  const { session } = useAuth()
  const userId = session?.user?.id

  const renderMainContent = () => {
    // Jika ada tab aktif dari AppHeader (misal: profile atau settings), tampilkan halaman sesuai tab
    if (activeTab === "profile") return <ProfilePage/>
    if (activeTab === "settings") return <div>Settings Page</div>

    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview />
      case "products":
        return <ProductsPage userId={userId!} />
      case "scriptgenerator":
        return <ScriptGeneratorPage userId={userId!} />
      case "scriptgallery":
        return <ScriptGalleryPage />
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
        onPageChange={(page) => {
          setCurrentPage(page)
          setActiveTab(null) // reset tab ketika pindah page
        }}
      />
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          "ml-0",
          "md:ml-0",
        )}
      >
        <AppHeader
          currentPage={currentPage}
          onTabChange={(tab) => setActiveTab(tab)} 
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children || renderMainContent()}
        </main>
      </div>
    </div>
  )
}
