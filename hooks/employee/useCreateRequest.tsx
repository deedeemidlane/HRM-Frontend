import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const useCreateRequest = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const createRequest = async (requestData: {}) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestData),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Tạo thất bại")
      }
      console.log(result)

      toast.success(result.message || "Tạo thành công")

      router.push("/dashboard/requests")
    } catch (error: any) {
      console.error("Error in useCreateRequest:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, createRequest }
}
export default useCreateRequest
