"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format, formatDate } from "date-fns"
import { da, vi } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, ArrowLeft, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { IEmployee } from "@/types/Employee"
import useGetAllEmployees from "@/hooks/admin/useGetAllEmployees"
import { ICandidate } from "@/types/Candidate"
import useGetAllCandidates from "@/hooks/hr/useGetAllCanidates"
import useCreateInterview from "@/hooks/hr/useCreateInterview"

// Validation schema
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Tên lịch phỏng vấn không được để trống",
  }),
  interviewerId: z.string({
    required_error: "Vui lòng chọn người phỏng vấn",
  }),
  date: z.date({
    required_error: "Vui lòng chọn ngày phỏng vấn",
  }),
  time: z.string({
    required_error: "Vui lòng chọn thời gian phỏng vấn",
  }),
  location: z.string().min(1, {
    message: "Địa điểm phỏng vấn không được để trống",
  }),
  notes: z.string().optional(),
  candidateIds: z.array(z.number()).min(1, {
    message: "Vui lòng chọn ít nhất 1 ứng viên",
  }),
})

export default function CreateInterviewPage() {
  const router = useRouter()

  const [employees, setEmployees] = useState<IEmployee[]>([])
  const { getAllEmployees } = useGetAllEmployees()

  const [candidates, setCandidates] = useState<ICandidate[]>([])
  const { getAllCandidates } = useGetAllCandidates()

  useEffect(() => {
    const fetchEmployees = async () => {
      const fetchedEmployees = await getAllEmployees("")
      if (fetchedEmployees) setEmployees(fetchedEmployees)
    }
    fetchEmployees()

    const fetchCandidates = async () => {
      const fetchedCandidates = await getAllCandidates("", false)
      if (fetchedCandidates) setCandidates(fetchedCandidates)
    }
    fetchCandidates()
  }, [])

  // Initialize form with React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      // interviewerId: "",
      date: undefined,
      // time: "",
      location: "",
      notes: "",
      candidateIds: [],
    },
  })

  const { loading, createInterview } = useCreateInterview()

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("data: ", data)

    const formattedData = {
      ...data,
      interviewerId: Number(data.interviewerId),
      date: formatDate(data.date, "yyyy-MM-dd"),
      time: data.time + ":00",
    }

    console.log("formatted data: ", formattedData)

    createInterview(formattedData)
  }

  return (
    <div className="container pb-10">
      <div className="mb-2 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/dashboard/recruitment?tab=interviews">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Link>
        </Button>
        {/* <h1 className="text-2xl font-bold">Tạo lịch phỏng vấn mới</h1> */}
      </div>

      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Tạo lịch phỏng vấn mới</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="space-y-6">
              {/* Tên lịch phỏng vấn */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tên lịch phỏng vấn{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên lịch phỏng vấn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Người phỏng vấn */}
              <FormField
                control={form.control}
                name="interviewerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Người phỏng vấn{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn người phỏng vấn" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem
                            key={employee.id}
                            value={employee.id.toString()}
                          >
                            {employee.fullName} - {employee.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thời gian phỏng vấn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>
                        Ngày phỏng vấn{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Popover>
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
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-fit">
                      <FormLabel>
                        Thời gian <span className="text-destructive">*</span>
                      </FormLabel>
                      <Input type="time" {...field} />
                      {/* <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn thời gian" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 19 }, (_, i) => i + 8).map(
                            (hour) => (
                              <SelectItem key={hour} value={hour.toString()}>
                                {hour}:00
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Địa điểm phỏng vấn */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Địa điểm phỏng vấn{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa điểm phỏng vấn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ghi chú */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập ghi chú về buổi phỏng vấn (không bắt buộc)"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Danh sách ứng viên */}
              <FormField
                control={form.control}
                name="candidateIds"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>
                        Danh sách ứng viên{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormDescription>
                        Chọn các ứng viên tham gia buổi phỏng vấn này
                      </FormDescription>
                    </div>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Họ và tên</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Vị trí ứng tuyển
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Email
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {candidates.map((candidate) => (
                            <TableRow key={candidate.id}>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name="candidateIds"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={candidate.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              candidate.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    candidate.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== candidate.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )
                                  }}
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {candidate.fullName}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {candidate.jobPosition}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {candidate.email}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={() =>
                  router.push("/dashboard/recruitment?tab=interviews")
                }
              >
                Quay lại
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
                  "Tạo lịch phỏng vấn"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
