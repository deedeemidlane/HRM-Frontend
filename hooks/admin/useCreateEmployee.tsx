import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const useCreateEmployee = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const createEmployee = async (employeeData: {}) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(employeeData),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Tạo tài khoản thất bại")
      }
      console.log(result)

      toast.success(result.message)

      router.push("/dashboard/admin/users")
    } catch (error: any) {
      console.error("Error in useCreateEmployee:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, createEmployee }
}
export default useCreateEmployee
