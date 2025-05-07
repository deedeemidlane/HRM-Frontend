"use client"

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
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  MoreHorizontal,
  FileEdit,
  Trash2,
  FileText,
  Download,
  Filter,
  Eye,
  Printer,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import useGetAllContracts from "@/hooks/hr/useGetAllContracts"
import useDebounce from "@/hooks/use-debounce"
import { IContract } from "@/types/Contract"
import { formatDateString } from "@/utils/formatDate"

export default function ContractsPage() {
  const [contracts, setContracts] = useState<IContract[]>([])
  const { getAllContracts } = useGetAllContracts()

  const [toggleReRender, setToggleReRender] = useState(false)

  const [searchKey, setSearchKey] = useState("")
  const debouncedSearchKey = useDebounce(searchKey, 300)

  useEffect(() => {
    const fetchContracts = async () => {
      const fetchedContracts = await getAllContracts(debouncedSearchKey)
      if (fetchedContracts) setContracts(fetchedContracts)
    }
    fetchContracts()
  }, [toggleReRender, debouncedSearchKey])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý hợp đồng
          </h1>
          <p className="text-muted-foreground">
            Quản lý hợp đồng lao động của nhân viên.
          </p>
        </div>
        <Link href={"/dashboard/contracts/create"}>
          <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
            <Plus className="h-4 w-4" />
            Tạo hợp đồng mới
          </Button>
        </Link>
      </div>

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số hợp đồng
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hợp đồng hiện hành
            </CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">135</div>
            <p className="text-xs text-muted-foreground">
              95% tổng số hợp đồng
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sắp hết hạn</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Trong 30 ngày tới</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã hết hạn</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Cần gia hạn hoặc chấm dứt
            </p>
          </CardContent>
        </Card>
      </div> */}

      <Card>
        {/* <CardHeader>
          <CardTitle>Danh sách hợp đồng</CardTitle>
        </CardHeader> */}
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm hợp đồng..."
                className="w-full pl-8"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>
              {/* <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Xuất Excel
              </Button> */}
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  {/* <TableHead>Mã hợp đồng</TableHead> */}
                  <TableHead>Nhân viên</TableHead>
                  {/* <TableHead>Loại hợp đồng</TableHead> */}
                  <TableHead>Ngày bắt đầu</TableHead>
                  <TableHead>Ngày kết thúc</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.length > 0 ? (
                  contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell>{contract.id}</TableCell>
                      {/* <TableCell className="font-medium">
                      {contract.code}
                    </TableCell> */}
                      <TableCell>{contract.employeeName}</TableCell>
                      {/* <TableCell>{contract.type}</TableCell> */}
                      <TableCell>
                        {formatDateString(contract.startDate)}
                      </TableCell>
                      <TableCell>
                        {formatDateString(contract.endDate)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "border-none",
                            contract.startDate
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          )}
                        >
                          {contract.startDate ? "Hiện hành" : "Không khả dụng"}
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
                            {/* <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem> */}
                            {/* <DropdownMenuItem>
                            <FileEdit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem> */}
                            {/* <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            In hợp đồng
                          </DropdownMenuItem> */}
                            {/* <DropdownMenuSeparator /> */}
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4" />
                              Gia hạn hợp đồng
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-0">
                              <Button
                                variant={"ghost"}
                                size={"sm"}
                                className="p-2 text-red-600 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                                Chấm dứt hợp đồng
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
                      Không tìm thấy hợp đồng nào
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

const contracts = [
  {
    id: 1,
    code: "HD-2022-001",
    employee: "Nguyễn Văn An",
    type: "Hợp đồng không xác định thời hạn",
    startDate: "10/01/2022",
    endDate: "Không xác định",
    status: "Hiện hành",
  },
  {
    id: 2,
    code: "HD-2022-015",
    employee: "Trần Thị Bình",
    type: "Hợp đồng xác định thời hạn 2 năm",
    startDate: "15/03/2022",
    endDate: "15/03/2024",
    status: "Sắp hết hạn",
  },
  {
    id: 3,
    code: "HD-2021-042",
    employee: "Lê Văn Cường",
    type: "Hợp đồng không xác định thời hạn",
    startDate: "08/02/2021",
    endDate: "Không xác định",
    status: "Hiện hành",
  },
  {
    id: 4,
    code: "HD-2022-078",
    employee: "Phạm Thị Dung",
    type: "Hợp đồng xác định thời hạn 1 năm",
    startDate: "22/11/2022",
    endDate: "22/11/2023",
    status: "Đã hết hạn",
  },
  {
    id: 5,
    code: "HD-2022-103",
    employee: "Hoàng Văn Đức",
    type: "Hợp đồng thử việc",
    startDate: "03/04/2022",
    endDate: "03/07/2022",
    status: "Đã chấm dứt",
  },
  {
    id: 6,
    code: "HD-2021-056",
    employee: "Ngô Thị Hà",
    type: "Hợp đồng không xác định thời hạn",
    startDate: "17/07/2021",
    endDate: "Không xác định",
    status: "Hiện hành",
  },
  {
    id: 7,
    code: "HD-2022-125",
    employee: "Vũ Văn Giang",
    type: "Hợp đồng xác định thời hạn 2 năm",
    startDate: "05/09/2022",
    endDate: "05/09/2024",
    status: "Hiện hành",
  },
  {
    id: 8,
    code: "HD-2023-012",
    employee: "Đỗ Thị Hương",
    type: "Hợp đồng xác định thời hạn 1 năm",
    startDate: "30/01/2023",
    endDate: "30/01/2024",
    status: "Đã chấm dứt",
  },
]
