import { useState } from "react"

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false)

  const getAllUsers = async (searchKey: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/search?active=true&sort=id,asc&keyword=${searchKey}`,
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

      console.log("All users: ", result.data)

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getAllUsers }
}
export default useGetAllUsers
