"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  Users,
  Briefcase,
  FileText,
  UserPlus,
  Calendar,
  ClipboardList,
  FileCodeIcon as FileContract,
  DollarSign,
  BarChart2,
  Clock,
  CheckSquare,
  Award,
  Bell,
  Settings,
  UserCog,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const PERSONAL_TABS = [
  "/dashboard/checkin",
  "/dashboard/profile",
  "/dashboard/requests",
  "/dashboard/salary",
]

const HR_TABS = [
  "/dashboard/employees",
  "/dashboard/contracts",
  "/dashboard/attendance",
  "/dashboard/payroll",
  "/dashboard/reports",
]

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href?: string
  isActive?: boolean
  children?: React.ReactNode
  onClick?: () => void
  open?: boolean
}

const SidebarItem = ({
  icon,
  label,
  href,
  isActive,
  children,
  onClick,
  open = false,
}: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(open)
  const hasChildren = Boolean(children)

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    }
    if (onClick) {
      onClick()
    }
  }

  const content = (
    <>
      <div className="mr-2">{icon}</div>
      <span className="flex-1 text-left mt-0.5">{label}</span>
      {hasChildren && (
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen ? "rotate-180" : ""
          )}
        />
      )}
    </>
  )

  return (
    <div className="flex flex-col">
      {href ? (
        <Link
          href={href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium",
            isActive
              ? "bg-[#edf7f2] text-[#3db87a]"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          {content}
        </Link>
      ) : (
        <Button
          variant="ghost"
          className={cn(
            "flex w-full justify-start px-3 py-2 text-sm font-medium gap-0",
            isOpen ? "bg-gray-100" : ""
          )}
          onClick={handleClick}
        >
          {content}
        </Button>
      )}
      {hasChildren && isOpen && (
        <div className="ml-6 mt-1 border-l border-gray-200 pl-3">
          {children}
        </div>
      )}
    </div>
  )
}

