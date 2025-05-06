import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const useCreateInterview = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const createInterview = async (interviewData: {}) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/interviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(interviewData),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Tạo thất bại")
      }
      console.log(result)

      toast.success(result.message)

      router.push("/dashboard/recruitment/interviews")
    } catch (error: any) {
      console.error("Error in useCreateInterview:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, createInterview }
}
export default useCreateInterview
