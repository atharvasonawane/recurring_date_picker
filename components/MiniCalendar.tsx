
import React from "react"

type MiniCalendarProps = {
  dates: string[]
}

export default function MiniCalendar({ dates }: MiniCalendarProps) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const totalDays = lastDay.getDate()
  const startDay = firstDay.getDay()


  const recurringSet = new Set(dates)

  const daysGrid = []
  for (let i = 0; i < startDay; i++) {
    daysGrid.push(null) 
  }
  for (let day = 1; day <= totalDays; day++) {
    daysGrid.push(day)
  }

  const formatDate = (day: number) => {
    const monthStr = (month + 1).toString().padStart(2, "0")
    const dayStr = day.toString().padStart(2, "0")
    return `${year}-${monthStr}-${dayStr}`
  }

  return (
    <div className="p-4 border rounded bg-gray-50">
      <div className="text-center font-bold mb-2">
        {today.toLocaleString("default", { month: "long" })} {year}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="font-semibold">
            {d}
          </div>
        ))}
        {daysGrid.map((day, idx) =>
          day ? (
            <div
              key={idx}
              className={`p-2 rounded ${
                recurringSet.has(formatDate(day))
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {day}
            </div>
          ) : (
            <div key={idx}></div>
          )
        )}
      </div>
    </div>
  )
}
