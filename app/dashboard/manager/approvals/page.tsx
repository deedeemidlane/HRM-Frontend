"use client"

import { useEffect, useState } from "react"
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
import {
  Clock,
  Check,
  X,
  FileText,
  CalendarPlus2Icon as CalendarIcon2,
  Briefcase,
  DollarSign,
  LogOut,
  Laptop,
  Home,
  Loader2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { IRequest, RequestType } from "@/types/Request"
import useGetAllRequests from "@/hooks/manager/useGetAllRequests"
import { cn } from "@/lib/utils"
import { DISPLAYED_REQUEST_STATUSES } from "@/constants/statuses"
import { REQUEST_TYPE_LABELS } from "@/constants/requests"
import { formatDateString } from "@/utils/formatDate"
import useUpdateRequest from "@/hooks/manager/useUpdateRequest"
import { Spinner } from "@/components/Spinner"

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
  const [requests, setRequests] = useState<IRequest[]>([])
  const { getAllRequests } = useGetAllRequests()

  const [toggleReRender, setToggleReRender] = useState(false)

  useEffect(() => {
    const fetchRequests = async () => {
      const fetchedRequests = await getAllRequests()
      if (fetchedRequests) setRequests(fetchedRequests)
    }
    fetchRequests()
  }, [toggleReRender])

  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<IRequest>()
  const [comment, setComment] = useState("")

  const handleApprove = (request: IRequest) => {
    setSelectedRequest(request)
    setComment("")
    setApproveDialogOpen(true)
  }

  const handleReject = (request: IRequest) => {
    setSelectedRequest(request)
    setComment("")
    setRejectDialogOpen(true)
  }

  const { loading, updateRequest } = useUpdateRequest()

  const confirmApprove = async () => {
    const data = {
      id: selectedRequest?.id,
      comment,
      status: "APPROVED",
    }

    await updateRequest(data)
    setApproveDialogOpen(false)
    setToggleReRender(!toggleReRender)
  }

  const confirmReject = async () => {
    const data = {
      id: selectedRequest?.id,
      comment,
      status: "REJECTED",
    }

    await updateRequest(data)
    setRejectDialogOpen(false)
    setToggleReRender(!toggleReRender)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Duyệt đơn từ</h1>
          <CardDescription>
            Quản lý và duyệt các đơn từ của nhân viên trong bộ phận của bạn.
          </CardDescription>
        </div>
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
          {/* <Select defaultValue="all">
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
          </Select> */}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead className="whitespace-nowrap">Nhân viên</TableHead>
                  {/* <TableHead>Phòng ban</TableHead> */}
                  <TableHead>Loại đơn</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Lý do</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.employeeName}</TableCell>
                    {/* <TableCell>{request.department}</TableCell> */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          {REQUEST_TYPE_ICONS[request.requestType] || (
                            <FileText className="h-4 w-4 text-purple-500" />
                          )}
                        </div>
                        <span className="font-medium whitespace-nowrap">
                          {REQUEST_TYPE_LABELS[request.requestType] ||
                            request.requestType}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDateString(request.requestedDate)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {request.startTime.slice(0, 5)} -{" "}
                      {request.endTime.slice(0, 5)}
                    </TableCell>
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={request.note}
                    >
                      {request.note}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-none whitespace-nowrap",
                          request.status === "APPROVED" &&
                            "bg-green-100 text-green-800",
                          request.status === "PENDING" &&
                            "bg-amber-100 text-amber-800",
                          request.status === "REJECTED" &&
                            "bg-red-100 text-red-800"
                        )}
                      >
                        {DISPLAYED_REQUEST_STATUSES[request.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.status === "PENDING" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="default"
                            className="h-8 bg-[#3db87a] text-xs hover:bg-[#35a46c]"
                            onClick={() => handleApprove(request)}
                          >
                            Duyệt
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 text-xs"
                            onClick={() => handleReject(request)}
                          >
                            Từ chối
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal xác nhận duyệt đơn */}
      {selectedRequest && (
        <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-[#3db87a]">
                <Check className="h-5 w-5" /> Xác nhận duyệt đơn
              </DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn duyệt đơn này?
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4 text-sm">
                <div className="text-right">Loại đơn:</div>
                <div className="col-span-3 font-semibold">
                  {REQUEST_TYPE_LABELS[selectedRequest.requestType] ||
                    selectedRequest.requestType}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 text-sm">
                <div className="text-right">Nhân viên:</div>
                <div className="col-span-3 font-semibold">
                  {selectedRequest.employeeName}
                </div>
              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Phòng ban:</Label>
              <div className="col-span-3">{selectedRequest?.department}</div>
            </div> */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="approve-comment">
                  Ghi chú:
                </Label>
                <Textarea
                  id="approve-comment"
                  placeholder="Nhập ghi chú nếu có..."
                  className="col-span-3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button variant={"secondary"} className="w-full" disabled>
                  <Spinner />
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setApproveDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    className="bg-[#3db87a] hover:bg-[#35a46c]"
                    onClick={confirmApprove}
                  >
                    Xác nhận duyệt
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal xác nhận từ chối đơn */}
      {selectedRequest && (
        <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <X className="h-5 w-5" /> Xác nhận từ chối đơn
              </DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn từ chối đơn này?
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4 text-sm">
                <div className="text-right">Loại đơn:</div>
                <div className="col-span-3 font-semibold">
                  {REQUEST_TYPE_LABELS[selectedRequest.requestType] ||
                    selectedRequest.requestType}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 text-sm">
                <div className="text-right">Nhân viên:</div>
                <div className="col-span-3 font-semibold">
                  {selectedRequest.employeeName}
                </div>
              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Phòng ban:</Label>
              <div className="col-span-3">{selectedRequest?.department}</div>
            </div> */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="reject-comment">
                  Lý do từ chối:
                </Label>
                <Textarea
                  id="reject-comment"
                  placeholder="Vui lòng nhập lý do từ chối..."
                  className="col-span-3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button variant={"secondary"} className="w-full" disabled>
                  <Spinner />
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setRejectDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={confirmReject}
                    disabled={!comment.trim()}
                  >
                    Xác nhận từ chối
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

const REQUEST_TYPE_ICONS = {
  [RequestType.LEAVE_REQUEST]: (
    <CalendarIcon2 className="h-4 w-4 text-blue-500" />
  ),
  [RequestType.LATE_EARLY_REQUEST]: (
    <Clock className="h-4 w-4 text-amber-500" />
  ),
  [RequestType.BUSINESS_TRIP_REQUEST]: (
    <Briefcase className="h-4 w-4 text-green-500" />
  ),
  [RequestType.OVERTIME_REQUEST]: <Clock className="h-4 w-4 text-cyan-500" />,
  [RequestType.ADVANCE_SALARY_REQUEST]: (
    <DollarSign className="h-4 w-4 text-emerald-500" />
  ),
  [RequestType.RESIGNATION_REQUEST]: (
    <LogOut className="h-4 w-4 text-red-500" />
  ),
  [RequestType.EQUIPMENT_REQUEST]: (
    <Laptop className="h-4 w-4 text-purple-500" />
  ),
  [RequestType.WORK_FROM_HOME_REQUEST]: (
    <Home className="h-4 w-4 text-indigo-500" />
  ),
}
