import { useState } from "react"

const useGetAllAttendanceHistory = () => {
  const [loading, setLoading] = useState(false)

  const getAllAttendanceHistory = async (month?: string, year?: string) => {
    let searchQuery = ""
    if (month) searchQuery += `month=${month}&`
    if (year) searchQuery += `year=${year}`

    console.log(searchQuery)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/time-keeping/all?${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Thất bại")
      }

      console.log("All attendance history: ", result.data)

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getAllAttendanceHistory }
}
export default useGetAllAttendanceHistory
