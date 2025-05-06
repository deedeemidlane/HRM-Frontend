"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, User, Settings, LogOut, Menu, ChevronDown } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import useLogout from "@/hooks/authentication/useLogout"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useUserContext } from "@/contexts/UserContext"
import { IRole } from "@/types/User"
import { hasRole } from "@/utils/checkRole"
import { useMemo } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { logout } = useLogout()

  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  const { user } = useUserContext()

  const role = useMemo(() => {
    if (!user) return "ROLE_USER"
    if (hasRole("ROLE_ADMIN", user.roles)) return "ROLE_ADMIN"
    if (hasRole("ROLE_MANAGER", user.roles)) return "ROLE_MANAGER"
    if (user.departmentName === "Human Resources") return "ROLE_HR"
    return "ROLE_USER"
  }, [user])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar userRole={role} />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden absolute left-4 top-3 z-40"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-fit">
          <DialogTitle></DialogTitle>
          <DashboardSidebar userRole={role} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-4 border-b bg-white px-6">
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {/* <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3db87a] text-[10px] font-bold text-white">
                3
              </span> */}
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-user.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  {/* <div className="hidden flex-col items-start text-sm md:flex">
                    <span>{user?.fullName}</span>
                    <span className="text-xs text-muted-foreground">
                      {user?.position}
                    </span>
                  </div> */}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.fullName}</DropdownMenuLabel>
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  )
}
