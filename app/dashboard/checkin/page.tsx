"use client"

import { useEffect, useMemo, useState } from "react"
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
import { Clock, MapPin, Calendar, CheckCircle, XCircle } from "lucide-react"
import { formatDate } from "date-fns"
import useCheckIn from "@/hooks/employee/useCheckIn"
import { Spinner } from "@/components/Spinner"
import useGetCheckInHistory from "@/hooks/employee/useGetCheckInHistory"
import { IAttendance } from "@/types/Attendance"
import { DISPLAYED_ATTENDANCE_STATUSES } from "@/constants/statuses"
import { formatDateString } from "@/utils/formatDate"

export default function EmployeeCheckinPage() {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  const [toggleReRender, setToggleReRender] = useState(false)

  const { getCheckInHistory } = useGetCheckInHistory()

  const [currentMonthCheckInHistory, setCurrentMonthCheckInHistory] = useState<
    IAttendance[]
  >([])
  const [todayAttendance, setTodayAttendance] = useState<IAttendance>()

  useEffect(() => {
    const fetchCheckInHistory = async () => {
      const fetchedCheckInHistory: IAttendance[] = await getCheckInHistory(
        new Date().getMonth() + 1,
        new Date().getFullYear()
      )
      if (fetchedCheckInHistory) {
        setCurrentMonthCheckInHistory(fetchedCheckInHistory)

        setTodayAttendance(
          fetchedCheckInHistory.find(
            (a) => a.date === formatDate(new Date(), "yyyy-MM-dd")
          )
        )
      }
    }
    fetchCheckInHistory()
  }, [toggleReRender])

  const checkedIn = useMemo(() => {
    // Check if todayAttendance exists and has a valid check-in time
    return todayAttendance?.checkInTime ? true : false
  }, [todayAttendance])

  const checkedOut = useMemo(() => {
    // Check if todayAttendance exists and has a valid check-out time
    return todayAttendance?.checkOutTime ? true : false
  }, [todayAttendance])

  const checkInTime = useMemo(() => {
    return todayAttendance?.checkInTime || "--:--:--"
  }, [todayAttendance])

  const checkOutTime = useMemo(() => {
    return todayAttendance?.checkOutTime || "--:--:--"
  }, [todayAttendance])

  const { loading, checkIn } = useCheckIn()

  const handleCheck = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        const data = {
          time: formatDate(new Date(), "hh:mm:00"),
          longitude,
          latitude,
        }

        console.log("check in data: ", data)

        await checkIn(data)
        setToggleReRender(!toggleReRender)
      },
      (error) => {
        console.error("Error getting location:", error)
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chấm công</h1>
          <p className="text-muted-foreground">
            Chấm công hàng ngày và xem lịch sử chấm công.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">
            {formatDate(new Date(), "EEE dd/MM/yyyy")}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Chấm công hôm nay</CardTitle>
            <CardDescription>Nhấn nút để check-in/check-out</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6 py-6">
            <div className="text-center">
              <div
                className="text-5xl font-bold tabular-nums"
                suppressHydrationWarning
              >
                {currentTime}
              </div>
              {/* <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Văn phòng ADA - Hà Nội</span>
              </div> */}
            </div>
            <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button
                className="flex-1 bg-[#3db87a] hover:bg-[#35a46c]"
                size="lg"
                onClick={handleCheck}
                disabled={checkedIn || loading}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <Clock className="mr-2 h-5 w-5" />
                    Check-in
                  </>
                )}
              </Button>
              <Button
                className="flex-1"
                size="lg"
                variant="outline"
                onClick={handleCheck}
                disabled={!checkedIn || checkedOut || loading}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <Clock className="mr-2 h-5 w-5" />
                    Check-out
                  </>
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center border-t px-6 py-4">
            <div className="grid w-full grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Giờ vào:</p>
                <p className="font-medium">
                  {checkedIn ? checkInTime : "--:--:--"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Giờ ra:</p>
                <p className="font-medium">
                  {checkedOut ? checkOutTime : "--:--:--"}
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin chấm công</CardTitle>
            <CardDescription>Thống kê chấm công trong tháng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Tổng công:</p>
                <p className="text-2xl font-bold">
                  {currentMonthCheckInHistory.length}/22
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Đúng giờ:</p>
                <p className="text-2xl font-bold">
                  {
                    currentMonthCheckInHistory.filter(
                      (attendance) => attendance.status === "ON_TIME"
                    ).length
                  }
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Đi muộn:</p>
                <p className="text-2xl font-bold">
                  {
                    currentMonthCheckInHistory.filter(
                      (attendance) => attendance.status === "LATE"
                    ).length
                  }
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Vắng:</p>
                <p className="text-2xl font-bold">
                  {
                    currentMonthCheckInHistory.filter(
                      (attendance) => attendance.status === "ABSENT"
                    ).length
                  }
                </p>
              </div>
            </div>
            <div className="rounded-lg border bg-muted/40 p-4">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#3db87a]" />
                <span className="font-medium">Thông báo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Bạn còn 8 ngày phép trong năm 2025. Hãy sử dụng hợp lý để đảm
                bảo cân bằng công việc và cuộc sống.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="font-bold text-xl">
          {/* <Tabs defaultValue="history">
            <TabsList>
              <TabsTrigger value="history">Lịch sử chấm công</TabsTrigger>
              <TabsTrigger value="requests">Yêu cầu của tôi</TabsTrigger>
            </TabsList>
          </Tabs> */}
          Lịch sử chấm công
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history">
            <TabsContent value="history" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-52">Ngày</TableHead>
                      <TableHead className="text-center">Giờ vào</TableHead>
                      <TableHead className="text-center">Giờ ra</TableHead>
                      <TableHead className="text-center">Tổng giờ</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentMonthCheckInHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          {formatDateString(record.date)}
                        </TableCell>
                        <TableCell className="text-center">
                          {record.checkInTime || "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          {record.checkOutTime || "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          {record.totalWorkingTime || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "border-none",
                              record.status === "ON_TIME" &&
                                "bg-green-100 text-green-800",
                              record.status === "LATE" &&
                                "bg-amber-100 text-amber-800",
                              record.status === "ABSENT" &&
                                "bg-red-100 text-red-800"
                            )}
                          >
                            {DISPLAYED_ATTENDANCE_STATUSES[record.status]}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="requests" className="space-y-4">
              <div className="flex justify-end">
                <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
                  Tạo yêu cầu mới
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Loại yêu cầu</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Lý do</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Phản hồi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.type}
                        </TableCell>
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

