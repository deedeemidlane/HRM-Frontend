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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Shield } from "lucide-react"
import { useEffect, useState } from "react"
import useGetAllUsers from "@/hooks/admin/useGetAllUsers"
import useDebounce from "@/hooks/use-debounce"
import { IRole, IUser } from "@/types/User"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DISPLAYED_ROLES } from "@/constants/roles"
import useUpdateRole from "@/hooks/admin/useUpdateRole"
import { UpdateRoleModal } from "./ui/UpdateRoleModal"
import useGetAllRoles from "@/hooks/others/useGetAllRoles"

export default function RolesManagementPage() {
  const [users, setUsers] = useState<IUser[]>([])
  const { getAllUsers } = useGetAllUsers()

  const [toggleReRender, setToggleReRender] = useState(false)

  const [searchKey, setSearchKey] = useState("")
  const debouncedSearchKey = useDebounce(searchKey, 300)

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers(debouncedSearchKey)
      if (fetchedUsers) setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [toggleReRender, debouncedSearchKey])

  const [roles, setRoles] = useState<IRole[]>([])
  const { getAllRoles } = useGetAllRoles()

  useEffect(() => {
    const fetchRoles = async () => {
      const fetchedRoles = await getAllRoles()
      if (fetchedRoles) setRoles(fetchedRoles)
    }
    fetchRoles()
  }, [])

  const [selectedUser, setSelectedUser] = useState<IUser>()
  const [openUpdateRoleModal, setOpenUpdateRoleModal] = useState(false)
  const { loading, updateRole } = useUpdateRole()

  const handleUpdateRole = async (data: number[]) => {
    if (selectedUser) {
      await updateRole(selectedUser.email, { roleIds: data })
      setOpenUpdateRoleModal(false)
      setToggleReRender(!toggleReRender)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phân quyền</h1>
          <p className="text-muted-foreground">
            Quản lý vai trò và quyền hạn trong hệ thống.
          </p>
        </div>
        {/* <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
          <Plus className="mr-2 h-4 w-4" />
          Thêm vai trò
        </Button> */}
      </div>

      <Card>
        {/* <CardHeader>
          <CardTitle>Danh sách nhân sự</CardTitle>
        </CardHeader> */}
        <CardContent className="space-y-4 mt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm..."
                className="w-full pl-8"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              {/* <Button variant="outline" size="sm">
                Xuất Excel
              </Button> */}
              {/* <Button variant="outline" size="sm">
                <Filter />
                Lọc
              </Button> */}
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  <>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell className="font-medium">
                          {user.fullName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="space-x-2">
                          {user.roles.map((role) => (
                            <Badge
                              key={`role-${role.id}`}
                              variant="outline"
                              className={cn(
                                "border-none",
                                role.name === "ROLE_ADMIN" &&
                                  "bg-purple-100 text-purple-800",
                                // role.name === "HR" &&
                                //   "bg-blue-100 text-blue-800",
                                role.name === "ROLE_MANAGER" &&
                                  "bg-amber-100 text-amber-800",
                                role.name === "ROLE_USER" &&
                                  "bg-green-100 text-green-800"
                              )}
                            >
                              {DISPLAYED_ROLES[role.name]}
                            </Badge>
                          ))}
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
                              <DropdownMenuItem className="p-0">
                                <Button
                                  variant={"ghost"}
                                  onClick={() => {
                                    setSelectedUser(user)
                                    setOpenUpdateRoleModal(true)
                                  }}
                                >
                                  <Shield className="mb-0.5 h-4 w-4" />
                                  Thay đổi quyền
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

      <Card>
        <CardHeader>
          <CardTitle>Danh sách vai trò</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên vai trò</TableHead>
                  <TableHead>Mô tả</TableHead>
                  {/* <TableHead>Số người dùng</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {role_details.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className={`h-4 w-4 ${role.iconColor}`} />
                        {role.name}
                      </div>
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    {/* <TableCell>{role.userCount}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <UpdateRoleModal
        open={openUpdateRoleModal}
        setOpen={setOpenUpdateRoleModal}
        allRoles={roles}
        selectedUserRoles={
          selectedUser ? selectedUser.roles.map((role) => role.id) : []
        }
        loading={loading}
        submit={handleUpdateRole}
      />
    </div>
  )
}

const role_details = [
  {
    id: 1,
    name: "Quản trị viên",
    description: "Quản trị viên hệ thống, có quyền cao nhất",
    userCount: 2,
    iconColor: "text-purple-500",
  },
  // {
  //   id: 2,
  //   name: "HR",
  //   description: "Nhân viên phòng nhân sự, quản lý thông tin nhân viên",
  //   userCount: 5,
  //   iconColor: "text-blue-500",
  // },
  {
    id: 3,
    name: "Quản lý",
    description: "Quản lý phòng ban, quản lý nhân viên cấp dưới",
    userCount: 12,
    iconColor: "text-amber-500",
  },
  {
    id: 4,
    name: "Nhân viên",
    description: "Nhân viên thông thường",
    userCount: 123,
    iconColor: "text-green-500",
  },
]

// const permissions = [
//   {
//     id: 1,
//     name: "Quản lý tài khoản người dùng",
//     admin: true,
//     hr: false,
//     manager: false,
//     employee: false,
//   },
//   {
//     id: 2,
//     name: "Phân quyền người dùng",
//     admin: true,
//     hr: false,
//     manager: false,
//     employee: false,
//   },
//   {
//     id: 3,
//     name: "Quản lý hồ sơ nhân viên",
//     admin: true,
//     hr: true,
//     manager: false,
//     employee: false,
//   },
//   {
//     id: 4,
//     name: "Quản lý tuyển dụng",
//     admin: true,
//     hr: true,
//     manager: false,
//     employee: false,
//   },
//   {
//     id: 5,
//     name: "Quản lý chấm công",
//     admin: true,
//     hr: true,
//     manager: true,
//     employee: false,
//   },
//   {
//     id: 6,
//     name: "Quản lý lương thưởng",
//     admin: true,
//     hr: true,
//     manager: false,
//     employee: false,
//   },
//   {
//     id: 7,
//     name: "Duyệt đơn nghỉ phép/OT",
//     admin: true,
//     hr: true,
//     manager: true,
//     employee: false,
//   },
//   {
//     id: 8,
//     name: "Xem thông tin cá nhân",
//     admin: true,
//     hr: true,
//     manager: true,
//     employee: true,
//   },
//   {
//     id: 9,
//     name: "Chấm công cá nhân",
//     admin: true,
//     hr: true,
//     manager: true,
//     employee: true,
//   },
//   {
//     id: 10,
//     name: "Gửi đơn nghỉ phép/OT",
//     admin: true,
//     hr: true,
//     manager: true,
//     employee: true,
//   },
// ]
