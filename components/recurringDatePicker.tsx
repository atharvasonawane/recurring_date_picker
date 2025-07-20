
"use client"

import { use, useState } from "react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function RecurringDatePicker() {

    const [frequency, setFrequency] = useState("Daily");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    // console.log(selectedDays);

    const [interval, setInterval] = useState(1);
    // console.log(interval);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // console.log(startDate, endDate);

    const [generatedDates, setGeneratedDates] = useState<string[]>([])

    const toggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );

    };

    const handleGenerate = () => {
        if (!startDate) {
            alert("Please select Start Date");
            return;
        }

        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : null;
        const dates: string[] = [];

        if(frequency == "Daily"){

        let current = new Date(start);
        let count = 0;
        while (true) {
            dates.push(current.toISOString().split("T")[0]);

            if (end && current >= end) break

            if (!end && count >= 9) break
            current.setDate(current.getDate() + interval);
            count++;
        }
        setGeneratedDates(dates);
    }

    if(frequency == "Weekly"){

        if(selectedDays.length === 0){
            alert("Please select atleast one day");
            return;
        }

        let current = new Date(start);
        let count = 0;
        while(true){
            const dayLetter = DAYS[current.getDay()];
            if(selectedDays.includes(dayLetter)){
                dates.push(current.toISOString().split("T")[0]);
            }

            if(end && current >= end) break
            if(!end && dates.length >= 9) break

            current.setDate(current.getDate() + 1);
            count++;

        }
    }
    setGeneratedDates(dates);

    }


    return (

        <div className="p-6 max-w-xl mx-auto bg-white shadow rounded space-y-6">
            <h2 className="font-semibold">Recurring Date Picker</h2>

            {/* Recurrence Options */}
            <div className="flex gap-2">
                {["Daily", "Weekly", "Monthly", "Yearly"].map((label) => (
                    <button
                        key={label}
                        onClick={() => setFrequency(label)}
                        className={`px-3 py-1 border rounded ${frequency === label ? "bg-blue-500 text-white" : "hover:bg-blue-100 "
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
                                className={`w-10 h-10 border rounded ${selectedDays.includes(day) ? "bg-green-500 text-white" : "hover:bg-green-100"} `}

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
            <button className="bg-blue-600 rounded px-2 py-3 font-bold text-gray-950"
                onClick={handleGenerate}
            >
                Generate Dates
            </button>

            {/* PREVIEW BOX */}
            <div className="border rounded p-4 bg-gray-50">
                <p className="text-gray-700">Selected recurring dates will show here..</p>
                <p>Frequency: <span className="font-medium">{frequency}</span></p>
                <p>Every: <span className="font-medium">{interval} {frequency.toLowerCase()}</span></p>
                {frequency === "Weekly" && (
                    <p>Selected Days: <span className="font-medium">{selectedDays.join(", ") || "None"}</span></p>
                )}
                <p>Start Date: <span className="font-medium">{startDate || "Not selected"}</span></p>
                <p>End Date: <span className="font-medium">{endDate || "Not selected"}</span></p>

                <hr className="my-2" />
                <p className="font-semibold">Generated Dates:</p>
                <ul className="list-disc ml-5 text-sm">
                    {generatedDates.length > 0
                        ? generatedDates.map((date, idx) => <li key={idx}>{date}</li>)
                        : <li>No dates generated yet.</li>
                    }
                </ul>
            </div>

        </div>
    )
}