"use client"

import { useState } from "react"
import { Bell, Settings, User, LogOut, Moon, Sun, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { logoutAndRedirect } from "@/lib/logout"

export type PageType =
  | "dashboard"
  | "products"
  | "scriptgenerator"
  | "scriptgallery"
  | "payouts"


interface AppHeaderProps {
  className?: string
  currentPage?: PageType
}

export function AppHeader({ className, currentPage = "dashboard" }: AppHeaderProps) {
  const [isDark, setIsDark] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const breadcrumbMap: Record<PageType, { label: string; path: string[] }> = {
    dashboard: { label: "Dashboard", path: ["Dashboard"] },
    products: { label: "Products", path: ["Dashboard", "Products"] },
    scriptgenerator: { label: "Script Generator", path: ["Dashboard", "Script Generator"] },
    scriptgallery: { label: "Script Gallery", path: ["Dashboard", "Script Gallery"] },
    payouts: { label: "Payouts", path: ["Dashboard", "Payouts"] },
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const notifications = [
    {
      id: 1,
      title: "New affiliate registration",
      message: "Sarah Johnson has joined your program",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Commission payment processed",
      message: "$1,250 paid to Mike Chen",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Monthly report ready",
      message: "March performance report is available",
      time: "3 hours ago",
      unread: false,
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleLogout = async () => {
    setLogoutLoading(true)
    try {
      await logoutAndRedirect();
    } catch (error) {
      console.error('Logout error:', error)
      setLogoutLoading(false)
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center gap-2 sm:gap-4 border-b bg-background px-3 sm:px-4 md:px-6">
      <div className="flex items-start gap-1 sm:gap-2 ml-12 lg:ml-2 min-w-0">
        <div className="flex items-center gap-1 sm:gap-2 text-sm min-w-0">
          {breadcrumbMap[currentPage].path.map((item, index) => (
            <div key={item} className="flex items-center gap-1 sm:gap-2 min-w-0">
              {index > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />}
              <span
                className={cn(
                  "truncate",
                  index === breadcrumbMap[currentPage].path.length - 1
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground cursor-pointer",
                )}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 sm:gap-2 ml-auto">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-muted">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 max-w-[calc(100vw-2rem)]" forceMount>
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary">{unreadCount} new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {notification.unread && <div className="w-2 h-2 bg-accent rounded-full mt-1 flex-shrink-0" />}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center">
              <button className="w-full text-sm text-center p-1 hover:bg-muted rounded">View all notifications</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-1 sm:px-2">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56" forceMount>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className={`hover:bg-red-50 text-red-600 cursor-pointer transition-all duration-300 relative overflow-hidden scale-on-hover ${
                logoutLoading ? 'bg-red-50/80 scale-[0.98]' : 'hover:scale-[1.02]'
              }`}
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              {logoutLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-100/20 to-transparent animate-shimmer"></div>
              )}
              {logoutLoading ? (
                <div className="flex items-center gap-2 w-full relative z-10">
                  <div className="relative">
                    <div className="w-4 h-4 border-2 border-red-200 border-t-red-500 rounded-full animate-spin shadow-sm shadow-red-200/50"></div>
                    <div className="absolute inset-0 w-4 h-4 border-2 border-transparent border-t-red-400 rounded-full animate-spin shadow-sm shadow-red-300/50" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium animate-pulse opacity-80">Logging out</span>
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-bounce opacity-90" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-bounce opacity-90" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-bounce opacity-90" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4 text-red-500" />
                  <span>Keluar</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
