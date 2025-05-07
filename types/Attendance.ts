export interface IAttendance {
  id: number
  date: string
  checkInTime: string | null
  checkOutTime: string | null
  totalWorkingTime: number | null
  workDays: number | null
  status: "ON_TIME" | "ABSENT" | "LATE"
}
