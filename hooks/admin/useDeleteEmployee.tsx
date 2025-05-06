import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const useDeleteEmployee = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const deleteEmployee = async (employeeId: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees/${employeeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Xoá tài khoản thất bại")
      }

      toast.success(result.message)

      router.push("/dashboard/admin/users")
    } catch (error: any) {
      console.error("Error in useDeleteEmployee:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, deleteEmployee }
}
export default useDeleteEmployee
