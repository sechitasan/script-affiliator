"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  LinkIcon,
  FileText,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Boxes,
  Subscript,
  PaperclipIcon,
  Folder,
} from "lucide-react"
import type { PageType } from "@/components/dashboard-layout"

interface SidebarProps {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
  currentPage: PageType
  onPageChange: (page: PageType) => void
}

const menuItems = [
  {
    title: "Dashboard",
    page: "dashboard" as PageType,
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    page: "products" as PageType,
    icon: Boxes
  },
  {
    title: "Script Generator",
    page: "scriptgenerator" as PageType,
    icon: FileText,
  },
  {
    title: "Script Gallery",
    page: "scriptgallery" as PageType,
    icon: Folder,
  },
  {
    title: "Payouts",
    page: "payouts" as PageType,
    icon: CreditCard,
  },
]

export function Sidebar({ collapsed, onCollapsedChange, currentPage, onPageChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobile = () => setMobileOpen(!mobileOpen)

  const handlePageClick = (page: PageType) => {
    onPageChange(page)
    setMobileOpen(false) // Close mobile menu when navigating
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-3 left-3 z-40 lg:hidden", // Reduced z-index and adjusted positioning
          "bg-background/90 backdrop-blur-sm border border-border hover:bg-accent",
          "h-8 w-8", // Made button smaller to fit better
        )}
        onClick={toggleMobile}
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
          "lg:relative lg:translate-x-0",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-sidebar-accent-foreground" />
                </div>
                <span className="font-semibold text-sidebar-foreground">AffiliateHub</span>
              </div>
            )}

            {/* Desktop Collapse Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => onCollapsedChange(!collapsed)}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => {
                const isActive = currentPage === item.page
                const Icon = item.icon

                return (
                  <li key={item.page}>
                    <button
                      onClick={() => handlePageClick(item.page)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground",
                        collapsed && "justify-center px-2",
                      )}
                    >
                      <Icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "h-6 w-6")} />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            {!collapsed ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-sidebar-accent-foreground">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
                  <p className="text-xs text-sidebar-foreground/70 truncate">admin@example.com</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-sidebar-accent-foreground">JD</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
