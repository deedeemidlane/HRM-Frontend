"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format, formatDate } from "date-fns"
import { vi } from "date-fns/locale"
import {
  ArrowLeft,
  CalendarIcon,
  ChevronLeft,
  Info,
  Loader2,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IEmployee } from "@/types/Employee"
import useGetNonContractEmployees from "@/hooks/hr/useGetNonContractEmployees"
import Link from "next/link"
import { DatePicker } from "@/components/ui/date-picker"
import useCreateContract from "@/hooks/hr/useCreateContract"

// Form schema
const formSchema = z.object({
  employeeId: z.string({
    required_error: "Vui lòng chọn nhân viên",
  }),
  startDate: z.date({
    required_error: "Vui lòng chọn ngày bắt đầu",
  }),
  endDate: z.date({
    required_error: "Vui lòng chọn ngày bắt đầu",
  }),
  salary: z
    .string()
    .min(1, "Vui lòng nhập mức lương")
    .refine((val) => !isNaN(Number(val.replace(/,/g, ""))), {
      message: "Mức lương phải là số",
    })
    .refine((val) => Number(val.replace(/,/g, "")) > 0, {
      message: "Mức lương phải lớn hơn 0",
    }),
  // contractType: z.enum(["fixed", "indefinite", "probation"], {
  //   required_error: "Vui lòng chọn loại hợp đồng",
  // }),
})

type FormValues = z.infer<typeof formSchema>

export default function CreateContractPage() {
  const router = useRouter()

  const [nonContractEmployees, setNonContractEmployees] = useState<IEmployee[]>(
    []
  )
  const { getNonContractEmployees } = useGetNonContractEmployees()

  useEffect(() => {
    const fetchNonContractEmployees = async () => {
      const fetchedNonContractEmployees = await getNonContractEmployees()
      if (fetchedNonContractEmployees)
        setNonContractEmployees(fetchedNonContractEmployees)
    }
    fetchNonContractEmployees()
  }, [])

  const [searchTerm, setSearchTerm] = useState("")

  // Filter employees based on search term
  const filteredEmployees = nonContractEmployees.filter(
    (employee) =>
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.departmentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salary: "",
    },
  })

  // Format salary with commas
  const formatSalary = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, "")
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const { loading, createContract } = useCreateContract()

  const onSubmit = async (data: FormValues) => {
    // Convert salary string to number
    const salaryNumber = Number(data.salary.replace(/,/g, ""))

    const formattedData = {
      startDate: formatDate(data.startDate, "yyyy-MM-dd"),
      endDate: formatDate(data.endDate, "yyyy-MM-dd"),
      salary: salaryNumber,
      employeeId: Number(data.employeeId),
    }

    console.log(formattedData)

    createContract(formattedData)
  }

  return (
    <div className="container">
      <div className="mb-2">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/dashboard/admin/users">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Link>
        </Button>
        {/* <h1 className="text-2xl font-bold">Thêm tài khoản mới</h1> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tạo hợp đồng mới</CardTitle>
          <CardDescription>
            Nhập thông tin chi tiết cho hợp đồng mới.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <div>
                  <FormField
                    control={form.control}
                    name="employeeId"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between mb-4">
                          <FormLabel>
                            Chọn nhân viên{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <div className="relative w-64">
                            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="search"
                              placeholder="Tìm kiếm nhân viên..."
                              className="w-full pl-8"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                        </div>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="border rounded-md"
                          >
                            <div className="max-h-[400px] overflow-auto">
                              <Table>
                                <TableHeader className="sticky top-0 bg-white">
                                  <TableRow>
                                    <TableHead className="w-[50px]"></TableHead>
                                    <TableHead>Họ và tên</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                      Vị trí
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                      Phòng ban
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((employee) => (
                                      <TableRow key={employee.id}>
                                        <TableCell className="text-center">
                                          <RadioGroupItem
                                            value={employee.id.toString()}
                                            id={`employee-${employee.id}`}
                                            className="mx-auto"
                                          />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                          <label
                                            htmlFor={`employee-${employee.id}`}
                                            className="cursor-pointer"
                                          >
                                            {employee.fullName}
                                          </label>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                          {employee.position}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                          {employee.department.departmentName}
                                        </TableCell>
                                      </TableRow>
                                    ))
                                  ) : (
                                    <TableRow>
                                      <TableCell
                                        colSpan={6}
                                        className="h-24 text-center"
                                      >
                                        Không tìm thấy nhân viên nào.
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contractType"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>
                          Loại hợp đồng <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="fixed" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Hợp đồng xác định thời hạn
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="indefinite" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Hợp đồng không xác định thời hạn
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="probation" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Hợp đồng thử việc
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}

                <div className="grid gap-4 md:grid-cols-2 pt-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Ngày bắt đầu <span className="text-red-500">*</span>
                        </FormLabel>
                        {/* <Popover>
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
                                  format(field.value, "dd/MM/yyyy", {
                                    locale: vi,
                                  })
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
                              // disabled={(date) =>
                              //   date < new Date(new Date().setHours(0, 0, 0, 0))
                              // }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover> */}
                        <DatePicker
                          date={field.value}
                          setDate={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Ngày kết thúc <span className="text-red-500">*</span>
                        </FormLabel>
                        {/* <Popover>
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
                                  format(field.value, "dd/MM/yyyy", {
                                    locale: vi,
                                  })
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
                              disabled={(date) => {
                                const startDate = form.getValues("startDate")
                                return startDate && date <= startDate
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover> */}
                        <DatePicker
                          date={field.value}
                          setDate={field.onChange}
                          startDate={form.getValues("startDate")}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>
                          Mức lương (VNĐ){" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              onChange={(e) => {
                                const formatted = formatSalary(e.target.value)
                                field.onChange(formatted)
                              }}
                              placeholder="Ví dụ: 10,000,000"
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Nhập mức lương hàng tháng (trước thuế)</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <CardFooter className="flex justify-end gap-2 px-0 pb-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/contracts")}
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
                    "Tạo hợp đồng"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
