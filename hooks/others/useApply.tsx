import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import axios from "axios"

const useApply = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const apply = async (candidateData: FormData) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/candidates`,
        candidateData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      )

      if (res.status >= 400) {
        throw new Error(res.data.error || "Thất bại")
      }
      console.log(res)

      toast.success(res.data.message || "Thành công")
    } catch (error: any) {
      console.error("Error in useApply:", error)
      if (error.response) {
        toast.error(error.response.data.error)
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, apply }
}
export default useApply
