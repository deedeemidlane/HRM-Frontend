"use client"

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
  MoreHorizontal,
  FileEdit,
  Calendar,
  Clock,
  Download,
  Filter,
  Check,
  X,
  CircleMinus,
  Minus,
  CircleAlert,
  Calendar1,
} from "lucide-react"
import { useEffect, useState } from "react"
import { IAttendance } from "@/types/Attendance"
import useGetAllAttendanceHistory from "@/hooks/hr/useGetAllAttendanceHistory"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IEmployee } from "@/types/Employee"
import UpdateAttendanceModal from "./ui/UpdateAttendanceModal"

const getAttendanceMark = (
  onClick: () => void,
  status?: "ON_TIME" | "ABSENT" | "LATE"
) => {
  if (!status) return <>-</>
  switch (status) {
    case "ON_TIME":
      return (
        <Button
          size={"icon"}
          className="rounded-full h-8 w-8"
          onClick={onClick}
        >
          <Check />
        </Button>
      )

    case "ABSENT":
      return (
        <Button
          size={"icon"}
          variant={"destructive"}
          className="rounded-full h-8 w-8"
          onClick={onClick}
        >
          <X />
        </Button>
      )
    case "LATE":
      return (
        <Button
          size={"icon"}
          className="rounded-full h-8 w-8 bg-amber-400 hover:bg-amber-400 hover:opacity-90"
          onClick={onClick}
        >
          <Minus />
        </Button>
      )

    default:
      return <></>
  }
}

interface IAttendanceRecord {
  employee: IEmployee
  attendances: IAttendance[]
}

