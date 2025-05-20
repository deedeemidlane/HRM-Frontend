export enum RequestType {
  LEAVE_REQUEST = "LEAVE_REQUEST",
  LATE_EARLY_REQUEST = "LATE_EARLY_REQUEST",
  BUSINESS_TRIP_REQUEST = "BUSINESS_TRIP_REQUEST",
  OVERTIME_REQUEST = "OVERTIME_REQUEST",
  ADVANCE_SALARY_REQUEST = "ADVANCE_SALARY_REQUEST",
  RESIGNATION_REQUEST = "RESIGNATION_REQUEST",
  EQUIPMENT_REQUEST = "EQUIPMENT_REQUEST",
  WORK_FROM_HOME_REQUEST = "WORK_FROM_HOME_REQUEST",
}

export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "ALL"

export interface IRequest {
  employeeName: string
  createdDate: string
  lastModifiedBy: string
  lastModifiedDate: string
  id: number
  requestType: RequestType
  requestedDate: string
  startTime: string
  endTime: string
  note: string
  comment: string
  status: Exclude<RequestStatus, "ALL">
  approved: boolean
  deleted: boolean
}
