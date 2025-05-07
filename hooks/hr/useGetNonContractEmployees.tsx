import { useState } from "react"

const useGetNonContractEmployees = () => {
  const [loading, setLoading] = useState(false)

  const getNonContractEmployees = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees/all?hasContract=false`,
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

      console.log("Non-contract employees: ", result.data)

      return result.data
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getNonContractEmployees }
}
export default useGetNonContractEmployees
