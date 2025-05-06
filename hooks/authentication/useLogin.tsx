import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useUserContext } from "@/contexts/UserContext"

const useLogin = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { setUser } = useUserContext()

  const login = async (loginData: {}) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(loginData),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Đăng nhập thất bại")
      }
      console.log(result)

      const userData = result.data
      setUser(userData)
      localStorage.setItem("ada_hrm_user", JSON.stringify(userData))

      toast.success(result.message)

      switch (userData.roles[0].name) {
        case "ROLE_ADMIN":
          router.push("/dashboard/admin/users")
          break
        case "ROLE_MANAGER":
          router.push("/dashboard")
          break
        case "ROLE_USER":
          router.push("/dashboard/checkin")
          break
        default:
          router.push("/dashboard")
          break
      }
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
