"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, CheckCircle, XCircle, Clock, FileText, CalendarPlus2Icon as CalendarIcon2 } from "lucide-react"

export default function EmployeeRequestsPage() {
  const [date, setDate] = useState<Date>()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Đơn từ</h1>
          <p className="text-muted-foreground">Quản lý đơn nghỉ phép, làm thêm giờ và điều chỉnh công.</p>
        </div>
        <Button className="bg-[#3db87a] hover:bg-[#35a46c]" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hủy" : "Tạo đơn mới"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Tạo đơn mới</CardTitle>
            <CardDescription>Điền thông tin để tạo đơn từ mới</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="request-type">Loại đơn</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại đơn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leave">Đơn nghỉ phép</SelectItem>
                  <SelectItem value="overtime">Đơn làm thêm giờ</SelectItem>
                  <SelectItem value="adjustment">Đơn điều chỉnh công</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ngày</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-time">Giờ bắt đầu</Label>
                <Select>
                  <SelectTrigger id="start-time">
                    <SelectValue placeholder="Chọn giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={hour.toString().padStart(2, "0")}>
                        {hour.toString().padStart(2, "0")}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">Giờ kết thúc</Label>
                <Select>
                  <SelectTrigger id="end-time">
                    <SelectValue placeholder="Chọn giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={hour.toString().padStart(2, "0")}>
                        {hour.toString().padStart(2, "0")}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Lý do</Label>
              <Textarea id="reason" placeholder="Nhập lý do..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Ghi chú (nếu có)</Label>
              <Textarea id="note" placeholder="Nhập ghi chú..." />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Hủy
            </Button>
            <Button className="bg-[#3db87a] hover:bg-[#35a46c]">Gửi đơn</Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Tất cả đơn</TabsTrigger>
              <TabsTrigger value="pending">Đang chờ</TabsTrigger>
              <TabsTrigger value="approved">Đã duyệt</TabsTrigger>
              <TabsTrigger value="rejected">Từ chối</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Loại đơn</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Lý do</TableHead>
                      <TableHead>Ngày gửi</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Phản hồi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {request.type === "Nghỉ phép" ? (
                              <CalendarIcon2 className="h-4 w-4 text-blue-500" />
                            ) : request.type === "Làm thêm giờ" ? (
                              <Clock className="h-4 w-4 text-amber-500" />
                            ) : (
                              <FileText className="h-4 w-4 text-purple-500" />
                            )}
                            <span className="font-medium">{request.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>{request.submitDate}</TableCell>
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
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {request.status === "Đã duyệt" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : request.status === "Từ chối" ? (
                              <XCircle className="h-4 w-4 text-red-500" />
                            ) : null}
                            <span className="text-sm">{request.feedback}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Loại đơn</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Lý do</TableHead>
                      <TableHead>Ngày gửi</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myRequests
                      .filter((request) => request.status === "Đang chờ")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {request.type === "Nghỉ phép" ? (
                                <CalendarIcon2 className="h-4 w-4 text-blue-500" />
                              ) : request.type === "Làm thêm giờ" ? (
                                <Clock className="h-4 w-4 text-amber-500" />
                              ) : (
                                <FileText className="h-4 w-4 text-purple-500" />
                              )}
                              <span className="font-medium">{request.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{request.date}</TableCell>
                          <TableCell>{request.reason}</TableCell>
                          <TableCell>{request.submitDate}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-none bg-amber-100 text-amber-800">
                              {request.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="approved" className="space-y-4">
              {/* Similar table for approved requests */}
            </TabsContent>
            <TabsContent value="rejected" className="space-y-4">
              {/* Similar table for rejected requests */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin nghỉ phép</CardTitle>
          <CardDescription>Số ngày phép còn lại và đã sử dụng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tổng số ngày phép:</p>
              <p className="text-2xl font-bold">12 ngày</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Đã sử dụng:</p>
              <p className="text-2xl font-bold">4 ngày</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Còn lại:</p>
              <p className="text-2xl font-bold">8 ngày</p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border bg-muted/40 p-4">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#3db87a]" />
              <span className="font-medium">Lưu ý</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Số ngày phép còn lại sẽ được cập nhật sau khi đơn nghỉ phép được duyệt. Vui lòng gửi đơn nghỉ phép trước
              ít nhất 3 ngày làm việc.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const myRequests = [
  {
    id: 1,
    type: "Nghỉ phép",
    date: "20/04/2025",
    reason: "Việc gia đình",
    submitDate: "15/04/2025",
    status: "Đã duyệt",
    feedback: "Đã duyệt bởi Nguyễn Văn A",
  },
  {
    id: 2,
    type: "Điều chỉnh công",
    date: "15/04/2025",
    reason: "Quên check-out",
    submitDate: "16/04/2025",
    status: "Đã duyệt",
    feedback: "Đã duyệt bởi Nguyễn Văn A",
  },
  {
    id: 3,
    type: "Làm thêm giờ",
    date: "10/04/2025",
    reason: "Hoàn thành dự án gấp",
    submitDate: "08/04/2025",
    status: "Từ chối",
    feedback: "Không có kế hoạch OT trong tháng này",
  },
  {
    id: 4,
    type: "Nghỉ phép",
    date: "05/05/2025",
    reason: "Đi khám bệnh",
    submitDate: "22/04/2025",
    status: "Đang chờ",
    feedback: "",
  },
]
