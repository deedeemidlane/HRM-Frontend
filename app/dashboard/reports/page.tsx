import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart2,
  PieChart,
  TrendingUp,
  Users,
  UserPlus,
  UserMinus,
  Calendar,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Báo cáo nhân sự</h1>
          <p className="text-muted-foreground">Phân tích và báo cáo về tình hình nhân sự của công ty.</p>
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
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+4.3%</span>
              <span className="ml-1">so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tuyển dụng mới</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+16.2%</span>
              <span className="ml-1">so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nghỉ việc</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-red-500 rotate-180" />
              <span className="text-red-500 font-medium">-25%</span>
              <span className="ml-1">so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ nghỉ việc</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.4%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500 rotate-180" />
              <span className="text-green-500 font-medium">-0.3%</span>
              <span className="ml-1">so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="recruitment">Tuyển dụng</TabsTrigger>
              <TabsTrigger value="turnover">Biến động nhân sự</TabsTrigger>
              <TabsTrigger value="attendance">Chấm công</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsContent value="overview" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">Phân bố nhân sự theo phòng ban</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select defaultValue="department">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn kiểu biểu đồ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="department">Theo phòng ban</SelectItem>
                      <SelectItem value="position">Theo chức vụ</SelectItem>
                      <SelectItem value="gender">Theo giới tính</SelectItem>
                      <SelectItem value="age">Theo độ tuổi</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Tải xuống
                  </Button>
                </div>
              </div>
              <div className="h-[400px] w-full rounded-md border bg-muted/20 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PieChart className="mx-auto h-16 w-16 opacity-50" />
                  <p>Biểu đồ phân bố nhân sự theo phòng ban</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recruitment" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">Tình hình tuyển dụng theo tháng</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Theo tháng</SelectItem>
                      <SelectItem value="quarterly">Theo quý</SelectItem>
                      <SelectItem value="yearly">Theo năm</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Tải xuống
                  </Button>
                </div>
              </div>
              <div className="h-[400px] w-full rounded-md border bg-muted/20 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart2 className="mx-auto h-16 w-16 opacity-50" />
                  <p>Biểu đồ tình hình tuyển dụng theo tháng</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="turnover" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">Tỷ lệ nghỉ việc theo phòng ban</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select defaultValue="department">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn kiểu biểu đồ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="department">Theo phòng ban</SelectItem>
                      <SelectItem value="position">Theo chức vụ</SelectItem>
                      <SelectItem value="reason">Theo lý do nghỉ việc</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Tải xuống
                  </Button>
                </div>
              </div>
              <div className="h-[400px] w-full rounded-md border bg-muted/20 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart2 className="mx-auto h-16 w-16 opacity-50" />
                  <p>Biểu đồ tỷ lệ nghỉ việc theo phòng ban</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="attendance" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">Tỷ lệ đi làm đúng giờ theo phòng ban</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select defaultValue="department">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn kiểu biểu đồ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="department">Theo phòng ban</SelectItem>
                      <SelectItem value="position">Theo chức vụ</SelectItem>
                      <SelectItem value="day">Theo ngày trong tuần</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Tải xuống
                  </Button>
                </div>
              </div>
              <div className="h-[400px] w-full rounded-md border bg-muted/20 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart2 className="mx-auto h-16 w-16 opacity-50" />
                  <p>Biểu đồ tỷ lệ đi làm đúng giờ theo phòng ban</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Báo cáo gần đây</CardTitle>
            <CardDescription>Các báo cáo đã tạo gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Tải xuống
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Báo cáo tự động</CardTitle>
            <CardDescription>Báo cáo được tạo tự động theo lịch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-muted-foreground">{report.schedule}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Lịch
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Cài đặt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const recentReports = [
  {
    title: "Báo cáo nhân sự tháng 3/2025",
    date: "01/04/2025",
  },
  {
    title: "Báo cáo tuyển dụng Q1/2025",
    date: "05/04/2025",
  },
  {
    title: "Báo cáo biến động nhân sự Q1/2025",
    date: "10/04/2025",
  },
  {
    title: "Báo cáo chấm công tháng 3/2025",
    date: "15/04/2025",
  },
]

const scheduledReports = [
  {
    title: "Báo cáo nhân sự hàng tháng",
    schedule: "Mỗi ngày 01 hàng tháng",
  },
  {
    title: "Báo cáo tuyển dụng hàng quý",
    schedule: "Ngày 05 của tháng đầu quý",
  },
  {
    title: "Báo cáo biến động nhân sự hàng quý",
    schedule: "Ngày 10 của tháng đầu quý",
  },
  {
    title: "Báo cáo chấm công hàng tháng",
    schedule: "Mỗi ngày 15 hàng tháng",
  },
]
