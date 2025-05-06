"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Trash2, Filter } from "lucide-react"
import { useEffect, useState } from "react"
import useGetAllEmployees from "@/hooks/admin/useGetAllEmployees"
import { IEmployee } from "@/types/Employee"
import Link from "next/link"
import useDeleteEmployee from "@/hooks/admin/useDeleteEmployee"
import { ConfirmDeleteAccountModal } from "./ui/ConfirmDeleteAccountModal"
import useDebounce from "@/hooks/use-debounce"

export default function UsersManagementPage() {
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const { getAllEmployees } = useGetAllEmployees()

  const [toggleReRender, setToggleReRender] = useState(false)

  const [searchKey, setSearchKey] = useState("")
  const debouncedSearchKey = useDebounce(searchKey, 300)

  useEffect(() => {
    const fetchEmployees = async () => {
      const fetchedEmployees = await getAllEmployees(debouncedSearchKey)
      if (fetchedEmployees) setEmployees(fetchedEmployees)
    }
    fetchEmployees()
  }, [toggleReRender, debouncedSearchKey])

  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee>()
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)
  const { loading, deleteEmployee } = useDeleteEmployee()

  const handleDeleteEmployee = async () => {
    if (selectedEmployee) {
      await deleteEmployee(selectedEmployee.id)
      setOpenConfirmDeleteModal(false)
      setToggleReRender(!toggleReRender)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý tài khoản nhân sự
          </h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản người dùng trong hệ thống.
          </p>
        </div>
        <Link href={"/dashboard/admin/users/create"}>
          <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
            <Plus className="h-4 w-4" />
            Thêm tài khoản
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="space-y-4 mt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm tài khoản..."
                className="w-full pl-8"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              {/* <Button variant="outline" size="sm">
                Xuất Excel
              </Button> */}
              <Button variant="outline" size="sm">
                <Filter />
                Lọc
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phòng ban</TableHead>
                  <TableHead>Vị trí</TableHead>
                  {/* <TableHead>Trạng thái</TableHead> */}
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.length > 0 ? (
                  <>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>{employee.id}</TableCell>
                        <TableCell className="font-medium">
                          {employee.fullName}
                        </TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>
                          {employee.department.departmentName}
                        </TableCell>
                        <TableCell>{employee.position}</TableCell>
                        {/* <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "border-none",
                              user.status === "Hoạt động" &&
                                "bg-green-100 text-green-800",
                              user.status === "Tạm khóa" &&
                                "bg-red-100 text-red-800"
                            )}
                          >
                            {user.status}
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
                              <DropdownMenuItem className="p-0">
                                <Button
                                  variant={"ghost"}
                                  className="text-red-600 hover:text-red-600 p-2"
                                  onClick={() => {
                                    setSelectedEmployee(employee)
                                    setOpenConfirmDeleteModal(true)
                                  }}
                                >
                                  <Trash2 className="mb-0.5 h-4 w-4" />
                                  Xóa tài khoản
                                </Button>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow className="text-center">
                    <TableCell colSpan={6} className="py-8">
                      Không tìm thấy tài khoản nào
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

      <ConfirmDeleteAccountModal
        open={openConfirmDeleteModal}
        setOpen={setOpenConfirmDeleteModal}
        loading={loading}
        deleteUser={handleDeleteEmployee}
      />
    </div>
  )
}