const attendanceHistory = [
  {
    id: 1,
    date: "23/04/2025",
    checkIn: "08:02",
    checkOut: "17:30",
    totalHours: "8h 28m",
    status: "Đúng giờ",
  },
  {
    id: 2,
    date: "22/04/2025",
    checkIn: "08:15",
    checkOut: "17:45",
    totalHours: "8h 30m",
    status: "Đi muộn",
  },
  {
    id: 3,
    date: "21/04/2025",
    checkIn: "07:55",
    checkOut: "17:30",
    totalHours: "8h 35m",
    status: "Đúng giờ",
  },
  {
    id: 4,
    date: "20/04/2025",
    checkIn: "--:--",
    checkOut: "--:--",
    totalHours: "--:--",
    status: "Nghỉ phép",
  },
  {
    id: 5,
    date: "19/04/2025",
    checkIn: "08:00",
    checkOut: "17:30",
    totalHours: "8h 30m",
    status: "Đúng giờ",
  },
]

const myRequests = [
  {
    id: 1,
    type: "Nghỉ phép",
    date: "20/04/2025",
    reason: "Việc gia đình",
    status: "Đã duyệt",
    feedback: "Đã duyệt bởi Nguyễn Văn A",
  },
  {
    id: 2,
    type: "Điều chỉnh công",
    date: "15/04/2025",
    reason: "Quên check-out",
    status: "Đã duyệt",
    feedback: "Đã duyệt bởi Nguyễn Văn A",
  },
  {
    id: 3,
    type: "Làm thêm giờ",
    date: "10/04/2025",
    reason: "Hoàn thành dự án gấp",
    status: "Từ chối",
    feedback: "Không có kế hoạch OT trong tháng này",
  },
  {
    id: 4,
    type: "Nghỉ phép",
    date: "05/05/2025",
    reason: "Đi khám bệnh",
    status: "Đang chờ",
    feedback: "",
  },
]
