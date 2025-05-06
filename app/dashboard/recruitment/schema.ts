import { z } from "zod"

export const jobPostingSchema = z.object({
  jobTitle: z
    .string()
    .min(1, { message: "Tiêu đề không được để trống" })
    .max(100, { message: "Tiêu đề không được vượt quá 100 ký tự" }),
  departmentId: z.string({
    required_error: "Vui lòng chọn phòng ban",
  }),
  position: z.string().min(1, { message: "Vui lòng nhập vị trí tuyển dụng" }),
  salary: z
    .string()
    .min(1, { message: "Vui lòng nhập mức lương" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Mức lương phải là số",
    }),
  closedDate: z.date({
    required_error: "Vui lòng chọn hạn nộp hồ sơ",
  }),
  jobDescription: z
    .string()
    .min(17, { message: "Mô tả công việc phải có ít nhất 10 ký tự." })
    .max(1000, { message: "Mô tả công việc không được vượt quá 1000 ký tự." }),
  requirements: z
    .string()
    .min(17, { message: "Yêu cầu ứng viên phải có ít nhất 10 ký tự." })
    .max(1000, { message: "Yêu cầu ứng viên không được vượt quá 1000 ký tự." }),
  location: z.string({
    required_error: "Vui lòng chọn địa điểm",
  }),
})

export type JobPostingFormValues = z.infer<typeof jobPostingSchema>
