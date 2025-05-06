import { z } from "zod"

export const userFormSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Họ và tên không được để trống" })
    .max(50, { message: "Họ và tên không được vượt quá 50 ký tự" }),
  email: z
    .string()
    .min(1, { message: "Email không được để trống" })
    .email({ message: "Email không hợp lệ" }),
  phone: z
    .string()
    .min(10, { message: "Số điện thoại phải có ít nhất 10 chữ số" })
    .max(11, { message: "Số điện thoại không được vượt quá 11 số" })
    .regex(/^[0-9+\-\s]+$/, { message: "Số điện thoại không hợp lệ" }),
  idNumber: z
    .string()
    .min(12, { message: "Số CCCD phải có 12 chữ số" })
    .max(12, { message: "Số CCCD không được vượt quá 12 số" })
    .regex(/^[0-9]+$/, { message: "Số CCCD chỉ được chứa số" }),
  address: z
    .string()
    .min(1, { message: "Địa chỉ không được để trống" })
    .max(200, { message: "Địa chỉ không được vượt quá 200 ký tự" }),
  gender: z.string({
    required_error: "Vui lòng chọn giới tính",
  }),
  departmentId: z.string({
    required_error: "Vui lòng chọn phòng ban",
  }),
  position: z
    .string()
    .min(1, { message: "Vui lòng nhập vị trí" })
    .max(50, { message: "Vị trí không được vượt quá 50 ký tự" }),
})

export type UserFormValues = z.infer<typeof userFormSchema>
