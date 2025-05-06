import { useState } from "react"

const useGetCV = () => {
  const [loading, setLoading] = useState(false)

  const getCV = async (candidateId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/candidates/${candidateId}/resume`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )

      const blob = await response.blob()

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob)

      // Open the PDF in a new tab
      window.open(url, "_blank")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, getCV }
}
export default useGetCV
