"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Calendar,
  FileText,
  DollarSign,
  UserPlus,
  CheckCircle,
  Clock,
  Trash2,
  MailOpen,
  Filter,
} from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications)

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thông báo</h1>
          <p className="text-muted-foreground">Xem các thông báo và cập nhật từ hệ thống.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Lọc
          </Button>
          <Button className="bg-[#3db87a] hover:bg-[#35a46c]" onClick={markAllAsRead}>
            <MailOpen className="mr-2 h-4 w-4" />
            Đánh dấu tất cả đã đọc
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Thông báo của bạn</CardTitle>
            {unreadCount > 0 && <Badge className="bg-[#3db87a]">{unreadCount} chưa đọc</Badge>}
          </div>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              <TabsTrigger value="unread">Chưa đọc</TabsTrigger>
              <TabsTrigger value="system">Hệ thống</TabsTrigger>
              <TabsTrigger value="hr">Nhân sự</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsContent value="all" className="space-y-4">
              {notifications.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed">
                  <Bell className="h-10 w-10 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">Không có thông báo nào</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 rounded-lg border p-4 ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className={`rounded-full p-2 ${notification.iconBg}`}>{notification.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          {!notification.read && (
                            <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                              <MailOpen className="mr-2 h-3 w-3" />
                              Đánh dấu đã đọc
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="mr-2 h-3 w-3" />
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="unread" className="space-y-4">
              {notifications.filter((n) => !n.read).length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed">
                  <CheckCircle className="h-10 w-10 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">Không có thông báo chưa đọc</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications
                    .filter((notification) => !notification.read)
                    .map((notification) => (
                      <div key={notification.id} className="flex items-start gap-4 rounded-lg border bg-muted/50 p-4">
                        <div className={`rounded-full p-2 ${notification.iconBg}`}>{notification.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{notification.title}</p>
                              <p className="text-sm text-muted-foreground">{notification.description}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                              <MailOpen className="mr-2 h-3 w-3" />
                              Đánh dấu đã đọc
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="mr-2 h-3 w-3" />
                              Xóa
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="system" className="space-y-4">
              {/* Similar content for system notifications */}
            </TabsContent>
            <TabsContent value="hr" className="space-y-4">
              {/* Similar content for HR notifications */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cài đặt thông báo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">Thông báo email</p>
                <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
              </div>
              <div className="flex h-6 items-center">
                <input
                  id="email-notifications"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#3db87a] focus:ring-[#3db87a]"
                  defaultChecked
                />
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">Thông báo hệ thống</p>
                <p className="text-sm text-muted-foreground">Nhận thông báo từ hệ thống</p>
              </div>
              <div className="flex h-6 items-center">
                <input
                  id="system-notifications"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#3db87a] focus:ring-[#3db87a]"
                  defaultChecked
                />
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">Thông báo lương</p>
                <p className="text-sm text-muted-foreground">Nhận thông báo về lương và phúc lợi</p>
              </div>
              <div className="flex h-6 items-center">
                <input
                  id="salary-notifications"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#3db87a] focus:ring-[#3db87a]"
                  defaultChecked
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo nghỉ phép</p>
                <p className="text-sm text-muted-foreground">Nhận thông báo về đơn nghỉ phép</p>
              </div>
              <div className="flex h-6 items-center">
                <input
                  id="leave-notifications"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#3db87a] focus:ring-[#3db87a]"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const allNotifications = [
  {
    id: 1,
    title: "Họp toàn công ty",
    description: "Họp toàn công ty vào thứ 6, ngày 26/04/2025 lúc 15:00.",
    time: "2 giờ trước",
    read: false,
    type: "system",
    icon: <Calendar className="h-4 w-4 text-white" />,
    iconBg: "bg-blue-500",
  },
  {
    id: 2,
    title: "Bảng lương tháng 3/2025",
    description: "Bảng lương tháng 3/2025 đã được cập nhật. Vui lòng kiểm tra.",
    time: "1 ngày trước",
    read: false,
    type: "hr",
    icon: <DollarSign className="h-4 w-4 text-white" />,
    iconBg: "bg-green-500",
  },
  {
    id: 3,
    title: "Đơn nghỉ phép đã được duyệt",
    description: "Đơn nghỉ phép của bạn vào ngày 20/04/2025 đã được duyệt.",
    time: "2 ngày trước",
    read: true,
    type: "hr",
    icon: <CheckCircle className="h-4 w-4 text-white" />,
    iconBg: "bg-green-500",
  },
  {
    id: 4,
    title: "Nhân viên mới",
    description: "Chào mừng Nguyễn Thị Mai đã gia nhập phòng Marketing.",
    time: "3 ngày trước",
    read: true,
    type: "system",
    icon: <UserPlus className="h-4 w-4 text-white" />,
    iconBg: "bg-purple-500",
  },
  {
    id: 5,
    title: "Đánh giá hiệu suất Q1/2025",
    description: "Đánh giá hiệu suất Q1/2025 đã được cập nhật. Vui lòng xem và xác nhận.",
    time: "1 tuần trước",
    read: false,
    type: "hr",
    icon: <FileText className="h-4 w-4 text-white" />,
    iconBg: "bg-amber-500",
  },
  {
    id: 6,
    title: "Nhắc nhở chấm công",
    description: "Bạn chưa check-out ngày 15/04/2025. Vui lòng điều chỉnh công.",
    time: "1 tuần trước",
    read: true,
    type: "system",
    icon: <Clock className="h-4 w-4 text-white" />,
    iconBg: "bg-red-500",
  },
]
