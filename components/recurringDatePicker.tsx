
"use client"

import { use, useState } from "react"

export default function RecurringDatePicker() {

    const[frequency, setFrequency] = useState("Daily");
    const[selectedDays, setSelectedDays] = useState<string[]>([]);
    console.log(selectedDays);
    const[interval, setInterval] = useState(1);
    console.log(interval);

    const[startDate,setStartDate] = useState("");
    const[endDate,setEndDate] = useState("");
    console.log(startDate,endDate);
    
    const toggleDay = (day:string) => {
        setSelectedDays((prev) => 
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev,day]
        );

    };
    return (

        <div className="p-6 max-w-xl mx-auto bg-white shadow rounded space-y-6">
            <h2 className="font-semibold">Recurring Date Picker</h2>

            {/* Recurrence Options */}
            <div className="flex gap-2">
                {["Daily", "Weekly", "Monthly", "Yearly"].map((label) => (
                    <button
                        key={label}
                        onClick={() => setFrequency(label)}
                        className={`px-3 py-1 border rounded ${
                            frequency === label ? "bg-blue-500 text-white" : "hover:bg-blue-100 "
                        }`}
                    >

                        {label}
                    </button>
                ))}
            </div>

            {/* EVERY X */}
            <div>
                <label className="mb-1">Every </label>
                <input type="number"
                    className="w-24 border px-2 py-1 rounded"
                    placeholder="1"
                    value={interval}
                    onChange={(e) => setInterval(Number(e.target.value) || 1)} 
                />
                <span className="ml-2">{frequency.toLowerCase()}</span>
            </div>

            {/* WEEKLY */}
            {frequency === "Weekly" && (
            <div>
                <label className="block mb-2">Select Days of Week</label>
                <div className="flex gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sa"].map((day, idx) => (
                        <button
                            key={idx}
                            onClick={() => toggleDay(day)}
                            className={`w-10 h-10 border rounded ${ selectedDays.includes(day) ? "bg-green-500 text-white" : "hover:bg-green-100" } `}
                            
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
)}

            {/* DATE RANGE */}
            <div className="flex flex-col gap-2">
                <label>
                    Start Date:
                    <input type="date" className="border rounded ml-2 px-2 py-1"
                           value={startDate}
                           onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input type="date" className="border rounded ml-3 px-2 py-1"
                           value={endDate}
                           onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
            </div>

            {/* BUTTONS */}
            <button className="bg-blue-600 rounded px-2 py-3 font-bold text-gray-950">
                Generate Dates
            </button>

            {/* PREVIEW BOX */}
            <div className="border rounded p-4 bg-gray-50">
                <p className="text-gray-700">Selected recurring dates will show here..</p>
            </div>

        </div>
    )
}