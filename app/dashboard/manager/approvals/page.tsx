import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

// Dữ liệu mẫu cho đơn nghỉ phép
const leaveRequests = [
  {
    id: "LEA001",
    employee: "Nguyễn Văn A",
    department: "Kỹ thuật",
    type: "Nghỉ phép",
    startDate: "15/05/2023",
    endDate: "17/05/2023",
    days: 3,
    reason: "Lý do cá nhân",
    status: "Chờ duyệt",
  },
  {
    id: "LEA002",
    employee: "Trần Thị B",
    department: "Marketing",
    type: "Nghỉ ốm",
    startDate: "10/05/2023",
    endDate: "12/05/2023",
    days: 3,
    reason: "Bị ốm, có giấy bác sĩ",
    status: "Chờ duyệt",
  },
  {
    id: "LEA003",
    employee: "Lê Văn C",
    department: "Nhân sự",
    type: "Nghỉ phép",
    startDate: "20/05/2023",
    endDate: "20/05/2023",
    days: 1,
    reason: "Việc gia đình",
    status: "Đã duyệt",
  },
  {
    id: "LEA004",
    employee: "Phạm Thị D",
    department: "Kế toán",
    type: "Nghỉ không lương",
    startDate: "01/06/2023",
    endDate: "15/06/2023",
    days: 15,
    reason: "Du lịch nước ngoài",
    status: "Từ chối",
  },
]

// Dữ liệu mẫu cho đơn làm thêm giờ
const overtimeRequests = [
  {
    id: "OT001",
    employee: "Nguyễn Văn A",
    department: "Kỹ thuật",
    date: "18/05/2023",
    startTime: "18:00",
    endTime: "21:00",
    hours: 3,
    reason: "Hoàn thành dự án gấp",
    status: "Chờ duyệt",
  },
  {
    id: "OT002",
    employee: "Trần Thị B",
    department: "Marketing",
    date: "19/05/2023",
    startTime: "18:00",
    endTime: "20:00",
    hours: 2,
    reason: "Chuẩn bị tài liệu cho sự kiện",
    status: "Chờ duyệt",
  },
  {
    id: "OT003",
    employee: "Lê Văn C",
    department: "Nhân sự",
    date: "15/05/2023",
    startTime: "18:00",
    endTime: "22:00",
    hours: 4,
    reason: "Tuyển dụng gấp",
    status: "Đã duyệt",
  },
]

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Duyệt đơn từ</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="pending">Chờ duyệt</SelectItem>
              <SelectItem value="approved">Đã duyệt</SelectItem>
              <SelectItem value="rejected">Từ chối</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo phòng ban" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả phòng ban</SelectItem>
              <SelectItem value="tech">Kỹ thuật</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="hr">Nhân sự</SelectItem>
              <SelectItem value="accounting">Kế toán</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="leave" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leave" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Đơn nghỉ phép</span>
          </TabsTrigger>
          <TabsTrigger value="overtime" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Đơn làm thêm giờ</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leave" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách đơn nghỉ phép</CardTitle>
              <CardDescription>
                Quản lý và duyệt các đơn nghỉ phép của nhân viên trong bộ phận
                của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Nhân viên</TableHead>
                    <TableHead>Phòng ban</TableHead>
                    <TableHead>Loại nghỉ</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Số ngày</TableHead>
                    <TableHead>Lý do</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.id}
                      </TableCell>
                      <TableCell>{request.employee}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>
                        {request.startDate} - {request.endDate}
                      </TableCell>
                      <TableCell>{request.days}</TableCell>
                      <TableCell
                        className="max-w-[200px] truncate"
                        title={request.reason}
                      >
                        {request.reason}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "Chờ duyệt"
                              ? "outline"
                              : request.status === "Đã duyệt"
                              ? "success"
                              : "destructive"
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === "Chờ duyệt" ? (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs"
                            >
                              Xem chi tiết
                            </Button>
                            <Button
                              size="sm"
                              variant="default"
                              className="h-8 bg-[#3db87a] text-xs hover:bg-[#35a46c]"
                            >
                              Duyệt
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 text-xs"
                            >
                              Từ chối
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs"
                          >
                            Xem chi tiết
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách đơn làm thêm giờ</CardTitle>
              <CardDescription>
                Quản lý và duyệt các đơn làm thêm giờ của nhân viên trong bộ
                phận của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Nhân viên</TableHead>
                    <TableHead>Phòng ban</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Số giờ</TableHead>
                    <TableHead>Lý do</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overtimeRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.id}
                      </TableCell>
                      <TableCell>{request.employee}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>
                        {request.startTime} - {request.endTime}
                      </TableCell>
                      <TableCell>{request.hours}</TableCell>
                      <TableCell
                        className="max-w-[200px] truncate"
                        title={request.reason}
                      >
                        {request.reason}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "Chờ duyệt"
                              ? "outline"
                              : request.status === "Đã duyệt"
                              ? "success"
                              : "destructive"
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === "Chờ duyệt" ? (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs"
                            >
                              Xem chi tiết
                            </Button>
                            <Button
                              size="sm"
                              variant="default"
                              className="h-8 bg-[#3db87a] text-xs hover:bg-[#35a46c]"
                            >
                              Duyệt
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 text-xs"
                            >
                              Từ chối
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs"
                          >
                            Xem chi tiết
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
