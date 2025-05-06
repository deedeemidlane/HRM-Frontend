import { useState } from "react"

const useGetAllJobs = () => {
  const [loading, setLoading] = useState(false)

  const getAllJobs = async (searchKey: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/search?active=true&sort=id,asc&keyword=${searchKey}`,
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

      console.log("All jobs: ", result.data)

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getAllJobs }
}
export default useGetAllJobs
