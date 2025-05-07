import { useState } from "react"
import toast from "react-hot-toast"

const useCheckIn = () => {
  const [loading, setLoading] = useState(false)

  const checkIn = async (checkInData: {}) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/time-keeping`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(checkInData),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Chấm công thất bại")
      }
      console.log(result)

      toast.success(result.message)
    } catch (error: any) {
      console.error("Error in useCheckIn:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, checkIn }
}
export default useCheckIn
