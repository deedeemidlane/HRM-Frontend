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
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, FileEdit, Trash2, Mail, Phone, FileText, Download, Filter } from "lucide-react"

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Danh sách nhân viên</h1>
          <p className="text-muted-foreground">Quản lý thông tin nhân viên trong công ty.</p>
        </div>
        <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
          <Plus className="mr-2 h-4 w-4" />
          Thêm nhân viên
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm và lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Tìm kiếm nhân viên..." className="w-full pl-8" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Xuất Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách nhân viên</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Thông tin liên hệ</TableHead>
                  <TableHead>Phòng ban</TableHead>
                  <TableHead>Chức vụ</TableHead>
                  <TableHead>Ngày vào làm</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                          {employee.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
                          {employee.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.startDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-none",
                          employee.status === "Đang làm việc" && "bg-green-100 text-green-800",
                          employee.status === "Nghỉ phép" && "bg-amber-100 text-amber-800",
                          employee.status === "Đã nghỉ việc" && "bg-red-100 text-red-800",
                        )}
                      >
                        {employee.status}
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
                            <FileText className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileEdit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Liên hệ
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Button variant="outline" size="sm">
              Trước
            </Button>
            <Button variant="outline" size="sm">
              Sau
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function for conditional class names
const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ")
}

const employees = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an.nguyen@ada.com",
    phone: "0912 345 678",
    department: "Kỹ thuật",
    position: "Senior Developer",
    startDate: "10/01/2022",
    status: "Đang làm việc",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "binh.tran@ada.com",
    phone: "0987 654 321",
    department: "Thiết kế",
    position: "UX Designer",
    startDate: "15/03/2022",
    status: "Đang làm việc",
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    email: "cuong.le@ada.com",
    phone: "0901 234 567",
    department: "Marketing",
    position: "Marketing Manager",
    startDate: "08/02/2021",
    status: "Đang làm việc",
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    email: "dung.pham@ada.com",
    phone: "0976 543 210",
    department: "Nhân sự",
    position: "HR Specialist",
    startDate: "22/11/2022",
    status: "Đang làm việc",
  },
  {
    id: 5,
    name: "Hoàng Văn Đức",
    email: "duc.hoang@ada.com",
    phone: "0932 109 876",
    department: "Kỹ thuật",
    position: "Frontend Developer",
    startDate: "03/04/2022",
    status: "Nghỉ phép",
  },
  {
    id: 6,
    name: "Ngô Thị Hà",
    email: "ha.ngo@ada.com",
    phone: "0965 432 109",
    department: "Sản phẩm",
    position: "Product Manager",
    startDate: "17/07/2021",
    status: "Đang làm việc",
  },
  {
    id: 7,
    name: "Vũ Văn Giang",
    email: "giang.vu@ada.com",
    phone: "0912 876 543",
    department: "Kỹ thuật",
    position: "Backend Developer",
    startDate: "05/09/2022",
    status: "Đang làm việc",
  },
  {
    id: 8,
    name: "Đỗ Thị Hương",
    email: "huong.do@ada.com",
    phone: "0987 123 456",
    department: "Tài chính",
    position: "Financial Analyst",
    startDate: "30/01/2023",
    status: "Đã nghỉ việc",
  },
]
