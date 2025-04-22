import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  Users,
  Clock,
  MoreHorizontal,
  FileEdit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
} from "lucide-react"

function getStatusStyle(interview) {
  return interview.status === "Scheduled"
    ? "bg-blue-100 text-blue-800"
    : interview.status === "Completed"
      ? "bg-green-100 text-green-800"
      : interview.status === "Rejected" && "bg-red-100 text-red-800"
}

export default function RecruitmentManagementPage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tin tuyển dụng</h1>
          <p className="text-muted-foreground">Quản lý tin tuyển dụng và thông tin tuyển dụng.</p>
        </div>
        <Button className="bg-[#3db87a] hover:bg-[#35a46c]" asChild>
          <Link href="/dashboard/recruitment/create">
            <Plus className="mr-2 h-4 w-4" />
            ĐĂNG TIN
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách tin tuyển dụng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-lg border bg-white p-6">
              <div className="space-y-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <h3 className="text-xl font-bold text-gray-800">{job.position}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="h-8 gap-1 text-[#3db87a] border-[#3db87a]">
                      <Eye className="h-4 w-4" />
                      ẨN
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1 text-blue-600 border-blue-600">
                      <FileEdit className="h-4 w-4" />
                      CHỈNH SỬA
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1 text-red-600 border-red-600">
                      <Trash2 className="h-4 w-4" />
                      XÓA
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
      <Card>
        <CardHeader>
          <Tabs defaultValue="jobs">
            <TabsList>
              <TabsTrigger value="jobs">Tin tuyển dụng</TabsTrigger>
              <TabsTrigger value="applications">Quản lý ứng viên</TabsTrigger>
              <TabsTrigger value="interviews">Lịch phỏng vấn</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="jobs">
            <TabsContent value="jobs" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-medium">Danh sách tin tuyển dụng</h2>
                <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
                  <Plus className="mr-2 h-4 w-4" />
                  ĐĂNG TIN
                </Button>
              </div>
              <div className="space-y-4"></div>
            </TabsContent>
            <TabsContent value="applications" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search applications..." className="w-full pl-8" />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.applicant}</TableCell>
                        <TableCell>{application.position}</TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              application.status === "Screening"
                                ? "bg-blue-100 text-blue-800"
                                : application.status === "Interview"
                                  ? "bg-purple-100 text-purple-800"
                                  : application.status === "Rejected"
                                    ? "bg-red-100 text-red-800"
                                    : application.status === "Hired"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {application.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Resume
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Schedule Interview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="interviews" className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search interviews..." className="w-full pl-8" />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Interview Date</TableHead>
                      <TableHead>Interviewer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {interviews.map((interview) => (
                      <TableRow key={interview.id}>
                        <TableCell className="font-medium">{interview.applicant}</TableCell>
                        <TableCell>{interview.position}</TableCell>
                        <TableCell>{interview.interviewDate}</TableCell>
                        <TableCell>{interview.interviewer}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusStyle(interview)}`}
                          >
                            {interview.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileEdit className="mr-2 h-4 w-4" />
                                Add Feedback
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Move to Next Round
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

const jobs = [
  {
    id: 1,
    position: "Lập Trình Viên ASP.Net, C# (Intern, Fresher)",
    location: "Bắc Giang",
    salaryRange: "5 - 10 triệu",
    deadline: "01/04/2025",
    applicants: 2,
    status: "Active",
  },
  {
    id: 2,
    position: "Ruby On Rails Developer",
    location: "Đà Nẵng",
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

const applications = [
  {
    id: 1,
    applicant: "John Smith",
    position: "Senior Software Engineer",
    appliedDate: "Apr 12, 2023",
    status: "Screening",
  },
  {
    id: 2,
    applicant: "Emily Johnson",
    position: "UX/UI Designer",
    appliedDate: "Apr 16, 2023",
    status: "Interview",
  },
  {
    id: 3,
    applicant: "Michael Brown",
    position: "Product Manager",
    appliedDate: "Apr 8, 2023",
    status: "Rejected",
  },
  {
    id: 4,
    applicant: "Sarah Davis",
    position: "Data Scientist",
    appliedDate: "Apr 21, 2023",
    status: "New",
  },
  {
    id: 5,
    applicant: "David Wilson",
    position: "Marketing Specialist",
    appliedDate: "Apr 14, 2023",
    status: "Interview",
  },
  {
    id: 6,
    applicant: "Jennifer Taylor",
    position: "HR Coordinator",
    appliedDate: "Apr 19, 2023",
    status: "Screening",
  },
  {
    id: 7,
    applicant: "Robert Martinez",
    position: "Frontend Developer",
    appliedDate: "Apr 10, 2023",
    status: "Hired",
  },
  {
    id: 8,
    applicant: "Lisa Anderson",
    position: "Backend Developer",
    appliedDate: "Apr 23, 2023",
    status: "New",
  },
]

const interviews = [
  {
    id: 1,
    applicant: "Emily Johnson",
    position: "UX/UI Designer",
    interviewDate: "Apr 25, 2023 - 10:00 AM",
    interviewer: "Alex Thompson",
    status: "Scheduled",
  },
  {
    id: 2,
    applicant: "David Wilson",
    position: "Marketing Specialist",
    interviewDate: "Apr 24, 2023 - 2:00 PM",
    interviewer: "Sarah Miller",
    status: "Scheduled",
  },
  {
    id: 3,
    applicant: "Jennifer Taylor",
    position: "HR Coordinator",
    interviewDate: "Apr 26, 2023 - 11:30 AM",
    interviewer: "Michael Clark",
    status: "Scheduled",
  },
  {
    id: 4,
    applicant: "Robert Martinez",
    position: "Frontend Developer",
    interviewDate: "Apr 18, 2023 - 1:00 PM",
    interviewer: "Jessica White",
    status: "Completed",
  },
  {
    id: 5,
    applicant: "John Smith",
    position: "Senior Software Engineer",
    interviewDate: "Apr 27, 2023 - 3:30 PM",
    interviewer: "Daniel Brown",
    status: "Scheduled",
  },
  {
    id: 6,
    applicant: "Lisa Anderson",
    position: "Backend Developer",
    interviewDate: "Apr 28, 2023 - 9:00 AM",
    interviewer: "Ryan Johnson",
    status: "Scheduled",
  },
]
