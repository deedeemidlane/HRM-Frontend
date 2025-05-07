import { useState } from "react"
import toast from "react-hot-toast"

const useUpdateRequest = () => {
  const [loading, setLoading] = useState(false)

  const updateRequest = async (requestData: {}) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/requests`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestData),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Thất bại")
      }
      console.log(result)

      toast.success(result.message || "Duyệt đơn thành công")
    } catch (error: any) {
      console.error("Error in useUpdateRequest:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, updateRequest }
}
export default useUpdateRequest
