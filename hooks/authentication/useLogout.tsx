import { useState } from "react"
import toast from "react-hot-toast"

const useLogout = () => {
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8989/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Đăng xuất thất bại")
      }

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
