"use client"

import { useState } from "react"

interface CaptainsLogInputProps {
  onNavigate: (view: string) => void
  onAddEntry: (entry: { stardate: string; mood: string; text: string }) => void
  fullScreen?: boolean
}

const MOODS = [
  { id: "star", label: "Star", emoji: "⭐", color: "#FFD700" },
  { id: "calm", label: "Calm", emoji: "☮️", color: "#9BBC0F" },
  { id: "storm", label: "Storm", emoji: "⛈️", color: "#FF6B6B" },
  { id: "void", label: "Void", emoji: "🌑", color: "#6B5DD6" },
  { id: "comet", label: "Comet", emoji: "☄️", color: "#FF9F1C" },
]

export default function CaptainsLogInput({ onNavigate, onAddEntry, fullScreen }: CaptainsLogInputProps) {
  const [selectedMood, setSelectedMood] = useState<string>("star")
  const [text, setText] = useState("")
  const [stardate, setStardate] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}`
  })

  const handleSave = () => {
    if (text.trim()) {
      onAddEntry({ stardate, mood: selectedMood, text })
      setText("")
      if (fullScreen) {
        onNavigate("console")
      }
    }
  }

  const handleDiscard = () => {
    setText("")
    if (fullScreen) {
      onNavigate("console")
    }
  }

  const containerClass = fullScreen
    ? "border-4 border-primary bg-slate-950 p-8 w-full max-w-2xl mx-auto"
    : "border-4 border-primary bg-slate-950 p-6 h-full flex flex-col"

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="mb-6 border-b-4 border-primary pb-4">
        <h2 className="text-white font-sans font-bold" style={{ fontSize: "14px", letterSpacing: "1px" }}>
          CAPTAIN'S LOG INPUT
        </h2>
        <div className="font-sans mt-2" style={{ fontSize: "10px", letterSpacing: "1px", color: "#00FFFF" }}>
          STARDATE {stardate}
        </div>
      </div>

      {/* Prompt */}
      <div className="font-sans mb-4" style={{ fontSize: "11px", letterSpacing: "0.5px", color: "#00FFFF" }}>
        COMMANDER, HOW ARE YOU TODAY?
      </div>

      {/* Main text input */}
      <div className="mb-6 flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your thoughts here..."
          className="w-full border-4 border-primary bg-slate-900 p-4 font-sans focus:outline-none focus:bg-slate-800 transition h-32 resize-none"
          style={{ fontSize: "11px", color: "#FFFFFF" }}
        />
      </div>

      {/* Mood selector */}
      <div className="mb-6">
        <div className="font-sans mb-3" style={{ fontSize: "10px", letterSpacing: "1px", color: "#FFFFFF" }}>
          MOOD:
        </div>
        <div className="flex gap-2 flex-wrap">
          {MOODS.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`p-2 border-2 transition-all font-sans text-xs font-bold`}
              style={{
                borderColor: selectedMood === mood.id ? mood.color : "#666",
                backgroundColor: selectedMood === mood.id ? mood.color + "30" : "transparent",
                color: selectedMood === mood.id ? mood.color : "#CCCCCC",
              }}
            >
              {mood.emoji} {mood.label}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-center border-t-4 border-primary pt-4">
        <button
          onClick={handleSave}
          className="font-bold py-2 px-6 hover:brightness-110 transition font-sans text-xs tracking-wider border-2"
          style={{ backgroundColor: "#00FFFF", color: "#000000", borderColor: "#00FFFF" }}
        >
          SAVE
        </button>
        <button
          onClick={handleDiscard}
          className="bg-slate-700 font-bold py-2 px-6 hover:bg-slate-600 transition font-sans text-xs tracking-wider border-2 border-primary"
          style={{ color: "#FFFFFF" }}
        >
          DISCARD
        </button>
      </div>

      {fullScreen && (
        <button
          onClick={() => onNavigate("console")}
          className="mt-4 w-full bg-slate-800 font-bold py-2 px-4 hover:bg-slate-700 transition font-sans text-xs tracking-wider border-2 border-primary"
          style={{ color: "#FFFFFF" }}
        >
          BACK
        </button>
      )}
    </div>
  )
}