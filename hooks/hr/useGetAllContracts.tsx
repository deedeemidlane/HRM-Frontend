import { useState } from "react"

const useGetAllContracts = () => {
  const [loading, setLoading] = useState(false)

  const getAllContracts = async (searchKey: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contracts/search?active=true&sort=id,asc&keyword=${searchKey}`,
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

      console.log("All contracts: ", result.data)

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getAllContracts }
}
export default useGetAllContracts
