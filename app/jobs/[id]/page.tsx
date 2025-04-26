// "use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Calendar, ArrowLeft, BriefcaseIcon } from "lucide-react"
import { JobApplicationModal } from "@/components/job-application-modal"
import { HomeHeader } from "@/components/home-header"

interface JobDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params
  const job = allJobs.find((job) => job.id === Number.parseInt(id))

  if (!job) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">Không tìm thấy công việc</h1>
        <p className="mt-4 text-muted-foreground">
          Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/jobs">Quay lại danh sách công việc</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />
      <main className="flex-1">
        <div className="container px-4 md:px-6 mx-auto pb-10 pt-4">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/jobs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại danh sách công việc
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <BriefcaseIcon className="h-4 w-4" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{job.salaryRange}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Hạn nộp: {job.deadline}</span>
              </div>
              <Badge className="bg-[#edf7f2] text-[#3db87a]">
                {job.department}
              </Badge>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-bold">Mô tả công việc</h2>
                <div className="mt-4 space-y-4">
                  <p>{job.description}</p>
                  <h3 className="font-bold">Trách nhiệm công việc:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-bold">Yêu cầu ứng viên</h2>
                <div className="mt-4 space-y-4">
                  <h3 className="font-bold">Kỹ năng & Kinh nghiệm:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-bold">Quyền lợi</h2>
                <div className="mt-4 space-y-4">
                  <ul className="list-disc pl-5 space-y-1">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6 sticky top-6">
                <h2 className="text-xl font-bold">Ứng tuyển ngay</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Hãy nộp hồ sơ của bạn để ứng tuyển vị trí {job.title} tại ADA.
                </p>
                <div className="mt-6 space-y-4">
                  <JobApplicationModal jobTitle={job.title} />
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/jobs">Xem các vị trí khác</Link>
                  </Button>
                </div>
                <div className="mt-6 rounded-lg bg-muted p-4">
                  <h3 className="font-medium">Thông tin liên hệ</h3>
                  <p className="mt-2 text-sm">
                    Email:{" "}
                    <span className="font-medium">tuyendung@ada.com</span>
                  </p>
                  <p className="mt-1 text-sm">
                    Điện thoại:{" "}
                    <span className="font-medium">(+84) 123 456 789</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2023 Công ty ADA. Tất cả các quyền được bảo lưu.
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

