import { useState } from "react"

const useGetAllCandidates = () => {
  const [loading, setLoading] = useState(false)

  const getAllCandidates = async (
    searchKey: string,
    hasInterview?: boolean
  ) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/api/candidates/search?sort=id,asc&keyword=${searchKey}${
          hasInterview !== undefined ? `&hasInterview=${hasInterview}` : ""
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

      console.log("All candidates: ", result.data)

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getAllCandidates }
}
export default useGetAllCandidates
