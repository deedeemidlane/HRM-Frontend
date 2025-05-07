"use client"

import { format, getMonth, getYear, setMonth, setYear } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { useState } from "react"

interface DatePickerProps {
  date: Date
  setDate: (date: Date) => void
  startDate?: Date
  startYear?: number
  endYear?: number
}
export function DatePicker({
  date,
  setDate,
  startDate,
  startYear = getYear(new Date()),
  endYear = getYear(new Date()) + 50,
}: DatePickerProps) {
  // const [date, setDate] = React.useState<Date>(new Date())
  const [placeholderDate, setPlaceholderDate] = useState<Date>(new Date())

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  )

  const handleMonthChange = (month: string) => {
    if (date) {
      const newDate = setMonth(date, months.indexOf(month))
      setDate(newDate)
    } else {
      const newDate = setMonth(placeholderDate, months.indexOf(month))
      setPlaceholderDate(newDate)
    }
  }

  const handleYearChange = (year: string) => {
    if (date) {
      const newDate = setYear(date, parseInt(year))
      setDate(newDate)
    } else {
      const newDate = setYear(placeholderDate, parseInt(year))
      setPlaceholderDate(newDate)
    }
  }

  const handleSelect = (selectedData: Date | undefined) => {
    if (selectedData) {
      console.log("selectedData: ", selectedData)

      setDate(selectedData)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-2">
          <Select
            onValueChange={handleMonthChange}
            value={months[getMonth(date || placeholderDate)]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={getYear(date || placeholderDate).toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={date || placeholderDate}
          onSelect={handleSelect}
          initialFocus
          month={date || placeholderDate}
          onMonthChange={setDate}
          disabled={(date) => (startDate ? date <= startDate : false)}
        />
      </PopoverContent>
    </Popover>
  )
}
