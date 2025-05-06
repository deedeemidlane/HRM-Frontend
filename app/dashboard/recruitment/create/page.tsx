"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { format, formatDate } from "date-fns"
import { cn } from "@/lib/utils"
import { RichTextEditor } from "@/components/rich-text-editor"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import useCreateJob from "@/hooks/hr/useCreateJob"
import { JobPostingFormValues, jobPostingSchema } from "../schema"
import { useEffect, useState } from "react"
import { IDepartment } from "@/types/Department"
import useGetAllDepartments from "@/hooks/others/useGetAllDepartments"

export default function CreateJobPostingPage() {
  const router = useRouter()

  const [departments, setDepartments] = useState<IDepartment[]>([])
  const { getAllDepartments } = useGetAllDepartments()

  useEffect(() => {
    const fetchDepartments = async () => {
      const fetchedDepartments = await getAllDepartments()
      if (fetchedDepartments) setDepartments(fetchedDepartments)
    }
    fetchDepartments()
  }, [])

  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      jobTitle: "",
      // departmentId: "",
      position: "",
      salary: "",
      jobDescription: "",
      requirements: "",
      location: "Hà Nội",
    },
  })

  const { loading, createJob } = useCreateJob()

  const handleSubmit = async (data: JobPostingFormValues) => {
    console.log("Form data:", data)

    const formattedData = {
      ...data,
      closedDate: formatDate(data.closedDate, "yyyy-MM-dd"),
      salary: Number(data.salary),
      departmentId: Number(data.departmentId),
    }
    console.log("formatted data: ", formattedData)

    createJob(formattedData)
  }

  return (
    <div className="container pb-10">
      <div className="mb-2">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/dashboard/recruitment">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Link>
        </Button>
        {/* <h1 className="text-2xl font-bold">Đăng tin tuyển dụng</h1> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đăng tin tuyển dụng</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề tin tuyển dụng</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tiêu đề tin tuyển dụng"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phòng ban</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn phòng ban" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem
                              key={department.id}
                              value={department.id.toString()}
                            >
                              {department.departmentName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vị trí tuyển dụng</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập vị trí. VD: Web Developer..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <div className="space-y-2">
                <Label>Mức lương</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="salaryMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">
                          Tối thiểu (VNĐ)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ví dụ: 10000000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salaryMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">
                          Tối đa (VNĐ)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ví dụ: 20000000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div> */}

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel>Mức lương (triệu VNĐ)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập mức lương. VD: 15"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="closedDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel>Hạn nộp hồ sơ</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Chọn ngày</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
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
              </div>

              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả công việc</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Nhập mô tả công việc"
                        error={!!form.formState.errors.jobDescription}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yêu cầu ứng viên</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Nhập yêu cầu ứng viên"
                        error={!!form.formState.errors.requirements}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="benefits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quyền lợi</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Nhập quyền lợi"
                        error={!!form.formState.errors.benefits}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Địa điểm</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn tỉnh/thành phố" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                          <SelectItem value="danang">Đà Nẵng</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.push("/dashboard/recruitment")}
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
                  "Đăng tin"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
