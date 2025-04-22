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

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href?: string
  isActive?: boolean
  children?: React.ReactNode
  onClick?: () => void
  role?: string[]
}

const SidebarItem = ({ icon, label, href, isActive, children, onClick, role }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
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
      <span className="flex-1 text-left">{label}</span>
      {hasChildren && <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")} />}
    </>
  )

  return (
    <div className="flex flex-col">
      {href ? (
        <Link
          href={href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium",
            isActive ? "bg-[#edf7f2] text-[#3db87a]" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          {content}
        </Link>
      ) : (
        <Button
          variant="ghost"
          className={cn("flex w-full justify-start px-3 py-2 text-sm font-medium", isOpen ? "bg-gray-100" : "")}
          onClick={handleClick}
        >
          {content}
        </Button>
      )}
      {hasChildren && isOpen && <div className="ml-6 mt-1 border-l border-gray-200 pl-3">{children}</div>}
    </div>
  )
}

export function DashboardSidebar({ userRole = "hr" }: { userRole?: string }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="font-bold text-2xl text-[#3db87a]">ADA</span>
          <span>HR</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          <SidebarItem
            icon={<BarChart2 className="h-5 w-5" />}
            label="Dashboard"
            href="/dashboard"
            isActive={pathname === "/dashboard"}
            role={["admin", "hr", "manager", "employee"]}
          />

          {/* Admin Features */}
          {userRole === "admin" && (
            <SidebarItem icon={<Shield className="h-5 w-5" />} label="Quản trị hệ thống">
              <SidebarItem
                icon={<UserCog className="h-4 w-4" />}
                label="Quản lý tài khoản"
                href="/dashboard/admin/users"
                isActive={pathname === "/dashboard/admin/users"}
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
          {(userRole === "admin" || userRole === "hr") && (
            <SidebarItem icon={<Users className="h-5 w-5" />} label="Quản lý nhân sự">
              <SidebarItem
                icon={<Users className="h-4 w-4" />}
                label="Danh sách nhân viên"
                href="/dashboard/employees"
                isActive={pathname === "/dashboard/employees"}
              />
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
          {(userRole === "admin" || userRole === "hr") && (
            <SidebarItem icon={<Briefcase className="h-5 w-5" />} label="Tuyển dụng">
              <SidebarItem
                icon={<FileText className="h-4 w-4" />}
                label="Tin tuyển dụng"
                href="/dashboard/recruitment"
                isActive={pathname === "/dashboard/recruitment"}
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
                isActive={pathname === "/dashboard/recruitment/interviews"}
              />
            </SidebarItem>
          )}

          {/* Manager Features */}
          {(userRole === "admin" || userRole === "manager") && (
            <SidebarItem icon={<CheckSquare className="h-5 w-5" />} label="Quản lý bộ phận">
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
          {(userRole === "admin" || userRole === "hr" || userRole === "manager" || userRole === "employee") && (
            <SidebarItem icon={<UserCog className="h-5 w-5" />} label="Cá nhân">
              <SidebarItem
                icon={<Users className="h-4 w-4" />}
                label="Thông tin cá nhân"
                href="/dashboard/profile"
                isActive={pathname === "/dashboard/profile"}
              />
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
            </SidebarItem>
          )}

          {/* Common Features */}
          <SidebarItem
            icon={<Bell className="h-5 w-5" />}
            label="Thông báo"
            href="/dashboard/notifications"
            isActive={pathname === "/dashboard/notifications"}
          />
          <SidebarItem
            icon={<Settings className="h-5 w-5" />}
            label="Cài đặt"
            href="/dashboard/settings"
            isActive={pathname === "/dashboard/settings"}
          />
        </nav>
      </div>
    </div>
  )
}
