"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Save,
  Upload,
  Lock,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thông tin cá nhân</h1>
          <p className="text-muted-foreground">Xem và cập nhật thông tin cá nhân của bạn.</p>
        </div>
        <Button
          className={isEditing ? "bg-gray-200 hover:bg-gray-300 text-gray-800" : "bg-[#3db87a] hover:bg-[#35a46c]"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
        <Card className="md:row-span-2">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="Nguyễn Văn An" />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">Nguyễn Văn An</CardTitle>
              <CardDescription>Senior Developer</CardDescription>
              <Badge className="mt-2 bg-[#edf7f2] text-[#3db87a]">Đang làm việc</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>an.nguyen@ada.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>0912 345 678</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Hà Nội, Việt Nam</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Ngày vào làm: 10/01/2022</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>Phòng ban: Kỹ thuật</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {isEditing ? (
              <div className="w-full space-y-2">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Thay đổi ảnh đại diện
                </Button>
                <Button variant="outline" className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Đổi mật khẩu
                </Button>
              </div>
            ) : null}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Tabs defaultValue="personal">
              <TabsList>
                <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
                <TabsTrigger value="work">Thông tin công việc</TabsTrigger>
                <TabsTrigger value="education">Học vấn & Kỹ năng</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal">
              <TabsContent value="personal" className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Họ và tên</Label>
                        <Input id="fullName" defaultValue="Nguyễn Văn An" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Ngày sinh</Label>
                        <Input id="dob" type="date" defaultValue="1990-05-15" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="an.nguyen@ada.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input id="phone" defaultValue="0912 345 678" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Input id="address" defaultValue="Hà Nội, Việt Nam" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Liên hệ khẩn cấp</Label>
                      <Input id="emergencyContact" defaultValue="Nguyễn Thị B - 0987 654 321" />
                    </div>
                    <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
                      <Save className="mr-2 h-4 w-4" />
                      Lưu thông tin
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Họ và tên</h3>
                        <p>Nguyễn Văn An</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Ngày sinh</h3>
                        <p>15/05/1990</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                        <p>an.nguyen@ada.com</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Số điện thoại</h3>
                        <p>0912 345 678</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Địa chỉ</h3>
                      <p>Hà Nội, Việt Nam</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Liên hệ khẩn cấp</h3>
                      <p>Nguyễn Thị B - 0987 654 321</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="work" className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="department">Phòng ban</Label>
                        <Select defaultValue="tech">
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn phòng ban" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">Kỹ thuật</SelectItem>
                            <SelectItem value="hr">Nhân sự</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="sales">Kinh doanh</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Chức vụ</Label>
                        <Select defaultValue="senior">
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn chức vụ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="intern">Thực tập sinh</SelectItem>
                            <SelectItem value="junior">Junior Developer</SelectItem>
                            <SelectItem value="senior">Senior Developer</SelectItem>
                            <SelectItem value="lead">Team Lead</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Kỹ năng</Label>
                      <Textarea id="skills" defaultValue="JavaScript, TypeScript, React, Node.js, Next.js" />
                    </div>
                    <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
                      <Save className="mr-2 h-4 w-4" />
                      Lưu thông tin
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Phòng ban</h3>
                        <p>Kỹ thuật</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Chức vụ</h3>
                        <p>Senior Developer</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Kỹ năng</h3>
                      <p>JavaScript, TypeScript, React, Node.js, Next.js</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Ngày vào làm</h3>
                      <p>10/01/2022</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Quản lý trực tiếp</h3>
                      <p>Lê Văn Cường - Team Lead</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="education" className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="education">Học vấn</Label>
                      <Textarea
                        id="education"
                        defaultValue="Đại học Bách Khoa Hà Nội - Kỹ sư Công nghệ thông tin (2012-2016)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certificates">Chứng chỉ</Label>
                      <Textarea
                        id="certificates"
                        defaultValue="AWS Certified Developer - Associate (2021)
Microsoft Certified: Azure Developer Associate (2022)"
                      />
                    </div>
                    <Button className="bg-[#3db87a] hover:bg-[#35a46c]">
                      <Save className="mr-2 h-4 w-4" />
                      Lưu thông tin
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Học vấn</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-start gap-2">
                          <GraduationCap className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Đại học Bách Khoa Hà Nội</p>
                            <p className="text-sm text-muted-foreground">Kỹ sư Công nghệ thông tin (2012-2016)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Chứng chỉ</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-start gap-2">
                          <Award className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">AWS Certified Developer - Associate</p>
                            <p className="text-sm text-muted-foreground">2021</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Award className="mt-0.5 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Microsoft Certified: Azure Developer Associate</p>
                            <p className="text-sm text-muted-foreground">2022</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tài liệu cá nhân</CardTitle>
            <CardDescription>Các tài liệu liên quan đến công việc và cá nhân</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Hợp đồng lao động</p>
                    <p className="text-sm text-muted-foreground">Cập nhật: 10/01/2022</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Xem
                </Button>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Bảng lương tháng 3/2025</p>
                    <p className="text-sm text-muted-foreground">Cập nhật: 05/04/2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Xem
                </Button>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Đánh giá hiệu suất Q1/2025</p>
                    <p className="text-sm text-muted-foreground">Cập nhật: 15/04/2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Xem
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Chứng chỉ AWS</p>
                    <p className="text-sm text-muted-foreground">Cập nhật: 20/06/2021</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Xem
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
