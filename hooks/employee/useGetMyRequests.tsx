import { useState } from "react"

const useGetMyRequests = () => {
  const [loading, setLoading] = useState(false)

  const getMyRequests = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/requests/current?sort=requested_date,desc`,
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

      console.log("My requests: ", result.data)

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getMyRequests }
}
export default useGetMyRequests
