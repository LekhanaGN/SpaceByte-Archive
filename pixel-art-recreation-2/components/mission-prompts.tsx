"use client"

import { useState } from "react"

interface MissionPromptsProps {
  onNavigate: (view: string) => void
  onAddEntry: (entry: { stardate: string; mood: string; text: string }) => void
}

const PROMPTS = [
  { id: 1, text: "I'm grateful for..." },
  { id: 2, text: "I learned a new thing about..." },
  { id: 3, text: "One moment of calm today was..." },
  { id: 4, text: "My objective for tomorrow is..." },
]

export default function MissionPrompts({ onNavigate, onAddEntry }: MissionPromptsProps) {
  const [responses, setResponses] = useState<Record<number, string>>({})

  const handleChange = (id: number, value: string) => {
    setResponses((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = () => {
    const allResponses = Object.values(responses)
      .filter((v) => v.trim())
      .join(" | ")
    if (allResponses) {
      onAddEntry({
        stardate: new Date().toISOString().slice(0, 7).replace("-", "."),
        mood: "prompts",
        text: allResponses,
      })
      setResponses({})
      onNavigate("console")
    }
  }

  return (
    <div className="border-4 border-primary bg-slate-950 p-8 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6 border-b-4 border-primary pb-4">
        <h2 className="text-white font-sans font-bold" style={{ fontSize: "16px", letterSpacing: "1px" }}>
          GUIDED MISSION INPUT
        </h2>
      </div>

      {/* Prompts list */}
      <div className="space-y-4 mb-6">
        {PROMPTS.map((prompt) => (
          <div key={prompt.id}>
            <label
              className="font-sans mb-2 block"
              style={{ fontSize: "11px", letterSpacing: "0.5px", color: "#00FFFF" }}
            >
              {prompt.text}
            </label>
            <input
              type="text"
              value={responses[prompt.id] || ""}
              onChange={(e) => handleChange(prompt.id, e.target.value)}
              className="w-full border-4 border-primary bg-slate-800 p-3 font-sans focus:outline-none focus:bg-slate-700 transition"
              style={{ fontSize: "11px", color: "#FFFFFF" }}
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-center border-t-4 border-primary pt-4">
        <button
          onClick={handleSubmit}
          className="font-bold py-2 px-6 hover:brightness-110 transition font-sans text-xs tracking-wider border-2"
          style={{ backgroundColor: "#00FFFF", color: "#000000", borderColor: "#00FFFF" }}
        >
          SUBMIT MISSION
        </button>
        <button
          onClick={() => onNavigate("console")}
          className="bg-slate-700 font-bold py-2 px-6 hover:bg-slate-600 transition font-sans text-xs tracking-wider border-2 border-primary"
          style={{ color: "#FFFFFF" }}
        >
          BACK
        </button>
      </div>
    </div>
  )
}
