import { useState } from "react"
import toast from "react-hot-toast"

const useUpdateRole = () => {
  const [loading, setLoading] = useState(false)

  const updateRole = async (userEmail: string, data: { roleIds: number[] }) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/update/user-email=${userEmail}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Phân quyền thất bại")
      }

      toast.success(result.message)
    } catch (error: any) {
      console.error("Error in useUpdateRole:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, updateRole }
}
export default useUpdateRole