export function DashboardSidebar({ userRole }: { userRole?: string }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-72 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="font-bold text-2xl text-[#3db87a]">ADA</span>
          <span className="pl-2 border-l-2">Trang quản lý</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {/* <SidebarItem
            icon={<BarChart2 className="h-4 w-4" />}
            label="Dashboard"
            href="/dashboard"
            isActive={pathname === "/dashboard"}
            role={["ROLE_ADMIN", "ROLE_HR", "ROLE_MANAGER"]}
          /> */}

          {/* Admin Features */}
          {userRole === "ROLE_ADMIN" && (
            <SidebarItem
              icon={<Shield className="h-5 w-5" />}
              label="Quản trị hệ thống"
              open={pathname.includes("/dashboard/admin")}
            >
              <SidebarItem
                icon={<UserCog className="h-4 w-4" />}
                label="Quản lý tài khoản"
                href="/dashboard/admin/users"
                isActive={pathname.includes("/dashboard/admin/users")}
              />
              <SidebarItem
                icon={<Shield className="h-4 w-4" />}
                label="Phân quyền"
                href="/dashboard/admin/roles"
                isActive={pathname === "/dashboard/admin/roles"}
              />
            </SidebarItem>
          )}

          {/* HR Features */}
          {(userRole === "ROLE_ADMIN" || userRole === "ROLE_HR") && (
            <SidebarItem
              icon={<Users className="h-5 w-5" />}
              label="Quản lý nhân sự"
              open={HR_TABS.includes(pathname)}
            >
              {/* <SidebarItem
                icon={<Users className="h-4 w-4" />}
                label="Danh sách nhân viên"
                href="/dashboard/employees"
                isActive={pathname === "/dashboard/employees"}
              /> */}
              <SidebarItem
                icon={<FileContract className="h-4 w-4" />}
                label="Quản lý hợp đồng"
                href="/dashboard/contracts"
                isActive={pathname === "/dashboard/contracts"}
              />
              <SidebarItem
                icon={<ClipboardList className="h-4 w-4" />}
                label="Chấm công"
                href="/dashboard/attendance"
                isActive={pathname === "/dashboard/attendance"}
              />
              <SidebarItem
                icon={<DollarSign className="h-4 w-4" />}
                label="Lương & Phúc lợi"
                href="/dashboard/payroll"
                isActive={pathname === "/dashboard/payroll"}
              />
              <SidebarItem
                icon={<BarChart2 className="h-4 w-4" />}
                label="Báo cáo nhân sự"
                href="/dashboard/reports"
                isActive={pathname === "/dashboard/reports"}
              />
            </SidebarItem>
          )}

          {/* Recruitment Features */}
          {(userRole === "ROLE_ADMIN" || userRole === "ROLE_HR") && (
            <SidebarItem
              icon={<Briefcase className="h-5 w-5" />}
              label="Tuyển dụng"
              open={pathname.includes("/dashboard/recruitment")}
            >
              <SidebarItem
                icon={<FileText className="h-4 w-4" />}
                label="Tin tuyển dụng"
                href="/dashboard/recruitment"
                isActive={
                  pathname === "/dashboard/recruitment" ||
                  pathname === "/dashboard/recruitment/create"
                }
              />
              <SidebarItem
                icon={<UserPlus className="h-4 w-4" />}
                label="Quản lý ứng viên"
                href="/dashboard/recruitment/applicants"
                isActive={pathname === "/dashboard/recruitment/applicants"}
              />
              <SidebarItem
                icon={<Calendar className="h-4 w-4" />}
                label="Lịch phỏng vấn"
                href="/dashboard/recruitment/interviews"
                isActive={pathname.includes(
                  "/dashboard/recruitment/interviews"
                )}
              />
            </SidebarItem>
          )}

          {/* Manager Features */}
          {(userRole === "ROLE_ADMIN" || userRole === "ROLE_MANAGER") && (
            <SidebarItem
              icon={<CheckSquare className="h-5 w-5" />}
              label="Quản lý bộ phận"
            >
              <SidebarItem
                icon={<Clock className="h-4 w-4" />}
                label="Duyệt đơn nghỉ phép/OT"
                href="/dashboard/manager/approvals"
                isActive={pathname === "/dashboard/manager/approvals"}
              />
              <SidebarItem
                icon={<BarChart2 className="h-4 w-4" />}
                label="Hiệu suất nhân viên"
                href="/dashboard/manager/performance"
                isActive={pathname === "/dashboard/manager/performance"}
              />
              <SidebarItem
                icon={<Award className="h-4 w-4" />}
                label="Đánh giá nhân viên"
                href="/dashboard/manager/reviews"
                isActive={pathname === "/dashboard/manager/reviews"}
              />
            </SidebarItem>
          )}

          {/* Employee Features */}
          {(userRole === "ROLE_HR" ||
            // userRole === "ROLE_ADMIN" ||
            userRole === "ROLE_MANAGER" ||
            userRole === "ROLE_USER") && (
            <SidebarItem
              icon={<UserCog className="h-5 w-5" />}
              label="Cá nhân"
              open={PERSONAL_TABS.includes(pathname)}
            >
              <SidebarItem
                icon={<Clock className="h-4 w-4" />}
                label="Chấm công"
                href="/dashboard/checkin"
                isActive={pathname === "/dashboard/checkin"}
              />
              <SidebarItem
                icon={<FileText className="h-4 w-4" />}
                label="Đơn từ"
                href="/dashboard/requests"
                isActive={pathname === "/dashboard/requests"}
              />
              <SidebarItem
                icon={<DollarSign className="h-4 w-4" />}
                label="Bảng lương"
                href="/dashboard/salary"
                isActive={pathname === "/dashboard/salary"}
              />
              <SidebarItem
                icon={<Users className="h-4 w-4" />}
                label="Thông tin cá nhân"
                href="/dashboard/profile"
                isActive={pathname === "/dashboard/profile"}
              />
            </SidebarItem>
          )}

          {/* Common Features */}
          <SidebarItem
            icon={<Bell className="h-4 w-4" />}
            label="Thông báo"
            href="/dashboard/notifications"
            isActive={pathname === "/dashboard/notifications"}
          />
          <SidebarItem
            icon={<Settings className="h-4 w-4" />}
            label="Cài đặt"
            href="/dashboard/settings"
            isActive={pathname === "/dashboard/settings"}
          />
        </nav>
      </div>
    </div>
  )
}
