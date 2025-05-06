import { useUserContext } from "@/contexts/UserContext"
import { useState } from "react"
import toast from "react-hot-toast"

const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const { setUser } = useUserContext()

  const logout = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Đăng xuất thất bại")
      }

      setUser(undefined)
      localStorage.removeItem("ada_hrm_user")
      toast.success(result.message)
    } catch (error: any) {
      console.error("Lỗi đăng xuất:", error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, logout }
}
export default useLogout