const allJobs = [
  {
    id: 1,
    title: "Kỹ sư phần mềm cao cấp",
    location: "Hà Nội, Việt Nam",
    type: "Toàn thời gian",
    department: "Kỹ thuật",
    salaryRange: "20 - 30 triệu VNĐ",
    deadline: "15/05/2025",
    description:
      "Chúng tôi đang tìm kiếm một kỹ sư phần mềm cao cấp có kinh nghiệm để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi. Bạn sẽ làm việc với các công nghệ hiện đại để xây dựng các giải pháp sáng tạo cho khách hàng.",
    responsibilities: [
      "Phát triển và duy trì các ứng dụng web sử dụng React, Node.js và các công nghệ hiện đại khác",
      "Thiết kế và triển khai các API RESTful",
      "Tối ưu hóa hiệu suất ứng dụng và đảm bảo khả năng mở rộng",
      "Cộng tác với các nhóm sản phẩm và thiết kế để đảm bảo chất lượng và tính nhất quán",
      "Tham gia vào quá trình đánh giá code và cải thiện chất lượng code",
    ],
    requirements: [
      "Tối thiểu 5 năm kinh nghiệm phát triển phần mềm",
      "Thành thạo JavaScript/TypeScript, React, Node.js",
      "Kinh nghiệm với cơ sở dữ liệu SQL và NoSQL",
      "Hiểu biết sâu về các nguyên tắc thiết kế phần mềm và mẫu thiết kế",
      "Kỹ năng giao tiếp và làm việc nhóm tốt",
      "Kinh nghiệm với AWS hoặc các nền tảng đám mây khác là một lợi thế",
    ],
    benefits: [
      "Mức lương cạnh tranh và thưởng hiệu suất",
      "Bảo hiểm sức khỏe toàn diện cho nhân viên và gia đình",
      "Chế độ nghỉ phép linh hoạt",
      "Môi trường làm việc năng động và sáng tạo",
      "Cơ hội học tập và phát triển chuyên môn",
      "Các hoạt động team building và sự kiện công ty thường xuyên",
    ],
    skills: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    id: 2,
    title: "Nhà thiết kế UX/UI",
    location: "Làm việc từ xa",
    type: "Toàn thời gian",
    department: "Thiết kế",
    salaryRange: "15 - 25 triệu VNĐ",
    deadline: "20/05/2025",
    description:
      "Chúng tôi đang tìm kiếm một nhà thiết kế UX/UI tài năng để tham gia vào đội ngũ thiết kế của chúng tôi. Bạn sẽ chịu trách nhiệm tạo ra các trải nghiệm người dùng hấp dẫn và trực quan cho các sản phẩm của chúng tôi.",
    responsibilities: [
      "Thiết kế giao diện người dùng cho các ứng dụng web và di động",
      "Tạo wireframes, prototypes và mockups",
      "Thực hiện nghiên cứu người dùng và phân tích dữ liệu",
      "Cộng tác với các nhà phát triển để đảm bảo triển khai chính xác",
      "Duy trì và phát triển hệ thống thiết kế",
    ],
    requirements: [
      "Tối thiểu 3 năm kinh nghiệm thiết kế UX/UI",
      "Thành thạo Figma, Adobe XD hoặc các công cụ thiết kế tương tự",
      "Kinh nghiệm với nghiên cứu người dùng và thiết kế dựa trên dữ liệu",
      "Hiểu biết về nguyên tắc thiết kế web và di động",
      "Portfolio thể hiện kỹ năng thiết kế và giải quyết vấn đề",
      "Kỹ năng giao tiếp và thuyết trình tốt",
    ],
    benefits: [
      "Mức lương cạnh tranh và thưởng hiệu suất",
      "Bảo hiểm sức khỏe toàn diện",
      "Chế độ làm việc linh hoạt và từ xa",
      "Ngân sách cho các công cụ và khóa học thiết kế",
      "Cơ hội tham gia các hội thảo và sự kiện thiết kế",
      "Môi trường làm việc sáng tạo và hỗ trợ",
    ],
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
  },
  {
    id: 3,
    title: "Quản lý sản phẩm",
    location: "Hà Nội, Việt Nam",
    type: "Toàn thời gian",
    department: "Sản phẩm",
    salaryRange: "25 - 40 triệu VNĐ",
    deadline: "10/05/2025",
    description:
      "Chúng tôi đang tìm kiếm một Quản lý sản phẩm có kinh nghiệm để dẫn dắt quá trình phát triển sản phẩm từ ý tưởng đến ra mắt. Bạn sẽ làm việc chặt chẽ với các đội ngũ chức năng khác nhau để đảm bảo sản phẩm đáp ứng nhu cầu của người dùng và mục tiêu kinh doanh.",
    responsibilities: [
      "Xác định và ưu tiên các tính năng sản phẩm dựa trên nghiên cứu thị trường và phản hồi của người dùng",
      "Phát triển lộ trình sản phẩm và chiến lược dài hạn",
      "Làm việc với các đội ngũ kỹ thuật, thiết kế và tiếp thị để đảm bảo thực hiện thành công",
      "Phân tích dữ liệu sản phẩm để đưa ra quyết định dựa trên dữ liệu",
      "Quản lý vòng đời sản phẩm từ ý tưởng đến ra mắt và cải tiến liên tục",
    ],
    requirements: [
      "Tối thiểu 4 năm kinh nghiệm quản lý sản phẩm",
      "Kinh nghiệm với phương pháp Agile và công cụ quản lý sản phẩm",
      "Kỹ năng phân tích dữ liệu mạnh mẽ",
      "Hiểu biết về UX và nguyên tắc thiết kế",
      "Kỹ năng giao tiếp, thuyết trình và đàm phán xuất sắc",
      "Bằng cấp trong lĩnh vực kinh doanh, kỹ thuật hoặc lĩnh vực liên quan",
    ],
    benefits: [
      "Mức lương cạnh tranh và thưởng hiệu suất",
      "Bảo hiểm sức khỏe toàn diện cho nhân viên và gia đình",
      "Chế độ nghỉ phép linh hoạt",
      "Cơ hội học tập và phát triển chuyên môn",
      "Môi trường làm việc năng động và sáng tạo",
      "Cơ hội tham gia vào các dự án có tác động lớn",
    ],
    skills: ["Product Strategy", "Agile", "Market Research", "Roadmapping"],
  },
  {
    id: 4,
    title: "Chuyên gia phân tích dữ liệu",
    location: "Hà Nội, Việt Nam",
    type: "Toàn thời gian",
    department: "Kỹ thuật",
    salaryRange: "18 - 30 triệu VNĐ",
    deadline: "25/05/2025",
    description:
      "Chúng tôi đang tìm kiếm một Chuyên gia phân tích dữ liệu để phân tích các bộ dữ liệu phức tạp và cung cấp thông tin chi tiết có giá trị cho việc ra quyết định kinh doanh và cải tiến sản phẩm.",
    responsibilities: [
      "Phân tích dữ liệu phức tạp để xác định xu hướng và mẫu",
      "Phát triển và duy trì các bảng điều khiển và báo cáo",
      "Cộng tác với các bên liên quan để xác định nhu cầu dữ liệu",
      "Thực hiện phân tích thống kê và xây dựng mô hình dự đoán",
      "Trình bày kết quả phân tích cho các bên liên quan không chuyên về kỹ thuật",
    ],
    requirements: [
      "Tối thiểu 3 năm kinh nghiệm phân tích dữ liệu",
      "Thành thạo Python, SQL và các công cụ trực quan hóa dữ liệu",
      "Kinh nghiệm với các kỹ thuật học máy và phân tích thống kê",
      "Kỹ năng giải quyết vấn đề và tư duy phân tích mạnh mẽ",
      "Kỹ năng giao tiếp và thuyết trình tốt",
      "Bằng cấp trong lĩnh vực Khoa học dữ liệu, Thống kê hoặc lĩnh vực liên quan",
    ],
    benefits: [
      "Mức lương cạnh tranh và thưởng hiệu suất",
      "Bảo hiểm sức khỏe toàn diện",
      "Chế độ nghỉ phép linh hoạt",
      "Ngân sách cho các công cụ và khóa học",
      "Cơ hội tham gia các hội thảo và sự kiện",
      "Môi trường làm việc hỗ trợ và thách thức",
    ],
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
  },
]
