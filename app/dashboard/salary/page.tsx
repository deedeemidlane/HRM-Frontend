"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Download, Calendar, TrendingUp, Printer, Eye, BarChart2 } from "lucide-react"

export default function SalaryPage() {
  const [selectedYear, setSelectedYear] = useState("2025")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bảng lương</h1>
          <p className="text-muted-foreground">Xem thông tin lương và phúc lợi của bạn.</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lương tháng này</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26,250,000 VNĐ</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+5%</span>
              <span className="ml-1">so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lương cơ bản</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25,000,000 VNĐ</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thưởng</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,000,000 VNĐ</div>
            <p className="text-xs text-muted-foreground">Thưởng dự án</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khấu trừ</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,750,000 VNĐ</div>
            <p className="text-xs text-muted-foreground">Thuế, BHXH, BHYT</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="monthly">
            <TabsList>
              <TabsTrigger value="monthly">Lương hàng tháng</TabsTrigger>
              <TabsTrigger value="history">Lịch sử lương</TabsTrigger>
              <TabsTrigger value="analysis">Phân tích</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly">
            <TabsContent value="monthly" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-medium">Bảng lương tháng 4/2025</h3>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Xem chi tiết
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    In phiếu lương
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Tải xuống
                  </Button>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Mục</TableHead>
                      <TableHead>Mô tả</TableHead>
                      <TableHead className="text-right">Số tiền (VNĐ)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Lương cơ bản</TableCell>
                      <TableCell>Lương cơ bản tháng 4/2025</TableCell>
                      <TableCell className="text-right">25,000,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Phụ cấp</TableCell>
                      <TableCell>Phụ cấp ăn trưa, đi lại</TableCell>
                      <TableCell className="text-right">3,000,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Thưởng</TableCell>
                      <TableCell>Thưởng hoàn thành dự án</TableCell>
                      <TableCell className="text-right">2,000,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bảo hiểm xã hội (8%)</TableCell>
                      <TableCell>Khấu trừ BHXH</TableCell>
                      <TableCell className="text-right">-2,000,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bảo hiểm y tế (1.5%)</TableCell>
                      <TableCell>Khấu trừ BHYT</TableCell>
                      <TableCell className="text-right">-375,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Thuế thu nhập cá nhân</TableCell>
                      <TableCell>Khấu trừ thuế TNCN</TableCell>
                      <TableCell className="text-right">-1,375,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tổng cộng</TableCell>
                      <TableCell>Lương thực lãnh</TableCell>
                      <TableCell className="text-right font-bold">26,250,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="rounded-lg border bg-muted/40 p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Ngày thanh toán: 10/05/2025</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Lương sẽ được chuyển vào tài khoản ngân hàng của bạn vào ngày 10 hàng tháng. Nếu có thắc mắc, vui lòng
                  liên hệ phòng nhân sự.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tháng</TableHead>
                      <TableHead>Lương cơ bản</TableHead>
                      <TableHead>Phụ cấp</TableHead>
                      <TableHead>Thưởng</TableHead>
                      <TableHead>Khấu trừ</TableHead>
                      <TableHead>Thực lãnh</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryHistory.map((item) => (
                      <TableRow key={item.month}>
                        <TableCell className="font-medium">{item.month}</TableCell>
                        <TableCell>{item.baseSalary}</TableCell>
                        <TableCell>{item.allowance}</TableCell>
                        <TableCell>{item.bonus}</TableCell>
                        <TableCell>{item.deduction}</TableCell>
                        <TableCell className="font-medium">{item.netSalary}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="analysis" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-medium">Biểu đồ lương năm 2025</h3>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Tải xuống
                </Button>
              </div>
              <div className="h-[400px] w-full rounded-md border bg-muted/20 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart2 className="mx-auto h-16 w-16 opacity-50" />
                  <p>Biểu đồ lương theo tháng</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tổng thu nhập năm 2025</CardTitle>
                    <CardDescription>Tính đến tháng 4/2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">105,000,000 VNĐ</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500 font-medium">+8%</span>
                      <span className="ml-1">so với cùng kỳ năm trước</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Tổng thưởng năm 2025</CardTitle>
                    <CardDescription>Tính đến tháng 4/2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8,000,000 VNĐ</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500 font-medium">+15%</span>
                      <span className="ml-1">so với cùng kỳ năm trước</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

const salaryHistory = [
  {
    month: "Tháng 4/2025",
    baseSalary: "25,000,000 VNĐ",
    allowance: "3,000,000 VNĐ",
    bonus: "2,000,000 VNĐ",
    deduction: "3,750,000 VNĐ",
    netSalary: "26,250,000 VNĐ",
  },
  {
    month: "Tháng 3/2025",
    baseSalary: "25,000,000 VNĐ",
    allowance: "3,000,000 VNĐ",
    bonus: "0 VNĐ",
    deduction: "3,750,000 VNĐ",
    netSalary: "24,250,000 VNĐ",
  },
  {
    month: "Tháng 2/2025",
    baseSalary: "25,000,000 VNĐ",
    allowance: "3,000,000 VNĐ",
    bonus: "0 VNĐ",
    deduction: "3,750,000 VNĐ",
    netSalary: "24,250,000 VNĐ",
  },
  {
    month: "Tháng 1/2025",
    baseSalary: "25,000,000 VNĐ",
    allowance: "3,000,000 VNĐ",
    bonus: "5,000,000 VNĐ",
    deduction: "3,750,000 VNĐ",
    netSalary: "29,250,000 VNĐ",
  },
]
