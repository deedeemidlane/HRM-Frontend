"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
import { CalendarIcon, ArrowLeft, Loader2, Plus } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function CreateInterviewPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date>()
  const [interviewers, setInterviewers] = useState([{ name: "", email: "" }])

  const addInterviewer = () => {
    setInterviewers([...interviewers, { name: "", email: "" }])
  }

  const handleInterviewerChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedInterviewers = [...interviewers]
    updatedInterviewers[index] = {
      ...updatedInterviewers[index],
      [field]: value,
    }
    setInterviewers(updatedInterviewers)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to the interviews page
    router.push("/dashboard/recruitment/interviews")
  }

  return (
    <div className="container pb-10">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/dashboard/recruitment?tab=interviews">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Link>
        </Button>
        <h1 className="text-2xl font-bold ml-6">Tạo lịch phỏng vấn mới</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bước 1: Nhập thông tin cơ bản</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="interviewName">Tên lịch phỏng vấn</Label>
              <Input id="interviewName" placeholder="Nhập tên lịch phỏng vấn" />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="interviewRound">Vòng phỏng vấn</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vòng phỏng vấn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="screening">Phỏng vấn sơ loại</SelectItem>
                  <SelectItem value="technical">Phỏng vấn kỹ thuật</SelectItem>
                  <SelectItem value="culture">Phỏng vấn văn hóa</SelectItem>
                  <SelectItem value="final">Phỏng vấn chuyên sâu</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            <div className="space-y-2">
              <Label>Danh sách người phỏng vấn</Label>
              <div className="space-y-4">
                {interviewers.map((interviewer, index) => (
                  <div
                    key={index}
                    className="grid gap-4 md:grid-cols-2 p-4 border rounded-md"
                  >
                    <div className="space-y-2">
                      <Label
                        htmlFor={`name-${index}`}
                        className="text-xs text-muted-foreground"
                      >
                        Họ và tên
                      </Label>
                      <Input
                        id={`name-${index}`}
                        value={interviewer.name}
                        onChange={(e) =>
                          handleInterviewerChange(index, "name", e.target.value)
                        }
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`email-${index}`}
                        className="text-xs text-muted-foreground"
                      >
                        Email
                      </Label>
                      <Input
                        id={`email-${index}`}
                        type="email"
                        value={interviewer.email}
                        onChange={(e) =>
                          handleInterviewerChange(
                            index,
                            "email",
                            e.target.value
                          )
                        }
                        placeholder="Nhập email"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addInterviewer}
                  className="w-full border-dashed"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm người phỏng vấn
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Thời gian phỏng vấn</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="interviewDate"
                    className="text-xs text-muted-foreground"
                  >
                    Ngày phỏng vấn
                  </Label>
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
                        {date ? (
                          format(date, "dd/MM/yyyy")
                        ) : (
                          <span>Chọn ngày</span>
                        )}
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
                <div className="space-y-2">
                  <Label
                    htmlFor="interviewTime"
                    className="text-xs text-muted-foreground"
                  >
                    Thời gian
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 19 }, (_, i) => i + 8).map(
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
          </CardContent>
          <CardFooter className="flex justify-end">
            {/* <Button
              variant="outline"
              type="button"
              onClick={() =>
                router.push("/dashboard/recruitment?tab=interviews")
              }
            >
              Quay lại
            </Button> */}
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
                "Tiếp tục"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
