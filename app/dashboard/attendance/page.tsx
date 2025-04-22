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
import { Search, MoreHorizontal, FileEdit, Calendar, Clock, Download, Filter } from "lucide-react"

export default function AttendanceManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý chấm công</h1>
          <p className="text-muted-foreground">Theo dõi và quản lý chấm công của nhân viên.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Tháng 4, 2025
          </Button>
          <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số nhân viên</CardTitle>
            <div className="h-4 w-4 rounded-full bg-slate-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đi làm hôm nay</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">135</div>
            <p className="text-xs text-muted-foreground">95% tổng số nhân viên</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đi muộn</CardTitle>
            <div className="h-4 w-4 rounded-full bg-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">4.9% tổng số nhân viên</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vắng mặt</CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">4.9% tổng số nhân viên</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="daily">
            <TabsList>
              <TabsTrigger value="daily">Chấm công hàng ngày</TabsTrigger>
              <TabsTrigger value="monthly">Bảng công tháng</TabsTrigger>
              <TabsTrigger value="requests">Yêu cầu điều chỉnh</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily">
            <TabsContent value="daily" className="space-y-4">
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
                      <TableHead>Họ và tên</TableHead>
                      <TableHead>Phòng ban</TableHead>
                      <TableHead>Giờ vào</TableHead>
                      <TableHead>Giờ ra</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dailyAttendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.name}</TableCell>
                        <TableCell>{record.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            {record.checkIn}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            {record.checkOut}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "border-none",
                              record.status === "Đúng giờ" && "bg-green-100 text-green-800",
                              record.status === "Đi muộn" && "bg-amber-100 text-amber-800",
                              record.status === "Vắng mặt" && "bg-red-100 text-red-800",
                            )}
                          >
                            {record.status}
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
                                Điều chỉnh
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Xem lịch sử
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
            <TabsContent value="monthly" className="space-y-4">
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
              <div className="rounded-md border overflow-auto">
                <div className="min-w-[1200px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="sticky left-0 bg-white">Họ và tên</TableHead>
                        <TableHead className="text-center">1</TableHead>
                        <TableHead className="text-center">2</TableHead>
                        <TableHead className="text-center">3</TableHead>
                        <TableHead className="text-center">4</TableHead>
                        <TableHead className="text-center">5</TableHead>
                        <TableHead className="text-center">...</TableHead>
                        <TableHead className="text-center">Tổng công</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyAttendance.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium sticky left-0 bg-white">{record.name}</TableCell>
                          <TableCell className="text-center">{record.day1}</TableCell>
                          <TableCell className="text-center">{record.day2}</TableCell>
                          <TableCell className="text-center">{record.day3}</TableCell>
                          <TableCell className="text-center">{record.day4}</TableCell>
                          <TableCell className="text-center">{record.day5}</TableCell>
                          <TableCell className="text-center">...</TableCell>
                          <TableCell className="text-center font-medium">{record.total}</TableCell>
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
              </div>
            </TabsContent>
            <TabsContent value="requests" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Tìm kiếm yêu cầu..." className="w-full pl-8" />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Lọc
                  </Button>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Họ và tên</TableHead>
                      <TableHead>Loại yêu cầu</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Lý do</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "border-none",
                              request.status === "Đã duyệt" && "bg-green-100 text-green-800",
                              request.status === "Đang chờ" && "bg-amber-100 text-amber-800",
                              request.status === "Từ chối" && "bg-red-100 text-red-800",
                            )}
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8 text-red-600 border-red-600">
                              Từ chối
                            </Button>
                            <Button size="sm" className="h-8 bg-[#3db87a] hover:bg-[#35a46c]">
                              Duyệt
                            </Button>
                          </div>
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

const dailyAttendance = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    department: "Kỹ thuật",
    checkIn: "08:00",
    checkOut: "17:30",
    status: "Đúng giờ",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    department: "Thiết kế",
    checkIn: "08:15",
    checkOut: "17:45",
    status: "Đi muộn",
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    department: "Marketing",
    checkIn: "07:55",
    checkOut: "17:30",
    status: "Đúng giờ",
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    department: "Nhân sự",
    checkIn: "08:30",
    checkOut: "17:30",
    status: "Đi muộn",
  },
  {
    id: 5,
    name: "Hoàng Văn Đức",
    department: "Kỹ thuật",
    checkIn: "--:--",
    checkOut: "--:--",
    status: "Vắng mặt",
  },
]

const monthlyAttendance = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    day1: "✓",
    day2: "✓",
    day3: "✓",
    day4: "✓",
    day5: "✓",
    total: "22/22",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    day1: "✓",
    day2: "L",
    day3: "✓",
    day4: "✓",
    day5: "✓",
    total: "21/22",
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    day1: "✓",
    day2: "✓",
    day3: "✓",
    day4: "P",
    day5: "P",
    total: "20/22",
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    day1: "✓",
    day2: "✓",
    day3: "✓",
    day4: "✓",
    day5: "✓",
    total: "22/22",
  },
]

const attendanceRequests = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    type: "Điều chỉnh công",
    date: "23/04/2025",
    reason: "Quên check-in",
    status: "Đang chờ",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    type: "Nghỉ phép",
    date: "25/04/2025 - 26/04/2025",
    reason: "Việc gia đình",
    status: "Đã duyệt",
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    type: "Làm thêm giờ",
    date: "22/04/2025",
    reason: "Hoàn thành dự án gấp",
    status: "Đã duyệt",
  },
  {
    id: 4,
    name: "Hoàng Văn Đức",
    type: "Nghỉ phép",
    date: "24/04/2025",
    reason: "Đi khám bệnh",
    status: "Từ chối",
  },
]
