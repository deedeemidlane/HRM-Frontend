// import { useState } from "react"

const useGetJobDetail = () => {
  // const [loading, setLoading] = useState(false)

  const getJobDetail = async (jobId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${jobId}`,
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

      return result.data
    } catch (error) {
      console.error(error)
    }
    // finally {
    //   setLoading(false)
    // }
  }

  return {
    // loading,
    getJobDetail,
  }
}
export default useGetJobDetail
