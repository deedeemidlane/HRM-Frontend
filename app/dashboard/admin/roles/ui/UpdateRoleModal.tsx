import { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/Spinner"
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { IRole } from "@/types/User"
import { Shield } from "lucide-react"
import { DISPLAYED_ROLES } from "@/constants/roles"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const FormSchema = z.object({
  roles: z.array(z.number()).refine((value) => value.some((role) => role), {
    message: "Vui lòng chọn vai trò",
  }),
})

export const UpdateRoleModal = ({
  open,
  setOpen,
  allRoles,
  selectedUserRoles,
  submit,
  loading,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  allRoles: IRole[]
  selectedUserRoles: number[]
  submit: (data: number[]) => void
  loading: boolean
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      roles: selectedUserRoles,
    },
    values: {
      roles: selectedUserRoles,
    },
  })

  const isDirty = Object.keys(form.formState.dirtyFields).length > 0

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    submit(data.roles)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" /> Phân quyền
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="roles"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    {/* <FormLabel className="text-base">Sidebar</FormLabel> */}
                    <FormDescription className="text-gray-700">
                      Thêm / Xoá vai trò
                    </FormDescription>
                  </div>
                  <div className="space-y-4">
                    {allRoles.map((role) => (
                      <FormField
                        key={role.id}
                        control={form.control}
                        name="roles"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={role.id}
                              className="flex flex-row items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(role.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          role.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== role.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                <Badge
                                  key={`role-${role.id}`}
                                  variant="outline"
                                  className={cn(
                                    "border-none",
                                    role.name === "ROLE_ADMIN" &&
                                      "bg-purple-100 text-purple-800",
                                    role.name === "ROLE_MANAGER" &&
                                      "bg-amber-100 text-amber-800",
                                    role.name === "ROLE_USER" &&
                                      "bg-green-100 text-green-800"
                                  )}
                                >
                                  {DISPLAYED_ROLES[role.name]}
                                </Badge>
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ? (
              <Button variant={"secondary"} className="w-full" disabled>
                <Spinner />
              </Button>
            ) : (
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  Huỷ
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading || !isDirty}
                >
                  Lưu
                </Button>
              </div>
            )}
          </form>
        </Form>
        {/* <DialogFooter></DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
