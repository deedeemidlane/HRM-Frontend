import { useState } from "react"

const useGetEmployee = () => {
  const [loading, setLoading] = useState(false)

  const getEmployee = async () => {
    try {
      const response = await fetch("http://localhost:8989/api/employees/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Thất bại")
      }

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getEmployee }
}
export default useGetEmployee
