import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

function DashboardCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-max bg-background"
        />
    )
}

export default DashboardCalendar