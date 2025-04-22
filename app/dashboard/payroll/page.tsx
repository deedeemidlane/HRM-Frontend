import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  FileText,
  Download,
  Filter,
  Eye,
  Printer,
  DollarSign,
  Calendar,
  Send,
} from "lucide-react"

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lương & Phúc lợi</h1>
          <p className="text-muted-foreground">Quản lý lương, thưởng và phúc lợi của nhân viên.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Tháng 4, 2025
          </Button>
          <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
            <Plus className="mr-2 h-4 w-4" />
            Tạo bảng lương
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng quỹ lương</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.25 tỷ VNĐ</div>
            <p className="text-xs text-muted-foreground">Tháng 4/2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lương trung bình</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5 triệu VNĐ</div>
            <p className="text-xs text-muted-foreground">Tháng 4/2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng thưởng</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125 triệu VNĐ</div>
            <p className="text-xs text-muted-foreground">Tháng 4/2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bảo hiểm & Phúc lợi</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250 triệu VNĐ</div>
            <p className="text-xs text-muted-foreground">Tháng 4/2025</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="payroll">
            <TabsList>
              <TabsTrigger value="payroll">Bảng lương</TabsTrigger>
              <TabsTrigger value="benefits">Phúc lợi</TabsTrigger>
              <TabsTrigger value="insurance">Bảo hiểm</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="payroll">
            <TabsContent value="payroll" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nhân viên</TableHead>
                      <TableHead>Lương cơ bản</TableHead>
                      <TableHead>Phụ cấp</TableHead>
                      <TableHead>Thưởng</TableHead>
                      <TableHead>Khấu trừ</TableHead>
                      <TableHead>Thực lãnh</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.employee}</TableCell>
                        <TableCell>{item.baseSalary}</TableCell>
                        <TableCell>{item.allowance}</TableCell>
                        <TableCell>{item.bonus}</TableCell>
                        <TableCell>{item.deduction}</TableCell>
                        <TableCell className="font-medium">{item.netSalary}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "border-none",
                              item.status === "Đã thanh toán" && "bg-green-100 text-green-800",
                              item.status === "Chờ thanh toán" && "bg-amber-100 text-amber-800",
                              item.status === "Chưa tính toán" && "bg-gray-100 text-gray-800",
                            )}
                          >
                            {item.status}
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
                                <Eye className="mr-2 h-4 w-4" />
                                Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileEdit className="mr-2 h-4 w-4" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                In phiếu lương
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="mr-2 h-4 w-4" />
                                Gửi phiếu lương
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
            </TabsContent>
            <TabsContent value="benefits" className="space-y-4">
              <div className="flex justify-end">
                <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm phúc lợi
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên phúc lợi</TableHead>
                      <TableHead>Mô tả</TableHead>
                      <TableHead>Đối tượng áp dụng</TableHead>
                      <TableHead>Giá trị</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {benefitsData.map((benefit) => (
                      <TableRow key={benefit.id}>
                        <TableCell className="font-medium">{benefit.name}</TableCell>
                        <TableCell>{benefit.description}</TableCell>
                        <TableCell>{benefit.eligibility}</TableCell>
                        <TableCell>{benefit.value}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "border-none",
                              benefit.status === "Đang áp dụng" && "bg-green-100 text-green-800",
                              benefit.status === "Tạm ngưng" && "bg-red-100 text-red-800",
                            )}
                          >
                            {benefit.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="insurance" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nhân viên</TableHead>
                      <TableHead>Mã số BHXH</TableHead>
                      <TableHead>Mã số BHYT</TableHead>
                      <TableHead>Mức đóng</TableHead>
                      <TableHead>Công ty đóng</TableHead>
                      <TableHead>Nhân viên đóng</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insuranceData.map((insurance) => (
                      <TableRow key={insurance.id}>
                        <TableCell className="font-medium">{insurance.employee}</TableCell>
                        <TableCell>{insurance.socialInsuranceCode}</TableCell>
                        <TableCell>{insurance.healthInsuranceCode}</TableCell>
                        <TableCell>{insurance.baseSalary}</TableCell>
                        <TableCell>{insurance.companyContribution}</TableCell>
                        <TableCell>{insurance.employeeContribution}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "border-none",
                              insurance.status === "Đã đóng" && "bg-green-100 text-green-800",
                              insurance.status === "Chưa đóng" && "bg-amber-100 text-amber-800",
                            )}
                          >
                            {insurance.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function for conditional class names
const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ")
}

const payrollData = [
  {
    id: 1,
    employee: "Nguyễn Văn An",
    baseSalary: "25,000,000 VNĐ",
    allowance: "3,000,000 VNĐ",
    bonus: "2,000,000 VNĐ",
    deduction: "3,750,000 VNĐ",
    netSalary: "26,250,000 VNĐ",
    status: "Đã thanh toán",
  },
  {
    id: 2,
    employee: "Trần Thị Bình",
    baseSalary: "20,000,000 VNĐ",
    allowance: "2,500,000 VNĐ",
    bonus: "1,500,000 VNĐ",
    deduction: "3,000,000 VNĐ",
    netSalary: "21,000,000 VNĐ",
    status: "Đã thanh toán",
  },
  {
    id: 3,
    employee: "Lê Văn Cường",
    baseSalary: "30,000,000 VNĐ",
    allowance: "4,000,000 VNĐ",
    bonus: "3,000,000 VNĐ",
    deduction: "4,500,000 VNĐ",
    netSalary: "32,500,000 VNĐ",
    status: "Đã thanh toán",
  },
  {
    id: 4,
    employee: "Phạm Thị Dung",
    baseSalary: "18,000,000 VNĐ",
    allowance: "2,000,000 VNĐ",
    bonus: "1,000,000 VNĐ",
    deduction: "2,700,000 VNĐ",
    netSalary: "18,300,000 VNĐ",
    status: "Chờ thanh toán",
  },
  {
    id: 5,
    employee: "Hoàng Văn Đức",
    baseSalary: "22,000,000 VNĐ",
    allowance: "2,500,000 VNĐ",
    bonus: "0 VNĐ",
    deduction: "3,300,000 VNĐ",
    netSalary: "21,200,000 VNĐ",
    status: "Chưa tính toán",
  },
]

const benefitsData = [
  {
    id: 1,
    name: "Bảo hiểm sức khỏe",
    description: "Bảo hiểm sức khỏe toàn diện cho nhân viên và người thân",
    eligibility: "Tất cả nhân viên chính thức",
    value: "20,000,000 VNĐ/năm",
    status: "Đang áp dụng",
  },
  {
    id: 2,
    name: "Trợ cấp ăn trưa",
    description: "Trợ cấp ăn trưa hàng ngày",
    eligibility: "Tất cả nhân viên",
    value: "1,000,000 VNĐ/tháng",
    status: "Đang áp dụng",
  },
  {
    id: 3,
    name: "Trợ cấp đi lại",
    description: "Trợ cấp đi lại hàng tháng",
    eligibility: "Nhân viên cấp quản lý",
    value: "2,000,000 VNĐ/tháng",
    status: "Đang áp dụng",
  },
  {
    id: 4,
    name: "Quỹ du lịch",
    description: "Quỹ du lịch hàng năm cho nhân viên",
    eligibility: "Nhân viên làm việc trên 1 năm",
    value: "5,000,000 VNĐ/năm",
    status: "Tạm ngưng",
  },
]

const insuranceData = [
  {
    id: 1,
    employee: "Nguyễn Văn An",
    socialInsuranceCode: "0123456789",
    healthInsuranceCode: "HC0123456789",
    baseSalary: "25,000,000 VNĐ",
    companyContribution: "5,250,000 VNĐ",
    employeeContribution: "2,750,000 VNĐ",
    status: "Đã đóng",
  },
  {
    id: 2,
    employee: "Trần Thị Bình",
    socialInsuranceCode: "0123456790",
    healthInsuranceCode: "HC0123456790",
    baseSalary: "20,000,000 VNĐ",
    companyContribution: "4,200,000 VNĐ",
    employeeContribution: "2,200,000 VNĐ",
    status: "Đã đóng",
  },
  {
    id: 3,
    employee: "Lê Văn Cường",
    socialInsuranceCode: "0123456791",
    healthInsuranceCode: "HC0123456791",
    baseSalary: "30,000,000 VNĐ",
    companyContribution: "6,300,000 VNĐ",
    employeeContribution: "3,300,000 VNĐ",
    status: "Đã đóng",
  },
  {
    id: 4,
    employee: "Phạm Thị Dung",
    socialInsuranceCode: "0123456792",
    healthInsuranceCode: "HC0123456792",
    baseSalary: "18,000,000 VNĐ",
    companyContribution: "3,780,000 VNĐ",
    employeeContribution: "1,980,000 VNĐ",
    status: "Chưa đóng",
  },
]
