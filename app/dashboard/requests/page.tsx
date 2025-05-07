"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format, isBefore, addDays, formatDate } from "date-fns"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  CheckCircle,
  XCircle,
  Clock,
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import useCreateRequest from "@/hooks/employee/useCreateRequest"
import useGetMyRequests from "@/hooks/employee/useGetMyRequests"
import { IRequest, RequestType } from "@/types/Request"
import { formatDateString } from "@/utils/formatDate"
import { DISPLAYED_REQUEST_STATUSES } from "@/constants/statuses"
import { REQUEST_TYPE_LABELS } from "@/constants/requests"

// Map request types to icons
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

// Form validation schema
const formSchema = z
  .object({
    requestType: z.nativeEnum(RequestType, {
      required_error: "Vui lòng chọn loại đơn",
    }),
    requestedDate: z.date({
      required_error: "Vui lòng chọn ngày",
    }),
    startTime: z.string({
      required_error: "Vui lòng chọn giờ bắt đầu",
    }),
    endTime: z
      .string({
        required_error: "Vui lòng chọn giờ kết thúc",
      })
      .refine((val) => val !== "", {
        message: "Vui lòng chọn giờ kết thúc",
      }),
    note: z.string().min(1, {
      message: "Vui lòng nhập lý do",
    }),
  })
  .refine(
    (data) => {
      // Convert hours to numbers for comparison
      const start = Number.parseInt(data.startTime)
      const end = Number.parseInt(data.endTime)
      return end > start
    },
    {
      message: "Giờ kết thúc phải sau giờ bắt đầu",
      path: ["endTime"],
    }
  )

export default function EmployeeRequestsPage() {
  const [requests, setRequests] = useState<IRequest[]>([])
  const { getMyRequests } = useGetMyRequests()

  const [toggleReRender, setToggleReRender] = useState(false)

  useEffect(() => {
    const fetchRequests = async () => {
      const fetchedRequests = await getMyRequests()
      if (fetchedRequests) setRequests(fetchedRequests)
    }
    fetchRequests()
  }, [toggleReRender])

  const [showForm, setShowForm] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  })

  const { loading, createRequest } = useCreateRequest()

  // Handle form submission
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)

    const formattedData = {
      ...data,
      requestedDate: formatDate(data.requestedDate, "yyyy-MM-dd"),
      startTime: data.startTime + ":00",
      endTime: data.endTime + ":00",
    }

    console.log("formattedData: ", formattedData)

    await createRequest(formattedData)

    // Reset form and hide it
    form.reset()
    setShowForm(false)
    setToggleReRender(!toggleReRender)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Đơn từ</h1>
          <p className="text-muted-foreground">
            Quản lý đơn nghỉ phép, làm thêm giờ và các loại đơn từ khác.
          </p>
        </div>
        <Button
          className="bg-[#3db87a] hover:bg-[#35a46c]"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hủy" : "Tạo đơn mới"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Tạo đơn mới</CardTitle>
            <CardDescription>Điền thông tin để tạo đơn từ mới</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="requestType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Loại đơn <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại đơn" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(RequestType).map((type) => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center gap-2">
                                {REQUEST_TYPE_ICONS[type]}
                                <span>{REQUEST_TYPE_LABELS[type]}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requestedDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Ngày <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Chọn ngày</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              isBefore(date, addDays(new Date(), -1))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Giờ bắt đầu <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn giờ" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => i).map(
                              (hour) => (
                                <SelectItem
                                  key={hour}
                                  value={hour.toString().padStart(2, "0")}
                                >
                                  {hour.toString().padStart(2, "0")}:00
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Giờ kết thúc <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn giờ" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => i).map(
                              (hour) => (
                                <SelectItem
                                  key={hour}
                                  value={hour.toString().padStart(2, "0")}
                                >
                                  {hour.toString().padStart(2, "0")}:00
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Lý do <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập lý do chi tiết..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Vui lòng cung cấp lý do chi tiết để quản lý có thể xem
                        xét đơn của bạn.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  type="button"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="bg-[#3db87a] hover:bg-[#35a46c]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    "Gửi đơn"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loại đơn</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Lý do</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Phản hồi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        {REQUEST_TYPE_ICONS[request.requestType] || (
                          <FileText className="h-4 w-4 text-purple-500" />
                        )}
                        <span className="font-medium">
                          {REQUEST_TYPE_LABELS[request.requestType] ||
                            request.requestType}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDateString(request.requestedDate)}
                    </TableCell>
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={request.note}
                    >
                      {request.note}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-none",
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
                      <div className="flex items-center gap-2">
                        <div>
                          {request.status === "APPROVED" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : request.status === "REJECTED" ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : null}
                        </div>
                        <span className="text-sm">{request.comment}</span>
                      </div>
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
          <CardTitle>Thông tin nghỉ phép</CardTitle>
          <CardDescription>Số ngày phép còn lại và đã sử dụng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Tổng số ngày phép:
              </p>
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
              Số ngày phép còn lại sẽ được cập nhật sau khi đơn nghỉ phép được
              duyệt. Vui lòng gửi đơn nghỉ phép trước ít nhất 3 ngày làm việc.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// const myRequests = [
//   {
//     id: 1,
//     type: RequestType.LEAVE_REQUEST,
//     date: "20/04/2025",
//     reason: "Việc gia đình",
//     submitDate: "15/04/2025",
//     status: "Đã duyệt",
//     feedback: "Đã duyệt bởi Nguyễn Văn A",
//   },
//   {
//     id: 2,
//     type: RequestType.LATE_EARLY_REQUEST,
//     date: "15/04/2025",
//     reason: "Quên check-out",
//     submitDate: "16/04/2025",
//     status: "Đã duyệt",
//     feedback: "Đã duyệt bởi Nguyễn Văn A",
//   },
//   {
//     id: 3,
//     type: RequestType.OVERTIME_REQUEST,
//     date: "10/04/2025",
//     reason: "Hoàn thành dự án gấp",
//     submitDate: "08/04/2025",
//     status: "Từ chối",
//     feedback: "Không có kế hoạch OT trong tháng này",
//   },
//   {
//     id: 4,
//     type: RequestType.LEAVE_REQUEST,
//     date: "05/05/2025",
//     reason: "Đi khám bệnh",
//     submitDate: "22/04/2025",
//     status: "Đang chờ",
//     feedback: "",
//   },
//   {
//     id: 5,
//     type: RequestType.BUSINESS_TRIP_REQUEST,
//     date: "12/05/2025",
//     reason: "Gặp khách hàng tại Đà Nẵng",
//     submitDate: "25/04/2025",
//     status: "Đang chờ",
//     feedback: "",
//   },
//   {
//     id: 6,
//     type: RequestType.ADVANCE_SALARY_REQUEST,
//     date: "01/05/2025",
//     reason: "Chi phí y tế khẩn cấp",
//     submitDate: "20/04/2025",
//     status: "Đã duyệt",
//     feedback: "Đã duyệt bởi Trần Thị B",
//   },
//   {
//     id: 7,
//     type: RequestType.EQUIPMENT_REQUEST,
//     date: "05/04/2025",
//     reason: "Cần laptop mới cho dự án",
//     submitDate: "01/04/2025",
//     status: "Từ chối",
//     feedback: "Chưa đến thời hạn cấp thiết bị mới",
//   },
// ]
