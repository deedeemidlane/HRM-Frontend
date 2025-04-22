"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun, Laptop, Save, Shield, LogOut } from "lucide-react"

export default function SettingsPage() {
  const [theme, setTheme] = useState("light")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
          <p className="text-muted-foreground">Quản lý cài đặt tài khoản và tùy chọn của bạn.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Tài khoản</TabsTrigger>
              <TabsTrigger value="password">Mật khẩu</TabsTrigger>
              <TabsTrigger value="notifications">Thông báo</TabsTrigger>
              <TabsTrigger value="appearance">Giao diện</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account">
            <TabsContent value="account" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name" defaultValue="Nguyễn Văn An" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="an.nguyen@ada.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Ngôn ngữ</Label>
                <Select defaultValue="vi">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Múi giờ</Label>
                <Select defaultValue="asia_ho_chi_minh">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn múi giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia_ho_chi_minh">Asia/Ho_Chi_Minh (GMT+7)</SelectItem>
                    <SelectItem value="asia_bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                    <SelectItem value="asia_singapore">Asia/Singapore (GMT+8)</SelectItem>
                    <SelectItem value="america_new_york">America/New_York (GMT-4)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="mt-4 bg-[#3db87a] hover:bg-[#35a46c]">
                <Save className="mr-2 h-4 w-4" />
                Lưu thay đổi
              </Button>
            </TabsContent>
            <TabsContent value="password" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Mật khẩu mới</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="mt-4 bg-[#3db87a] hover:bg-[#35a46c]">
                <Save className="mr-2 h-4 w-4" />
                Cập nhật mật khẩu
              </Button>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Thông báo email</Label>
                    <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser-notifications">Thông báo trình duyệt</Label>
                    <p className="text-sm text-muted-foreground">Nhận thông báo trên trình duyệt</p>
                  </div>
                  <Switch id="browser-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="salary-notifications">Thông báo lương</Label>
                    <p className="text-sm text-muted-foreground">Nhận thông báo về lương và phúc lợi</p>
                  </div>
                  <Switch id="salary-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="leave-notifications">Thông báo nghỉ phép</Label>
                    <p className="text-sm text-muted-foreground">Nhận thông báo về đơn nghỉ phép</p>
                  </div>
                  <Switch id="leave-notifications" defaultChecked />
                </div>
              </div>
              <Button className="mt-4 bg-[#3db87a] hover:bg-[#35a46c]">
                <Save className="mr-2 h-4 w-4" />
                Lưu thay đổi
              </Button>
            </TabsContent>
            <TabsContent value="appearance" className="space-y-4">
              <div className="space-y-2">
                <Label>Chế độ giao diện</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className={theme === "light" ? "bg-[#3db87a] hover:bg-[#35a46c]" : ""}
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Sáng
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className={theme === "dark" ? "bg-[#3db87a] hover:bg-[#35a46c]" : ""}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Tối
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className={theme === "system" ? "bg-[#3db87a] hover:bg-[#35a46c]" : ""}
                    onClick={() => setTheme("system")}
                  >
                    <Laptop className="mr-2 h-4 w-4" />
                    Hệ thống
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-size">Cỡ chữ</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn cỡ chữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Nhỏ</SelectItem>
                    <SelectItem value="medium">Vừa</SelectItem>
                    <SelectItem value="large">Lớn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="mt-4 bg-[#3db87a] hover:bg-[#35a46c]">
                <Save className="mr-2 h-4 w-4" />
                Lưu thay đổi
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bảo mật tài khoản</CardTitle>
          <CardDescription>Quản lý các cài đặt bảo mật cho tài khoản của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Xác thực hai yếu tố</Label>
              <p className="text-sm text-muted-foreground">Bảo vệ tài khoản của bạn với xác thực hai yếu tố</p>
            </div>
            <Switch id="two-factor" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="login-alerts">Cảnh báo đăng nhập</Label>
              <p className="text-sm text-muted-foreground">Nhận thông báo khi có đăng nhập mới vào tài khoản</p>
            </div>
            <Switch id="login-alerts" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="text-red-600">
            <Shield className="mr-2 h-4 w-4" />
            Khóa tài khoản
          </Button>
          <Button variant="outline" className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Đăng xuất khỏi tất cả thiết bị
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
