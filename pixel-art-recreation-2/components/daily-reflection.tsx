"use client"

import { useState } from "react"

export default function DailyReflection() {
  const [reflection, setReflection] = useState({
    grateful: "",
    proud: "",
    joy: "",
  })

  const handleChange = (key: string, value: string) => {
    setReflection((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    console.log("Saved:", reflection)
  }

  const handleDiscard = () => {
    setReflection({ grateful: "", proud: "", joy: "" })
  }

  return (
    <div className="border-4 border-cyan-400 bg-opacity-90 bg-slate-900 p-6 rounded-lg h-full">
      {/* Header */}
      <div className="mb-6 border-b-2 border-cyan-400 pb-4">
        <h2 className="text-lg text-cyan-400 drop-shadow-lg" style={{ fontSize: "12px" }}>
          DAILY REFLECTION
        </h2>
      </div>

      {/* Input fields */}
      <div className="space-y-4 mb-6">
        {[
          { key: "grateful", label: "I'M GRATEFUL FOR..." },
          { key: "proud", label: "TODAY I FELT PROUD OF..." },
          { key: "joy", label: "A SMALL JOY WAS..." },
        ].map((field) => (
          <div key={field.key}>
            <input
              type="text"
              placeholder={field.label}
              value={reflection[field.key as keyof typeof reflection]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full border-2 border-cyan-400 bg-slate-800 text-white p-2 text-xs placeholder-cyan-400 placeholder-opacity-50 focus:outline-none focus:bg-slate-700"
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-center border-t-2 border-cyan-400 pt-4">
        <button
          onClick={handleSave}
          className="bg-cyan-400 text-blue-900 font-bold py-2 px-6 hover:bg-cyan-300 transition text-xs tracking-wider"
        >
          SAVE
        </button>
        <button
          onClick={handleDiscard}
          className="bg-cyan-400 text-blue-900 font-bold py-2 px-6 hover:bg-cyan-300 transition text-xs tracking-wider"
        >
          DISCARD
        </button>
      </div>
    </div>
  )
}
