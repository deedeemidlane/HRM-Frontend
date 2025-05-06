import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const useCreateJob = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const createJob = async (jobData: {}) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(jobData),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Tạo thất bại")
      }
      console.log(result)

      toast.success(result.message)

      router.push("/dashboard/recruitment")
    } catch (error: any) {
      console.error("Error in useCreateJob:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, createJob }
}
export default useCreateJob
