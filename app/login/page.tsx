"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import useLogin from "@/hooks/authentication/useLogin"

const loginSchema = z.object({
  email: z.string().min(1, "Email không được để trống"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { loading, login } = useLogin()

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data)
    login(data)
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
            <p className="text-sm text-gray-500">
              Nhập thông tin đăng nhập để truy cập vào bảng điều khiển quản lý
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Đăng nhập quản lý</CardTitle>
              <CardDescription>
                Truy cập quản lý nhân viên và tuyển dụng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Mật khẩu</FormLabel>
                          <Link
                            href="/forgot-password"
                            className="text-xs text-[#3db87a] hover:underline"
                          >
                            Quên mật khẩu?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* {apiError && (
                    <div className="text-sm font-medium text-red-500">
                      {apiError}
                    </div>
                  )} */}
                  <Button
                    type="submit"
                    className="w-full bg-[#3db87a] hover:bg-[#35a46c]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang đăng nhập...
                      </>
                    ) : (
                      "Đăng nhập"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col">
              {/* <p className="mt-2 text-xs text-gray-500 text-center">
                Cho mục đích demo, sử dụng: <br />
                Email: admin1 <br />
                Mật khẩu: 123456
              </p> */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
