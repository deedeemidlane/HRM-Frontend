import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  MoreHorizontal,
  FileEdit,
  Trash2,
  Key,
  Shield,
} from "lucide-react"

export default function UsersManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý tài khoản
          </h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản người dùng trong hệ thống.
          </p>
        </div>
        <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
          <Plus className="mr-2 h-4 w-4" />
          Thêm tài khoản
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách tài khoản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm tài khoản..."
                className="w-full pl-8"
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="sm">
                Xuất Excel
              </Button>
              <Button variant="outline" size="sm">
                Lọc
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phòng ban</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-none",
                          user.role === "Admin" &&
                            "bg-purple-100 text-purple-800",
                          user.role === "HR" && "bg-blue-100 text-blue-800",
                          user.role === "Manager" &&
                            "bg-amber-100 text-amber-800",
                          user.role === "Employee" &&
                            "bg-green-100 text-green-800"
                        )}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-none",
                          user.status === "Hoạt động" &&
                            "bg-green-100 text-green-800",
                          user.status === "Tạm khóa" &&
                            "bg-red-100 text-red-800"
                        )}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
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
                            <Key className="mr-2 h-4 w-4" />
                            Đặt lại mật khẩu
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Phân quyền
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa tài khoản
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* <div className="flex items-center justify-end space-x-2">
            <Button variant="outline" size="sm">
              Trước
            </Button>
            <Button variant="outline" size="sm">
              Sau
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function for conditional class names
const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ")
}

const users = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an.nguyen@ada.com",
    department: "Ban giám đốc",
    role: "Admin",
    status: "Hoạt động",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "binh.tran@ada.com",
    department: "Nhân sự",
    role: "HR",
    status: "Hoạt động",
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    email: "cuong.le@ada.com",
    department: "Kỹ thuật",
    role: "Manager",
    status: "Hoạt động",
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    email: "dung.pham@ada.com",
    department: "Nhân sự",
    role: "HR",
    status: "Hoạt động",
  },
  {
    id: 5,
    name: "Hoàng Văn Đức",
    email: "duc.hoang@ada.com",
    department: "Kỹ thuật",
    role: "Employee",
    status: "Tạm khóa",
  },
  {
    id: 6,
    name: "Ngô Thị Hà",
    email: "ha.ngo@ada.com",
    department: "Sản phẩm",
    role: "Manager",
    status: "Hoạt động",
  },
]
