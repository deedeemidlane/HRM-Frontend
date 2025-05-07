"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useApply from "@/hooks/others/useApply"
import { DatePicker } from "./ui/date-picker"
import { formatDate } from "date-fns"

// Định nghĩa schema validation
const formSchema = z.object({
  fullName: z.string().min(1, { message: "Vui lòng nhập họ tên" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z.string().min(10, { message: "Số điện thoại không hợp lệ" }).max(15),
  address: z.string().min(1, { message: "Vui lòng nhập địa chỉ" }),
  gender: z.string({ required_error: "Vui lòng chọn giới tính" }),
  dateOfBirth: z.date({ required_error: "Vui lòng chọn ngày sinh" }),
  idNumber: z
    .string()
    .min(12, { message: "Số CCCD/CMND không hợp lệ" })
    .max(12, { message: "Số CCCD/CMND không hợp lệ" }),
  cvLetter: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface JobApplicationModalProps {
  jobTitle: string
  jobId: string
}

export function JobApplicationModal({
  jobTitle,
  jobId,
}: JobApplicationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [success, setSuccess] = useState(false)

  // Khởi tạo form với React Hook Form và Zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      // gender: "",
      // dateOfBirth: "",
      idNumber: "",
      cvLetter: "",
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const { loading, apply } = useApply()

  const onSubmit = async (data: FormValues) => {
    console.log("Form data:", data)
    console.log("Selected file:", selectedFile)

    const formData = new FormData()

    // Append all form fields to FormData
    formData.append("fullName", data.fullName)
    formData.append("email", data.email)
    formData.append("phone", data.phone)
    formData.append("address", data.address)
    formData.append("gender", data.gender)
    formData.append("dateOfBirth", formatDate(data.dateOfBirth, "yyyy-MM-dd"))
    formData.append("idNumber", data.idNumber)
    formData.append("jobId", jobId)

    // Append optional fields if they exist
    if (data.cvLetter) {
      formData.append("cvLetter", data.cvLetter)
    }

    // Append the selected file
    if (selectedFile) {
      formData.append("resume", selectedFile)
    }

    await apply(formData)

    setSuccess(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#3db87a] hover:bg-[#35a46c]">
          Ứng tuyển ngay
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        {success ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <DialogTitle className="text-xl">Ứng tuyển thành công!</DialogTitle>
            <DialogDescription className="mt-2">
              Chúng tôi đã nhận được hồ sơ ứng tuyển của bạn. Chúng tôi sẽ liên
              hệ với bạn sớm nhất có thể.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Ứng tuyển vị trí {jobTitle}</DialogTitle>
              <DialogDescription>
                Vui lòng điền đầy đủ thông tin bên dưới để ứng tuyển. Chúng tôi
                sẽ liên hệ với bạn sớm nhất có thể.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 py-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Họ và tên <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập họ và tên của bạn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Nhập địa chỉ email của bạn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Số điện thoại <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập số điện thoại của bạn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Địa chỉ <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập địa chỉ của bạn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Giới tính <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Nam</SelectItem>
                            <SelectItem value="female">Nữ</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ngày sinh <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          {/* <Input type="date" {...field} /> */}
                          <DatePicker
                            date={field.value}
                            setDate={field.onChange}
                            startYear={1950}
                            endYear={2025}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="idNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Số CCCD/CMND <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập số CCCD/CMND của bạn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="cv">
                      CV của bạn (PDF) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Chấp nhận file PDF, DOC hoặc DOCX (tối đa 5MB)
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="cvLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thư xin việc</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Giới thiệu ngắn gọn về bản thân và lý do bạn muốn ứng tuyển vị trí này"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={loading}
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
                        Đang gửi...
                      </>
                    ) : (
                      "Gửi hồ sơ"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
