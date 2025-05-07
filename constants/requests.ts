import { RequestType } from "@/types/Request"

// Map request types to Vietnamese labels
export const REQUEST_TYPE_LABELS = {
  [RequestType.LEAVE_REQUEST]: "Đơn xin nghỉ phép",
  [RequestType.LATE_EARLY_REQUEST]: "Đơn xin đi muộn/về sớm",
  [RequestType.BUSINESS_TRIP_REQUEST]: "Đơn xin đi công tác",
  [RequestType.OVERTIME_REQUEST]: "Đơn xin làm thêm giờ",
  [RequestType.ADVANCE_SALARY_REQUEST]: "Đơn xin tạm ứng lương",
  [RequestType.RESIGNATION_REQUEST]: "Đơn xin nghỉ việc",
  [RequestType.EQUIPMENT_REQUEST]: "Đơn xin cấp phát thiết bị",
  [RequestType.WORK_FROM_HOME_REQUEST]: "Đơn xin làm việc từ xa",
}
