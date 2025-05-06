import { useState } from "react"

const useGetAllEmployees = () => {
  const [loading, setLoading] = useState(false)

  const getAllEmployees = async (searchKey: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees/search?active=true&sort=id,asc&keyword=${searchKey}`,
        // `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees/search?active=true&sort=id,asc`,
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

      console.log("All employees: ", result.data)

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getAllEmployees }
}
export default useGetAllEmployees
