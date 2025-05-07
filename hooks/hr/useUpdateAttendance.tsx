import { useState } from "react"
import toast from "react-hot-toast"

const useUpdateAttendance = () => {
  const [loading, setLoading] = useState(false)

  const updateAttendance = async (attendanceData: {}) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/time-keeping`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(attendanceData),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Thất bại")
      }
      console.log(result)

      toast.success(result.message || "Cập nhật thông tin chấm công thành công")
    } catch (error: any) {
      console.error("Error in useUpdateAttendance:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Có lỗi xảy ra")
      }
    } finally {
      setLoading(false)
    }
  }

  return { loading, updateAttendance }
}
export default useUpdateAttendance
