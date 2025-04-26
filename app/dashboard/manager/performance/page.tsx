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
import { BarChart, LineChart, PieChart } from "lucide-react"

// Dữ liệu mẫu cho hiệu suất nhân viên
const employeePerformance = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    taskCompletion: 95,
    qualityScore: 90,
    attendanceRate: 98,
    overallScore: 94,
    status: "Xuất sắc",
  },
  {
    id: 2,
    name: "Trần Thị B",
    position: "Nhà thiết kế",
    department: "Marketing",
    taskCompletion: 88,
    qualityScore: 92,
    attendanceRate: 95,
    overallScore: 91,
    status: "Tốt",
  },
  {
    id: 3,
    name: "Lê Văn C",
    position: "Quản lý dự án",
    department: "Kỹ thuật",
    taskCompletion: 85,
    qualityScore: 80,
    attendanceRate: 90,
    overallScore: 85,
    status: "Khá",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    position: "Kế toán",
    department: "Tài chính",
    taskCompletion: 92,
    qualityScore: 88,
    attendanceRate: 96,
    overallScore: 92,
    status: "Tốt",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    taskCompletion: 75,
    qualityScore: 70,
    attendanceRate: 85,
    overallScore: 76,
    status: "Cần cải thiện",
  },
]

// Dữ liệu mẫu cho KPIs
const departmentKPIs = [
  {
    id: 1,
    name: "Hoàn thành dự án đúng hạn",
    target: "90%",
    current: "85%",
    status: "Đang tiến triển",
  },
  {
    id: 2,
    name: "Chất lượng code (ít lỗi)",
    target: "< 5 lỗi/1000 dòng",
    current: "3 lỗi/1000 dòng",
    status: "Đạt",
  },
  {
    id: 3,
    name: "Tỷ lệ giải quyết ticket hỗ trợ",
    target: "95%",
    current: "92%",
    status: "Đang tiến triển",
  },
  {
    id: 4,
    name: "Thời gian phản hồi khách hàng",
    target: "< 4 giờ",
    current: "3.5 giờ",
    status: "Đạt",
  },
  {
    id: 5,
    name: "Tỷ lệ hài lòng của khách hàng",
    target: "90%",
    current: "88%",
    status: "Đang tiến triển",
  },
]

// Hàm tạo màu dựa trên điểm số
function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600"
  if (score >= 80) return "text-blue-600"
  if (score >= 70) return "text-yellow-600"
  return "text-red-600"
}

// Hàm tạo màu cho badge trạng thái
function getStatusVariant(status: string) {
  switch (status) {
    case "Xuất sắc":
      return "success"
    case "Tốt":
      return "default"
    case "Khá":
      return "secondary"
    case "Cần cải thiện":
      return "destructive"
    case "Đạt":
      return "success"
    case "Đang tiến triển":
      return "outline"
    default:
      return "outline"
  }
}

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Hiệu suất nhân viên
        </h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo phòng ban" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả phòng ban</SelectItem>
              <SelectItem value="tech">Kỹ thuật</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="finance">Tài chính</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hoàn thành công việc
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% so với tháng trước
            </p>
            <div className="mt-4 h-[80px] w-full bg-[#edf7f2] rounded-md"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chất lượng công việc
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% so với tháng trước
            </p>
            <div className="mt-4 h-[80px] w-full bg-[#edf7f2] rounded-md"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tỷ lệ chuyên cần
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">
              +0.8% so với tháng trước
            </p>
            <div className="mt-4 h-[80px] w-full bg-[#edf7f2] rounded-md"></div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Hiệu suất nhân viên</TabsTrigger>
          <TabsTrigger value="kpis">KPIs bộ phận</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bảng hiệu suất nhân viên</CardTitle>
              <CardDescription>
                Đánh giá hiệu suất làm việc của nhân viên trong bộ phận của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nhân viên</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Phòng ban</TableHead>
                    <TableHead className="text-center">
                      Hoàn thành công việc
                    </TableHead>
                    <TableHead className="text-center">Chất lượng</TableHead>
                    <TableHead className="text-center">Chuyên cần</TableHead>
                    <TableHead className="text-center">Điểm tổng hợp</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeePerformance.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        {employee.name}
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell
                        className={`text-center ${getScoreColor(
                          employee.taskCompletion
                        )}`}
                      >
                        {employee.taskCompletion}%
                      </TableCell>
                      <TableCell
                        className={`text-center ${getScoreColor(
                          employee.qualityScore
                        )}`}
                      >
                        {employee.qualityScore}%
                      </TableCell>
                      <TableCell
                        className={`text-center ${getScoreColor(
                          employee.attendanceRate
                        )}`}
                      >
                        {employee.attendanceRate}%
                      </TableCell>
                      <TableCell
                        className={`text-center font-bold ${getScoreColor(
                          employee.overallScore
                        )}`}
                      >
                        {employee.overallScore}%
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getStatusVariant(employee.status)}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Xem chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>KPIs bộ phận</CardTitle>
              <CardDescription>
                Các chỉ số hiệu suất chính của bộ phận.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chỉ số</TableHead>
                    <TableHead>Mục tiêu</TableHead>
                    <TableHead>Hiện tại</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentKPIs.map((kpi) => (
                    <TableRow key={kpi.id}>
                      <TableCell className="font-medium">{kpi.name}</TableCell>
                      <TableCell>{kpi.target}</TableCell>
                      <TableCell>{kpi.current}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(kpi.status)}>
                          {kpi.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Xem chi tiết
                        </Button>
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
