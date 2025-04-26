"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, ArrowLeft, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function CreateJobPostingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to the recruitment page
    router.push("/dashboard/recruitment")
  }

  return (
    <div className="pb-10">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/dashboard/recruitment">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Link>
        </Button>
        <h1 className="text-2xl font-bold ml-6 mt-3">Đăng tin tuyển dụng</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="overflow-hidden">
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề tin tuyển dụng</Label>
              <Input id="title" placeholder="Nhập tiêu đề tin tuyển dụng" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="jobType">Loại công việc</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại công việc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Toàn thời gian</SelectItem>
                    <SelectItem value="part-time">Bán thời gian</SelectItem>
                    <SelectItem value="contract">Hợp đồng</SelectItem>
                    <SelectItem value="internship">Thực tập</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Cấp bậc</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn cấp bậc" />
                  </SelectTrigger>
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
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mức lương</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="salaryMin"
                    className="text-xs text-muted-foreground"
                  >
                    Tối thiểu (VNĐ)
                  </Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="Ví dụ: 10000000"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="salaryMax"
                    className="text-xs text-muted-foreground"
                  >
                    Tối đa (VNĐ)
                  </Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    placeholder="Ví dụ: 20000000"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả công việc</Label>
              <Textarea
                id="description"
                placeholder="Nhập mô tả công việc"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Yêu cầu ứng viên</Label>
              <Textarea
                id="requirements"
                placeholder="Nhập yêu cầu ứng viên"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Quyền lợi</Label>
              <Textarea
                id="benefits"
                placeholder="Nhập quyền lợi"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Địa điểm làm việc</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="city"
                    className="text-xs text-muted-foreground"
                  >
                    Tỉnh/Thành phố
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tỉnh/thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hanoi">Hà Nội</SelectItem>
                      <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                      <SelectItem value="danang">Đà Nẵng</SelectItem>
                      <SelectItem value="bacgiang">Bắc Giang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-xs text-muted-foreground"
                  >
                    Địa chỉ cụ thể
                  </Label>
                  <Input id="address" placeholder="Nhập địa chỉ cụ thể" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Thời gian làm việc</Label>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Ngày làm việc
                  </Label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      "Thứ 2",
                      "Thứ 3",
                      "Thứ 4",
                      "Thứ 5",
                      "Thứ 6",
                      "Thứ 7",
                      "Chủ nhật",
                    ].map((day, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`day-${index}`} />
                        <label
                          htmlFor={`day-${index}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="startTime"
                      className="text-xs text-muted-foreground"
                    >
                      Giờ bắt đầu
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giờ bắt đầu" />
                      </SelectTrigger>
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
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="endTime"
                      className="text-xs text-muted-foreground"
                    >
                      Giờ kết thúc
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giờ kết thúc" />
                      </SelectTrigger>
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
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Hạn nộp hồ sơ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
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
      </Card>
    </div>
  )
}
