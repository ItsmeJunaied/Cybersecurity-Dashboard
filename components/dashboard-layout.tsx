"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Shield, AlertTriangle, Server, Settings, Home, Activity, Database, Users, Bell } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar variant="sidebar" collapsible="icon" className="bg-[#41644A]/10">
          <SidebarHeader className="border-b border-[#41644A]/20 bg-[#41644A]/5">
            <div className="flex items-center gap-2 px-4 py-3">
              <Shield className="h-6 w-6 text-[#41644A]" />
              <span className="text-lg font-bold text-[#41644A]">SecureGuard</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-[#41644A]/70">Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard"}
                      tooltip="Dashboard"
                      className={
                        pathname === "/dashboard" ? "bg-[#41644A]/20 text-[#41644A] hover:bg-[#41644A]/30" : ""
                      }
                    >
                      <a href="/dashboard">
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/threats"}
                      tooltip="Threats"
                      className={pathname === "/threats" ? "bg-[#41644A]/20 text-[#41644A] hover:bg-[#41644A]/30" : ""}
                    >
                      <a href="/threats">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Threats</span>
                      </a>
                    </SidebarMenuButton>
                    <Badge className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white">12</Badge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/activity"}
                      tooltip="Activity"
                      className={pathname === "/activity" ? "bg-[#41644A]/20 text-[#41644A] hover:bg-[#41644A]/30" : ""}
                    >
                      <a href="/activity">
                        <Activity className="h-4 w-4" />
                        <span>Activity</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className="text-[#41644A]/70">Resources</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/assets"}
                      tooltip="Assets"
                      className={pathname === "/assets" ? "bg-[#41644A]/20 text-[#41644A] hover:bg-[#41644A]/30" : ""}
                    >
                      <a href="/assets">
                        <Server className="h-4 w-4" />
                        <span>Assets</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/databases"}
                      tooltip="Databases"
                      className={
                        pathname === "/databases" ? "bg-[#41644A]/20 text-[#41644A] hover:bg-[#41644A]/30" : ""
                      }
                    >
                      <a href="/databases">
                        <Database className="h-4 w-4" />
                        <span>Databases</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/users"}
                      tooltip="Users"
                      className={pathname === "/users" ? "bg-[#41644A]/20 text-[#41644A] hover:bg-[#41644A]/30" : ""}
                    >
                      <a href="/users">
                        <Users className="h-4 w-4" />
                        <span>Users</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-[#41644A]/20 bg-[#41644A]/5 p-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-[#41644A]/20">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback className="bg-[#41644A]/10 text-[#41644A]">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#41644A]">John Doe</span>
                <span className="text-xs text-muted-foreground">Security Admin</span>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto text-[#41644A]">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b border-[#41644A]/10 bg-white px-6 shadow-sm">
            <SidebarTrigger className="text-[#41644A]" />
            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="icon" className="border-[#41644A]/20 text-[#41644A]">
                <Bell className="h-4 w-4" />
              </Button>
              <ModeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-gray-50/50 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