export default function AttendanceManagementPage() {
  const [toggleReRender, setToggleReRender] = useState(false)

  const [month, setMonth] = useState((new Date().getMonth() + 1).toString())
  const [year, setYear] = useState(new Date().getFullYear().toString())

  const [attendances, setAttendances] = useState<IAttendanceRecord[]>([])

  const { getAllAttendanceHistory } = useGetAllAttendanceHistory()

  useEffect(() => {
    const fetchAttendances = async () => {
      const fetchedAttendances = await getAllAttendanceHistory(month, year)
      if (fetchedAttendances) setAttendances(fetchedAttendances)
    }
    fetchAttendances()
  }, [month, year, toggleReRender])

  const [selectedAttendance, setSelectedAttendance] = useState<IAttendance>()
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee>()

  const [openUpdateAttendanceModal, setOpenUpdateAttendanceModal] =
    useState(false)

  const renderAttendanceMask = (record: IAttendanceRecord, date: number) => {
    const attendance = record.attendances.find(
      (attendance) =>
        attendance.date ===
        `${year}-${month.padStart(2, "0")}-${date.toString().padStart(2, "0")}`
    )
    return getAttendanceMark(() => {
      setSelectedAttendance(attendance)
      setSelectedEmployee(record.employee)
      setOpenUpdateAttendanceModal(true)
    }, attendance?.status)
  }

  const resetModalData = () => {
    setSelectedAttendance(undefined)
    setSelectedEmployee(undefined)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý chấm công
          </h1>
          <p className="text-muted-foreground">
            Theo dõi và quản lý chấm công của nhân viên.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={month} onValueChange={(value) => setMonth(value)}>
            <SelectTrigger className="w-[150px]">
              <Calendar1 className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Chọn tháng" className="w-fit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((index) => (
                  <SelectItem key={`month-${index}`} value={index.toString()}>
                    Tháng {index}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={(value) => setYear(value)}>
            <SelectTrigger className="w-[120px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() - i
                ).map((index) => (
                  <SelectItem key={`year-${index}`} value={index.toString()}>
                    {index}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Tháng 4, 2025
          </Button> */}
          {/* <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button> */}
        </div>
      </div>

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số nhân viên
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-slate-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Đi làm hôm nay
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">135</div>
            <p className="text-xs text-muted-foreground">
              95% tổng số nhân viên
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đi muộn</CardTitle>
            <div className="h-4 w-4 rounded-full bg-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              4.9% tổng số nhân viên
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vắng mặt</CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              4.9% tổng số nhân viên
            </p>
          </CardContent>
        </Card>
      </div> */}

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">
              Bảng công tháng {month.padStart(2, "0")}/{year}
            </h3>
            <div className="flex gap-5 justify-center">
              <div className="flex items-center gap-1">
                <Button
                  size={"icon"}
                  className="rounded-full h-8 w-8 disabled:opacity-100"
                  disabled
                >
                  <Check />
                </Button>
                <span className="font-semibold text-sm">: Đúng giờ</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size={"icon"}
                  variant={"destructive"}
                  className="rounded-full h-8 w-8 disabled:opacity-100"
                  disabled
                >
                  <X />
                </Button>
                <span className="font-semibold text-sm">: Vắng</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size={"icon"}
                  className="rounded-full h-8 w-8 bg-amber-400 hover:bg-amber-400 hover:opacity-90 disabled:opacity-100"
                  disabled
                >
                  <Minus />
                </Button>
                <span className="font-semibold text-sm">: Đi muộn</span>
              </div>
            </div>
          </div>
          <Tabs defaultValue="monthly">
            {/* <TabsList className="mb-4">
              <TabsTrigger value="daily">Chấm công hàng ngày</TabsTrigger>
              <TabsTrigger value="monthly">Bảng công tháng</TabsTrigger>
              <TabsTrigger value="requests">Yêu cầu điều chỉnh</TabsTrigger>
            </TabsList> */}
            <TabsContent value="daily" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Tìm kiếm nhân viên..."
                    className="w-full pl-8"
                  />
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
                        <TableCell className="font-medium">
                          {record.name}
                        </TableCell>
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
                              record.status === "Đúng giờ" &&
                                "bg-green-100 text-green-800",
                              record.status === "Đi muộn" &&
                                "bg-amber-100 text-amber-800",
                              record.status === "Vắng mặt" &&
                                "bg-red-100 text-red-800"
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
              {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Tìm kiếm nhân viên..."
                    className="w-full pl-8"
                  />
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
              </div> */}
              <div className="rounded-md border overflow-auto text-sm">
                <div className="w-full">
                  {attendances.length > 0 ? (
                    <table className="w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="sticky top-0 left-0 whitespace-nowrap bg-white border-r-2">
                            Nhân viên
                          </TableHead>
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(
                            (dateIndex) => (
                              <TableHead
                                key={`date-${dateIndex}`}
                                className="text-center"
                              >
                                {dateIndex.toString().padStart(2, "0")}
                              </TableHead>
                            )
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendances.map((record, index) => (
                          <TableRow key={`history-${index}`}>
                            <TableCell className="font-medium sticky top-0 left-0 whitespace-nowrap bg-white border-r-2">
                              {record.employee.fullName}
                            </TableCell>
                            {/* <TableCell className="text-center">
                            {record.day1}
                          </TableCell> */}
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(
                              (dateIndex) => (
                                <TableCell
                                  key={`dateAttendance-${dateIndex}`}
                                  className="text-center"
                                >
                                  {renderAttendanceMask(record, dateIndex)}
                                </TableCell>
                              )
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </table>
                  ) : (
                    <div className="text-center py-10">Không có dữ liệu</div>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="requests" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Tìm kiếm yêu cầu..."
                    className="w-full pl-8"
                  />
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
                        <TableCell className="font-medium">
                          {request.name}
                        </TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "border-none",
                              request.status === "Đã duyệt" &&
                                "bg-green-100 text-green-800",
                              request.status === "Đang chờ" &&
                                "bg-amber-100 text-amber-800",
                              request.status === "Từ chối" &&
                                "bg-red-100 text-red-800"
                            )}
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-red-600 border-red-600"
                            >
                              Từ chối
                            </Button>
                            <Button
                              size="sm"
                              className="h-8 bg-[#3db87a] hover:bg-[#35a46c]"
                            >
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

      {selectedAttendance && selectedEmployee && (
        <UpdateAttendanceModal
          open={openUpdateAttendanceModal}
          setOpen={setOpenUpdateAttendanceModal}
          currentCheckInTime={selectedAttendance.checkInTime}
          currentCheckOutTime={selectedAttendance.checkOutTime}
          currentDate={selectedAttendance.date}
          employee={selectedEmployee}
          resetModalData={resetModalData}
          toggleReRender={() => setToggleReRender(!toggleReRender)}
        />
      )}
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
