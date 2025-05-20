import { RequestStatus } from "@/types/Request"
import { useState } from "react"

const useGetAllRequests = () => {
  const [loading, setLoading] = useState(false)

  const getAllRequests = async (status?: RequestStatus) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/requests?sort=id,asc${
          status ? `&requestStatus=${status}` : ""
        }`,
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

      console.log("All requests: ", result.data)

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getAllRequests }
}
export default useGetAllRequests
