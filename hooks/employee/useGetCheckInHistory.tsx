import { useState } from "react"

const useGetCheckInHistory = () => {
  const [loading, setLoading] = useState(false)

  const getCheckInHistory = async (month?: number, year?: number) => {
    let searchQuery = ""
    if (month) searchQuery += `month=${month}&`
    if (year) searchQuery += `year=${year}`

    console.log(searchQuery)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/time-keeping/current?${searchQuery}`,
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

      console.log("Check in history: ", result.data)

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getCheckInHistory }
}
export default useGetCheckInHistory
