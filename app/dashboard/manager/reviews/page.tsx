import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Calendar, FileText, Plus, Star } from "lucide-react"

// Dữ liệu mẫu cho đánh giá nhân viên
const employeeReviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    reviewPeriod: "Q2/2023",
    lastReview: "15/06/2023",
    nextReview: "15/09/2023",
    overallRating: 4.5,
    status: "Đã hoàn thành",
  },
  {
    id: 2,
    name: "Trần Thị B",
    position: "Nhà thiết kế",
    department: "Marketing",
    reviewPeriod: "Q2/2023",
    lastReview: "10/06/2023",
    nextReview: "10/09/2023",
    overallRating: 4.2,
    status: "Đã hoàn thành",
  },
  {
    id: 3,
    name: "Lê Văn C",
    position: "Quản lý dự án",
    department: "Kỹ thuật",
    reviewPeriod: "Q2/2023",
    lastReview: "-",
    nextReview: "20/06/2023",
    overallRating: 0,
    status: "Đang chờ",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    position: "Kế toán",
    department: "Tài chính",
    reviewPeriod: "Q2/2023",
    lastReview: "05/06/2023",
    nextReview: "05/09/2023",
    overallRating: 3.8,
    status: "Đã hoàn thành",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    position: "Lập trình viên",
    department: "Kỹ thuật",
    reviewPeriod: "Q2/2023",
    lastReview: "-",
    nextReview: "25/06/2023",
    overallRating: 0,
    status: "Đang chờ",
  },
]

// Dữ liệu mẫu cho mẫu đánh giá
const reviewTemplates = [
  {
    id: 1,
    name: "Đánh giá nhân viên kỹ thuật",
    description: "Mẫu đánh giá cho nhân viên kỹ thuật và phát triển",
    lastUpdated: "01/05/2023",
    categories: [
      "Kỹ năng kỹ thuật",
      "Làm việc nhóm",
      "Giải quyết vấn đề",
      "Sáng tạo",
    ],
  },
  {
    id: 2,
    name: "Đánh giá nhân viên marketing",
    description: "Mẫu đánh giá cho nhân viên marketing và sáng tạo",
    lastUpdated: "05/05/2023",
    categories: [
      "Kỹ năng sáng tạo",
      "Hiệu quả chiến dịch",
      "Làm việc nhóm",
      "Giao tiếp",
    ],
  },
  {
    id: 3,
    name: "Đánh giá quản lý",
    description: "Mẫu đánh giá cho các vị trí quản lý",
    lastUpdated: "10/05/2023",
    categories: ["Lãnh đạo", "Quản lý nhóm", "Lập kế hoạch", "Ra quyết định"],
  },
]

// Hàm tạo sao đánh giá
function RatingStars({ rating }: { rating: number }) {
  if (rating === 0) return <span className="text-gray-400">Chưa đánh giá</span>

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < fullStars
              ? "text-yellow-400 fill-yellow-400"
              : i === fullStars && hasHalfStar
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Đánh giá nhân viên
        </h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="q2-2023">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn kỳ đánh giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q2-2023">Q2/2023</SelectItem>
              <SelectItem value="q1-2023">Q1/2023</SelectItem>
              <SelectItem value="q4-2022">Q4/2022</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
            <Plus className="mr-2 h-4 w-4" /> Tạo đánh giá mới
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số đánh giá
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">5 đánh giá đang chờ</p>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>Tiến độ</span>
                <span>66%</span>
              </div>
              <Progress value={66} className="h-2 w-full bg-gray-200" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Điểm đánh giá trung bình
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <div className="mt-1">
              <RatingStars rating={4.2} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              +0.3 so với kỳ trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Đánh giá sắp tới
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Trong 7 ngày tới</p>
            <div className="mt-4 space-y-1">
              <div className="text-xs">
                <span className="font-medium">20/06:</span> Lê Văn C
              </div>
              <div className="text-xs">
                <span className="font-medium">25/06:</span> Hoàng Văn E
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách đánh giá nhân viên</CardTitle>
          <CardDescription>
            Quản lý và theo dõi đánh giá nhân viên trong bộ phận của bạn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Kỳ đánh giá</TableHead>
                <TableHead>Đánh giá gần nhất</TableHead>
                <TableHead>Đánh giá tiếp theo</TableHead>
                <TableHead>Xếp hạng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.name}</TableCell>
                  <TableCell>{review.position}</TableCell>
                  <TableCell>{review.department}</TableCell>
                  <TableCell>{review.reviewPeriod}</TableCell>
                  <TableCell>{review.lastReview}</TableCell>
                  <TableCell>{review.nextReview}</TableCell>
                  <TableCell>
                    <RatingStars rating={review.overallRating} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        review.status === "Đã hoàn thành"
                          ? "success"
                          : "outline"
                      }
                    >
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {review.status === "Đang chờ" ? (
                      <Button
                        size="sm"
                        className="bg-[#3db87a] hover:bg-[#35a46c]"
                      >
                        Đánh giá
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        Xem chi tiết
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Mẫu đánh giá</CardTitle>
            <CardDescription>
              Các mẫu đánh giá được sử dụng trong tổ chức.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Tạo mẫu mới
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên mẫu</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Cập nhật lần cuối</TableHead>
                <TableHead>Danh mục đánh giá</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviewTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.description}</TableCell>
                  <TableCell>{template.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {template.categories.map((category, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Chỉnh sửa
                      </Button>
                      <Button variant="outline" size="sm">
                        Sử dụng
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
