import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const useCreateContract = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const createContract = async (contractData: {}) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contracts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(contractData),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Tạo thất bại")
      }
      console.log(result)

      toast.success(result.message || "Tạo hợp đồng thành công")

      router.push("/dashboard/contracts")
    } catch (error: any) {
      console.error("Error in useCreateContract:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, createContract }
}
export default useCreateContract
