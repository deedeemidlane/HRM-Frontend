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
import { Search, MoreHorizontal, FileText, Calendar, Mail, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ApplicantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý ứng viên</h1>
          <p className="text-muted-foreground">Quản lý hồ sơ ứng viên và theo dõi tiến trình tuyển dụng.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách ứng viên</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Tìm kiếm ứng viên..." className="w-full pl-8" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="sm">
                Xuất Excel
              </Button>
              <Button variant="outline" size="sm">
                Lọc
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Vị trí ứng tuyển</TableHead>
                  <TableHead>Thông tin liên hệ</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.position}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                          {applicant.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
                          {applicant.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-none",
                          applicant.status === "Phỏng vấn chuyên sâu" && "bg-blue-100 text-blue-800",
                          applicant.status === "Không trực tuyến" && "bg-gray-100 text-gray-800",
                          applicant.status === "Đã phỏng vấn" && "bg-green-100 text-green-800",
                          applicant.status === "Từ chối" && "bg-red-100 text-red-800",
                        )}
                      >
                        {applicant.status}
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
                            Xem CV
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Lên lịch phỏng vấn
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Gửi email
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

const applicants = [
  {
    id: 1,
    name: "Olivia Wilson",
    position: "CMO",
    email: "olivia.wilson@example.com",
    phone: "0912 345 678",
    status: "Phỏng vấn chuyên sâu",
  },
  {
    id: 2,
    name: "Trần Thị Trang",
    position: "Intern",
    email: "trang.tran@example.com",
    phone: "0987 654 321",
    status: "Không trực tuyến",
  },
  {
    id: 3,
    name: "Nguyễn Văn Minh",
    position: "Senior Developer",
    email: "minh.nguyen@example.com",
    phone: "0901 234 567",
    status: "Đã phỏng vấn",
  },
  {
    id: 4,
    name: "Lê Thị Hương",
    position: "UX Designer",
    email: "huong.le@example.com",
    phone: "0976 543 210",
    status: "Từ chối",
  },
  {
    id: 5,
    name: "Phạm Văn Đức",
    position: "Product Manager",
    email: "duc.pham@example.com",
    phone: "0932 109 876",
    status: "Phỏng vấn chuyên sâu",
  },
  {
    id: 6,
    name: "Hoàng Thị Mai",
    position: "Marketing Specialist",
    email: "mai.hoang@example.com",
    phone: "0965 432 109",
    status: "Không trực tuyến",
  },
]
