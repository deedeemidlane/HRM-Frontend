import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Clock } from "lucide-react"

export default function JobsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-2xl text-[#3db87a]">ADA</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Trang chủ
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#about">
            Giới thiệu
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/jobs">
            Tuyển dụng
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#contact">
            Liên hệ
          </Link>
        </nav>
        <div className="ml-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Đăng nhập</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8faf9]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Cơ hội nghề nghiệp tại ADA</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tham gia đội ngũ của chúng tôi và cùng xây dựng tương lai. Khám phá các vị trí đang mở và tìm cơ hội
                  tiếp theo của bạn.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Lọc công việc</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="search"
                      >
                        Tìm kiếm
                      </label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input className="pl-8" id="search" placeholder="Tìm kiếm công việc..." type="search" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Phòng ban
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tất cả phòng ban" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả phòng ban</SelectItem>
                          <SelectItem value="engineering">Kỹ thuật</SelectItem>
                          <SelectItem value="design">Thiết kế</SelectItem>
                          <SelectItem value="product">Sản phẩm</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Kinh doanh</SelectItem>
                          <SelectItem value="hr">Nhân sự</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Địa điểm
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tất cả địa điểm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả địa điểm</SelectItem>
                          <SelectItem value="remote">Làm việc từ xa</SelectItem>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                          <SelectItem value="danang">Đà Nẵng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Loại công việc
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tất cả loại" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tất cả loại</SelectItem>
                          <SelectItem value="full-time">Toàn thời gian</SelectItem>
                          <SelectItem value="part-time">Bán thời gian</SelectItem>
                          <SelectItem value="contract">Hợp đồng</SelectItem>
                          <SelectItem value="internship">Thực tập</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-[#3db87a] hover:bg-[#35a46c]">Áp dụng bộ lọc</Button>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Vị trí đang tuyển</h2>
                  <p className="text-sm text-gray-500">{allJobs.length} công việc tìm thấy</p>
                </div>
                <div className="space-y-4">
                  {allJobs.map((job) => (
                    <div key={job.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{job.type}</span>
                            </div>
                            <span className="inline-flex items-center rounded-md bg-[#edf7f2] px-2 py-1 text-xs font-medium text-[#3db87a]">
                              {job.department}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-500">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button className="bg-[#3db87a] hover:bg-[#35a46c]" asChild>
                            <Link href={`/jobs/${job.id}`}>Xem chi tiết</Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href={`/jobs/${job.id}`}>Ứng tuyển ngay</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 Công ty ADA. Tất cả các quyền được bảo lưu.</p>
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

const allJobs = [
  {
    id: 1,
    title: "Kỹ sư phần mềm cao cấp",
    location: "Hà Nội, Việt Nam",
    type: "Toàn thời gian",
    department: "Kỹ thuật",
    description:
      "Chúng tôi đang tìm kiếm một kỹ sư phần mềm có kinh nghiệm để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi.",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    id: 2,
    title: "Nhà thiết kế UX/UI",
    location: "Làm việc từ xa",
    type: "Toàn thời gian",
    department: "Thiết kế",
    description:
      "Tham gia đội ngũ thiết kế của chúng tôi để tạo ra trải nghiệm người dùng đẹp và trực quan cho các sản phẩm của chúng tôi.",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
  },
  {
    id: 3,
    title: "Quản lý sản phẩm",
    location: "Hồ Chí Minh, Việt Nam",
    type: "Toàn thời gian",
    department: "Sản phẩm",
    description:
      "Dẫn dắt quá trình phát triển sản phẩm từ ý tưởng đến ra mắt, làm việc chặt chẽ với các đội ngũ chức năng.",
    skills: ["Product Strategy", "Agile", "Market Research", "Roadmapping"],
  },
  {
    id: 4,
    title: "Chuyên gia phân tích dữ liệu",
    location: "Hà Nội, Việt Nam",
    type: "Toàn thời gian",
    department: "Kỹ thuật",
    description: "Phân tích các bộ dữ liệu phức tạp để thúc đẩy quyết định kinh doanh và cải tiến sản phẩm.",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
  },
  {
    id: 5,
    title: "Chuyên viên Marketing",
    location: "Làm việc từ xa",
    type: "Toàn thời gian",
    department: "Marketing",
    description:
      "Phát triển và thực hiện các chiến dịch marketing để thúc đẩy nhận thức về thương hiệu và thu hút khách hàng.",
    skills: ["Digital Marketing", "Content Creation", "Social Media", "Analytics"],
  },
  {
    id: 6,
    title: "Điều phối viên nhân sự",
    location: "Hà Nội, Việt Nam",
    type: "Toàn thời gian",
    department: "Nhân sự",
    description:
      "Hỗ trợ đội ngũ nhân sự trong các hoạt động hàng ngày, bao gồm tuyển dụng, onboarding và quan hệ nhân viên.",
    skills: ["Recruitment", "Onboarding", "Employee Relations", "HRIS"],
  },
  {
    id: 7,
    title: "Lập trình viên Frontend",
    location: "Hồ Chí Minh, Việt Nam",
    type: "Toàn thời gian",
    department: "Kỹ thuật",
    description: "Xây dựng giao diện người dùng đáp ứng và dễ tiếp cận cho các ứng dụng web của chúng tôi.",
    skills: ["React", "JavaScript", "HTML", "CSS"],
  },
  {
    id: 8,
    title: "Lập trình viên Backend",
    location: "Hà Nội, Việt Nam",
    type: "Toàn thời gian",
    department: "Kỹ thuật",
    description:
      "Thiết kế và triển khai các hệ thống backend có khả năng mở rộng và bảo mật cho các ứng dụng của chúng tôi.",
    skills: ["Node.js", "Python", "SQL", "API Design"],
  },
]
