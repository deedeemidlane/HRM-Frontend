import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Plus,
  Users,
  Clock,
  FileEdit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
} from "lucide-react"

export default function RecruitmentManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tin tuyển dụng</h1>
          <p className="text-muted-foreground">
            Quản lý tin tuyển dụng và thông tin tuyển dụng.
          </p>
        </div>
        <Button className="bg-[#3db87a] hover:bg-[#35a46c]" asChild>
          <Link href="/dashboard/recruitment/create">
            <Plus className="h-4 w-4" />
            Đăng tin
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách tin tuyển dụng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {allJobs.map((job) => (
            <div key={job.id} className="rounded-lg border bg-white p-6">
              <div className="space-y-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 text-[#3db87a] hover:text-[#3db87a]"
                    >
                      <Eye className="h-4 w-4" />
                      Ẩn
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 text-blue-600 hover:text-blue-600"
                    >
                      <FileEdit className="h-4 w-4" />
                      Chỉnh sửa
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 text-red-600 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Xoá
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4 text-[#3db87a]" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4 text-[#3db87a]" />
                    <span>{job.salaryRange}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4 text-[#3db87a]" />
                    <span>{job.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4 text-[#3db87a]" />
                    <span>Lượt ứng tuyển: {job.applicants}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

const jobs = [
  {
    id: 1,
    position: "Lập Trình Viên ASP.Net, C# (Intern, Fresher)",
    location: "Hà Nội",
    salaryRange: "5 - 10 triệu",
    deadline: "01/04/2025",
    applicants: 2,
    status: "Active",
  },
  {
    id: 2,
    position: "Ruby On Rails Developer",
    location: "Hà Nội",
    salaryRange: "Thỏa thuận",
    deadline: "04/04/2025",
    applicants: 2,
    status: "Active",
  },
  {
    id: 3,
    position: "Full-Stack Web Developer",
    location: "Hà Nội",
    salaryRange: "15 - 40 triệu",
    deadline: "08/05/2025",
    applicants: 2,
    status: "Active",
  },
  {
    id: 4,
    position: "Android Developer (Fluent In English)",
    location: "Hà Nội",
    salaryRange: "25 - 50 triệu",
    deadline: "08/04/2025",
    applicants: 1,
    status: "Active",
  },
]

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
    applicants: 1,
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
    applicants: 2,
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
    applicants: 2,
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
    applicants: 0,
  },
]
