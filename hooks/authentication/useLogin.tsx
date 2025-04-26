import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const useLogin = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const login = async (loginData: {}) => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8989/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Đăng nhập thất bại")
      }

      toast.success(result.message)

      // if (result.token) {
      //   localStorage.setItem("authToken", result.token)
      // }

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}
export default useLogin
