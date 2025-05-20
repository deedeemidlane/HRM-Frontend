"use client"

import Link from "next/link"
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
import {
  Search,
  MoreHorizontal,
  FileEdit,
  Eye,
  CheckCircle,
  Plus,
  Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import useGetAllInterviews from "@/hooks/hr/useGetAllInterviews"
import { IInterview } from "@/types/Interview"
import { formatDateString } from "@/utils/formatDate"

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<IInterview[]>([])
  const { getAllInterviews } = useGetAllInterviews()

  useEffect(() => {
    const fetchInterviews = async () => {
      const fetchedInterviews = await getAllInterviews()
      if (fetchedInterviews) setInterviews(fetchedInterviews)
    }
    fetchInterviews()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lịch phỏng vấn</h1>
          <p className="text-muted-foreground">
            Quản lý lịch phỏng vấn và theo dõi tiến trình.
          </p>
        </div>
        <Button className="bg-[#3db87a] hover:bg-[#35a46c]" asChild>
          <Link href="/dashboard/recruitment/interviews/create">
            <Plus className="h-4 w-4" />
            Tạo lịch phỏng vấn
          </Link>
        </Button>
      </div>

      <Card>
        {/* <CardHeader>
          <CardTitle>Danh sách lịch phỏng vấn</CardTitle>
        </CardHeader> */}
        <CardContent className="space-y-4 pt-6">
          {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm lịch phỏng vấn..."
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
          </div> */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tên lịch phỏng vấn</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Ngày phỏng vấn</TableHead>
                  {/* <TableHead>Vòng phỏng vấn</TableHead> */}
                  {/* <TableHead>Trạng thái</TableHead> */}
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviews.length > 0 ? (
                  interviews.map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell>{interview.id}</TableCell>
                      <TableCell className="font-medium">
                        {interview.title}
                      </TableCell>
                      <TableCell>{interview.time}</TableCell>
                      <TableCell>{formatDateString(interview.date)}</TableCell>
                      {/* <TableCell>{interview.round}</TableCell> */}
                      {/* <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-none",
                          interview.status === "Đã kết thúc" &&
                            "bg-green-100 text-green-800",
                          interview.status === "Chưa xác nhận" &&
                            "bg-yellow-100 text-yellow-800",
                          interview.status === "Đã lên lịch" &&
                            "bg-blue-100 text-blue-800"
                        )}
                      >
                        {interview.status}
                      </Badge>
                    </TableCell> */}
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
                            {/* <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem> */}
                            <DropdownMenuItem>
                              <FileEdit className="mb-0.5 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0">
                              <Button
                                variant={"ghost"}
                                className="text-red-600 hover:text-red-600 p-2 w-full justify-start"
                                onClick={() => {
                                  // setSelectedEmployee(employee)
                                  // setOpenConfirmDeleteModal(true)
                                }}
                              >
                                <Trash2 className="mb-0.5 h-4 w-4" />
                                Xóa
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="text-center">
                    <TableCell colSpan={6} className="py-8">
                      Không tìm thấy lịch phỏng vấn nào
                    </TableCell>
                  </TableRow>
                )}
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

const interviews = [
  {
    id: 1,
    name: "Phỏng vấn Dev",
    time: "10:00 - 11:30",
    date: "25/04/2023",
    round: "Phỏng vấn chuyên sâu",
    status: "Đã kết thúc",
  },
  {
    id: 2,
    name: "Phỏng vấn PM",
    time: "14:00 - 15:30",
    date: "26/04/2023",
    round: "Phỏng vấn doanh nghiệp",
    status: "Chưa xác nhận",
  },
  {
    id: 3,
    name: "Phỏng vấn UX/UI",
    time: "09:00 - 10:00",
    date: "27/04/2023",
    round: "Phỏng vấn sơ loại",
    status: "Đã lên lịch",
  },
  // {
  //   id: 4,
  //   name: "Phỏng vấn Full-stack",
  //   time: "13:30 - 15:00",
  //   date: "28/04/2023",
  //   round: "Phỏng vấn kỹ thuật",
  //   status: "Đã lên lịch",
  // },
  {
    id: 5,
    name: "Phỏng vấn PM",
    time: "11:00 - 12:30",
    date: "29/04/2023",
    round: "Phỏng vấn chuyên sâu",
    status: "Chưa xác nhận",
  },
]
