import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IEmployee } from "@/types/Employee"
import useUpdateAttendance from "@/hooks/hr/useUpdateAttendance"
import { Spinner } from "@/components/Spinner"

interface UpdateAttendanceModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  currentCheckInTime: string | null // Format: hh:mm:ss
  currentCheckOutTime: string | null // Format: hh:mm:ss
  currentDate: string
  employee: IEmployee
  resetModalData: () => void
  toggleReRender: () => void
}

const UpdateAttendanceModal: React.FC<UpdateAttendanceModalProps> = ({
  open,
  setOpen,
  currentCheckInTime,
  currentCheckOutTime,
  currentDate,
  employee,
  resetModalData,
  toggleReRender,
}) => {
  const [checkInTime, setCheckInTime] = useState(currentCheckInTime)
  const [checkOutTime, setCheckOutTime] = useState(currentCheckOutTime)

  const { loading, updateAttendance } = useUpdateAttendance()

  const handleSave = async () => {
    const data = {
      employeeId: employee.id,
      date: currentDate,
      checkInTime: checkInTime?.padEnd(8, ":00"),
      checkOutTime: checkOutTime?.padEnd(8, ":00"),
    }

    console.log(data)
    // return

    await updateAttendance(data)

    resetModalData()
    setOpen(false)
    toggleReRender()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="[&>button]:hidden"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>
            Cập nhật giờ chấm công cho {employee.fullName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-4">
          <div>
            <label
              htmlFor="checkInTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Giờ vào
            </label>
            <Input
              id="checkInTime"
              type="time"
              value={checkInTime || undefined}
              onChange={(e) => setCheckInTime(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="checkOutTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Giờ ra
            </label>
            <Input
              id="checkOutTime"
              type="time"
              value={checkOutTime || undefined}
              onChange={(e) => setCheckOutTime(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          {loading ? (
            <Button variant={"secondary"} className="w-full" disabled>
              <Spinner />
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  resetModalData()
                  setOpen(false)
                }}
              >
                Hủy
              </Button>
              <Button
                onClick={handleSave}
                disabled={!checkInTime || !checkOutTime}
              >
                Lưu
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateAttendanceModal
