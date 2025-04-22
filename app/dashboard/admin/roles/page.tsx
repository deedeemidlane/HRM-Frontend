import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, MoreHorizontal, FileEdit, Trash2, Shield } from "lucide-react"

export default function RolesManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phân quyền</h1>
          <p className="text-muted-foreground">Quản lý vai trò và quyền hạn trong hệ thống.</p>
        </div>
        <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
          <Plus className="mr-2 h-4 w-4" />
          Thêm vai trò
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách vai trò</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Tìm kiếm vai trò..." className="w-full pl-8" />
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên vai trò</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Số người dùng</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className={`h-4 w-4 ${role.iconColor}`} />
                        {role.name}
                      </div>
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.userCount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Mở menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileEdit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Phân quyền chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa vai trò
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phân quyền chi tiết</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Chức năng</TableHead>
                  <TableHead className="text-center">Admin</TableHead>
                  <TableHead className="text-center">HR</TableHead>
                  <TableHead className="text-center">Manager</TableHead>
                  <TableHead className="text-center">Employee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className="font-medium">{permission.name}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked={permission.admin} disabled />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked={permission.hr} disabled />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked={permission.manager} disabled />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox checked={permission.employee} disabled />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const roles = [
  {
    id: 1,
    name: "Admin",
    description: "Quản trị viên hệ thống, có quyền cao nhất",
    userCount: 2,
    iconColor: "text-purple-500",
  },
  {
    id: 2,
    name: "HR",
    description: "Nhân viên phòng nhân sự, quản lý thông tin nhân viên",
    userCount: 5,
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    name: "Manager",
    description: "Quản lý phòng ban, quản lý nhân viên cấp dưới",
    userCount: 12,
    iconColor: "text-amber-500",
  },
  {
    id: 4,
    name: "Employee",
    description: "Nhân viên thông thường",
    userCount: 123,
    iconColor: "text-green-500",
  },
]

const permissions = [
  {
    id: 1,
    name: "Quản lý tài khoản người dùng",
    admin: true,
    hr: false,
    manager: false,
    employee: false,
  },
  {
    id: 2,
    name: "Phân quyền người dùng",
    admin: true,
    hr: false,
    manager: false,
    employee: false,
  },
  {
    id: 3,
    name: "Quản lý hồ sơ nhân viên",
    admin: true,
    hr: true,
    manager: false,
    employee: false,
  },
  {
    id: 4,
    name: "Quản lý tuyển dụng",
    admin: true,
    hr: true,
    manager: false,
    employee: false,
  },
  {
    id: 5,
    name: "Quản lý chấm công",
    admin: true,
    hr: true,
    manager: true,
    employee: false,
  },
  {
    id: 6,
    name: "Quản lý lương thưởng",
    admin: true,
    hr: true,
    manager: false,
    employee: false,
  },
  {
    id: 7,
    name: "Duyệt đơn nghỉ phép/OT",
    admin: true,
    hr: true,
    manager: true,
    employee: false,
  },
  {
    id: 8,
    name: "Xem thông tin cá nhân",
    admin: true,
    hr: true,
    manager: true,
    employee: true,
  },
  {
    id: 9,
    name: "Chấm công cá nhân",
    admin: true,
    hr: true,
    manager: true,
    employee: true,
  },
  {
    id: 10,
    name: "Gửi đơn nghỉ phép/OT",
    admin: true,
    hr: true,
    manager: true,
    employee: true,
  },
]
