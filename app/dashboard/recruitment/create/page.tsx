"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { format } from "date-fns"
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

// Định nghĩa schema validation với Zod
const jobPostingSchema = z
  .object({
    title: z
      .string()
      .min(10, { message: "Tiêu đề phải có ít nhất 10 ký tự" })
      .max(100, { message: "Tiêu đề không được vượt quá 100 ký tự" }),
    jobType: z.string({
      required_error: "Vui lòng chọn loại công việc",
    }),
    level: z.string({
      required_error: "Vui lòng chọn cấp bậc",
    }),
    salaryMin: z
      .string()
      .min(1, { message: "Vui lòng nhập mức lương tối thiểu" })
      .refine((val) => !isNaN(Number(val)), {
        message: "Mức lương phải là số",
      }),
    salaryMax: z
      .string()
      .min(1, { message: "Vui lòng nhập mức lương tối đa" })
      .refine((val) => !isNaN(Number(val)), {
        message: "Mức lương phải là số",
      }),
    description: z
      .string()
      .min(50, { message: "Mô tả công việc phải có ít nhất 50 ký tự" }),
    requirements: z
      .string()
      .min(50, { message: "Yêu cầu ứng viên phải có ít nhất 50 ký tự" }),
    benefits: z
      .string()
      .min(50, { message: "Quyền lợi phải có ít nhất 50 ký tự" }),
    city: z.string({
      required_error: "Vui lòng chọn tỉnh/thành phố",
    }),
    address: z
      .string()
      .min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" })
      .max(200, { message: "Địa chỉ không được vượt quá 200 ký tự" }),
    startDate: z.string({
      required_error: "Vui lòng chọn ngày bắt đầu",
    }),
    endDate: z.string({
      required_error: "Vui lòng chọn ngày kết thúc",
    }),
    startTime: z.string({
      required_error: "Vui lòng chọn giờ bắt đầu",
    }),
    endTime: z.string({
      required_error: "Vui lòng chọn giờ kết thúc",
    }),
    deadline: z.date({
      required_error: "Vui lòng chọn hạn nộp hồ sơ",
    }),
  })
  .refine(
    (data) => {
      return Number(data.salaryMax) >= Number(data.salaryMin)
    },
    {
      message: "Mức lương tối đa phải lớn hơn hoặc bằng mức lương tối thiểu",
      path: ["salaryMax"],
    }
  )
  .refine(
    (data) => {
      return data.endDate >= data.startDate
    },
    {
      message: "Ngày kết thúc phải sau ngày bắt đầu",
      path: ["endDate"],
    }
  )

// Kiểu dữ liệu từ schema
type JobPostingFormValues = z.infer<typeof jobPostingSchema>

export default function CreateJobPostingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Khởi tạo form với React Hook Form và Zod resolver
  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: {
      title: "",
      jobType: "",
      level: "",
      salaryMin: "",
      salaryMax: "",
      description: "",
      requirements: "",
      benefits: "",
      city: "",
      address: "",
      startTime: "",
      endTime: "",
    },
  })

  const handleSubmit = async (data: JobPostingFormValues) => {
    setIsLoading(true)

    try {
      // Giả lập API delay
      console.log("Form data:", data)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Chuyển hướng đến trang recruitment
      router.push("/dashboard/recruitment")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
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
                name="title"
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
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại công việc</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại công việc" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full-time">
                            Toàn thời gian
                          </SelectItem>
                          <SelectItem value="part-time">
                            Bán thời gian
                          </SelectItem>
                          <SelectItem value="contract">Hợp đồng</SelectItem>
                          <SelectItem value="internship">Thực tập</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cấp bậc</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn cấp bậc" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="intern">Thực tập sinh</SelectItem>
                          <SelectItem value="fresher">Fresher</SelectItem>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="middle">Middle</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="leader">Team Leader</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
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
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả công việc</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Nhập mô tả công việc"
                        error={!!form.formState.errors.description}
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

              <div className="space-y-2">
                <Label>Địa điểm làm việc</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">
                          Tỉnh/Thành phố
                        </FormLabel>
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
                            <SelectItem value="bacgiang">Bắc Giang</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">
                          Địa chỉ cụ thể
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập địa chỉ cụ thể" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* <div className="space-y-2">
                    <Label>Thời gian làm việc</Label>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Ngày bắt đầu</FormLabel>
    
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Ngày kết thúc</FormLabel>
    
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Giờ bắt đầu</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn giờ bắt đầu" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Array.from({ length: 13 }, (_, i) => i + 7).map(
                                  (hour) => (
                                    <SelectItem key={hour} value={hour.toString()}>
                                      {hour}:00
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Giờ kết thúc</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn giờ kết thúc" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Array.from({ length: 13 }, (_, i) => i + 7).map(
                                  (hour) => (
                                    <SelectItem key={hour} value={hour.toString()}>
                                      {hour}:00
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div> */}

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
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
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                disabled={isLoading}
              >
                {isLoading ? (
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
