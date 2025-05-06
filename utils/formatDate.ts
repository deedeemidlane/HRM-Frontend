import { formatDate } from "date-fns"

export function formatDateString(date: string) {
  return formatDate(new Date(date), "dd/MM/yyyy")
}
