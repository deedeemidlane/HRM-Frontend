"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowRight,
  Users,
  Briefcase,
  Award,
  Send,
  Menu,
  ExternalLink,
  Calendar,
  MapPin,
  CircleDollarSign,
} from "lucide-react"
import toast from "react-hot-toast"
import { HomeHeader } from "@/components/home-header"
import useGetAllJobs from "@/hooks/others/useGetAllJobs"
import { IJob } from "@/types/Job"
import { formatDateString } from "@/utils/formatDate"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.success("Cảm ơn bạn đã gửi tin nhắn!")
    e.currentTarget.reset()
  }

  const [jobs, setJobs] = useState<IJob[]>([])
  const { getAllJobs } = useGetAllJobs()

  useEffect(() => {
    const fetchJobs = async () => {
      const fetchedJobs = await getAllJobs("")
      if (fetchedJobs) setJobs(fetchedJobs)
    }
    fetchJobs()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader aboutRef={aboutRef} contactRef={contactRef} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-[#f8faf9]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Chào mừng đến với ADA
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Chúng tôi tin vào việc trao quyền cho nhân viên để đạt được sự
                  vĩ đại. Hãy tham gia đội ngũ của chúng tôi và trở thành một
                  phần của điều phi thường.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button className="bg-[#3db87a] hover:bg-[#35a46c]" asChild>
                    <Link href="/jobs">
                      Xem vị trí tuyển dụng{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    // onClick={() => scrollToSection(aboutRef)}
                  >
                    <Link href="/#about">Tìm hiểu thêm về chúng tôi</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:ml-auto flex justify-center">
                <img
                  alt="Đội ngũ ADA"
                  className="rounded-lg object-cover"
                  height="400"
                  src="/company.jpg"
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>
        <section
          ref={aboutRef}
          className="w-full py-12 md:py-24 lg:py-32"
          id="about"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#edf7f2] px-3 py-1 text-sm text-[#3db87a]">
                  Về ADA
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Xây dựng tương lai cùng nhau
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ADA là một công ty tiên phong, tập trung vào đổi mới và xuất
                  sắc. Chúng tôi nỗ lực tạo ra một môi trường làm việc nơi tài
                  năng phát triển và ý tưởng nở rộ.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#edf7f2] text-[#3db87a]">
                  <Users className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Đội ngũ đa dạng</h3>
                  <p className="text-gray-500">
                    Chúng tôi tập hợp những cá nhân tài năng từ nhiều nền tảng
                    khác nhau để tạo ra một môi trường làm việc phong phú và hòa
                    nhập.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#edf7f2] text-[#3db87a]">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Cơ hội phát triển</h3>
                  <p className="text-gray-500">
                    Chúng tôi cung cấp các cơ hội học tập và phát triển liên tục
                    để giúp nhân viên đạt được tiềm năng tối đa của họ.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#edf7f2] text-[#3db87a]">
                  <Award className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Phúc lợi cạnh tranh</h3>
                  <p className="text-gray-500">
                    Chúng tôi cung cấp các gói phúc lợi toàn diện được thiết kế
                    để hỗ trợ sức khỏe và cân bằng công việc-cuộc sống của nhân
                    viên.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8faf9]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#edf7f2] px-3 py-1 text-sm text-[#3db87a]">
                  Vị trí nổi bật
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Tham gia đội ngũ của chúng tôi
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Khám phá các vị trí hiện tại và tìm vai trò phù hợp với kỹ
                  năng và nguyện vọng của bạn.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              {jobs.slice(0, 4).map((job) => (
                <div
                  key={job.id}
                  className="rounded-lg border bg-card text-card-foreground shadow-sm"
                >
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">{job.jobTitle}</h3>
                      <Badge className="bg-[#edf7f2] text-[#3db87a]">
                        {job.departmentName}
                      </Badge>
                      <div className="my-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CircleDollarSign className="h-4 w-4" />
                          <span>{job.salary} VNĐ</span>
                        </div>
                        {job.closedDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDateString(job.closedDate)}</span>
                          </div>
                        )}
                      </div>
                      <div className="w-full pt-4">
                        <Link href={`/jobs/${job.id}`} className="w-full">
                          <Button className="bg-[#3db87a] hover:bg-[#35a46c] w-full">
                            Xem chi tiết
                            <ExternalLink className="mb-0.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    {/* <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-md bg-[#edf7f2] px-2 py-1 text-xs font-medium text-[#3db87a]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/jobs">
                  Xem tất cả vị trí <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <section
          ref={contactRef}
          className="w-full py-12 md:py-24 lg:py-32"
          id="contact"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#edf7f2] px-3 py-1 text-sm text-[#3db87a]">
                  Liên hệ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Liên hệ với chúng tôi
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Có câu hỏi hoặc muốn tìm hiểu thêm? Hãy liên hệ với chúng tôi
                  ngay hôm nay.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold">Thông tin liên hệ</h3>
                  <div className="mt-3 space-y-2">
                    <p className="flex items-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-[#3db87a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      info@ada.com
                    </p>
                    <p className="flex items-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-[#3db87a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      (+84) 123 456 789
                    </p>
                    <p className="flex items-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-[#3db87a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      144 Xuân Thuỷ, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Giờ làm việc</h3>
                  <div className="mt-3 space-y-2">
                    <p className="text-gray-500">
                      Thứ Hai - Thứ Sáu: 8:00 - 17:30
                    </p>
                    <p className="text-gray-500">Thứ Bảy: 8:00 - 12:00</p>
                    <p className="text-gray-500">Chủ Nhật: Đóng cửa</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Theo dõi chúng tôi</h3>
                  <div className="mt-3 flex space-x-4">
                    <a href="#" className="text-gray-500 hover:text-[#3db87a]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#3db87a]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#3db87a]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-bold mb-4">
                  Gửi tin nhắn cho chúng tôi
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Nhập họ và tên của bạn"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Nhập địa chỉ email của bạn"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Tiêu đề</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Nhập tiêu đề tin nhắn"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Tin nhắn</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Nhập nội dung tin nhắn của bạn"
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#3db87a] hover:bg-[#35a46c]"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Gửi tin nhắn
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2025 Công ty ADA. Tất cả các quyền được bảo lưu.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Điều khoản dịch vụ
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Chính sách bảo mật
          </Link>
        </nav>
      </footer>
    </div>
  )
}

const featuredJobs = [
  {
    id: 1,
    title: "Kỹ sư phần mềm cao cấp",
    location: "Hà Nội, Việt Nam",
    type: "Toàn thời gian",
    description:
      "Chúng tôi đang tìm kiếm một kỹ sư phần mềm có kinh nghiệm để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi.",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    id: 2,
    title: "Nhà thiết kế UX/UI",
    location: "Làm việc từ xa",
    type: "Toàn thời gian",
    description:
      "Tham gia đội ngũ thiết kế của chúng tôi để tạo ra trải nghiệm người dùng đẹp và trực quan cho các sản phẩm của chúng tôi.",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
  },
  {
    id: 3,
    title: "Quản lý sản phẩm",
    location: "Hà Nội, Việt Nam",
    type: "Toàn thời gian",
    description:
      "Dẫn dắt quá trình phát triển sản phẩm từ ý tưởng đến ra mắt, làm việc chặt chẽ với các đội ngũ chức năng.",
    skills: ["Product Strategy", "Agile", "Market Research", "Roadmapping"],
  },
  {
    id: 4,
    title: "Chuyên gia phân tích dữ liệu",
    location: "Hà Nội, Việt Nam",
    type: "Toàn thời gian",
    description:
      "Phân tích các bộ dữ liệu phức tạp để thúc đẩy quyết định kinh doanh và cải tiến sản phẩm.",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
  },
]
