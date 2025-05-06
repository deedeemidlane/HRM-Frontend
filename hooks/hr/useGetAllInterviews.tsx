import { useState } from "react"

const useGetAllInterviews = () => {
  const [loading, setLoading] = useState(false)

  const getAllInterviews = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/interviews?sort=id,asc`,
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

      console.log("All interviews: ", result.data)

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getAllInterviews }
}
export default useGetAllInterviews
