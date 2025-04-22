"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Trong một ứng dụng thực tế, đây sẽ là một API call để xác thực
      // Cho mục đích demo, chúng ta sẽ sử dụng một kiểm tra đơn giản
      if (formData.email === "admin@ada.com" && formData.password === "password") {
        // Giả lập độ trễ API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.push("/dashboard")
      } else {
        setError("Email hoặc mật khẩu không hợp lệ")
      }
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
        <Link
          href="/"
          className="absolute left-4 top-4 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 md:left-8 md:top-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại trang chủ
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold">Đăng nhập vào ADA HR</h1>
            <p className="text-sm text-gray-500">Nhập thông tin đăng nhập để truy cập vào bảng điều khiển quản lý</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Đăng nhập quản lý</CardTitle>
              <CardDescription>Truy cập quản lý nhân viên và tuyển dụng</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Link href="/forgot-password" className="text-xs text-[#3db87a] hover:underline">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {error && <div className="text-sm font-medium text-red-500">{error}</div>}
                <Button type="submit" className="w-full bg-[#3db87a] hover:bg-[#35a46c]" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="mt-2 text-xs text-gray-500 text-center">
                Cho mục đích demo, sử dụng: <br />
                Email: admin@ada.com <br />
                Mật khẩu: password
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
