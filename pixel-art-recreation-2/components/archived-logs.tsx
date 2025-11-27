"use client"

import { useState } from "react"

interface LogEntry {
  id: number
  stardate: string
  mood: string
  text: string
}

interface ArchivedLogsProps {
  onNavigate: (view: string) => void
  entries: LogEntry[]
  onDelete: (id: number) => void
  fullScreen?: boolean
  isPreview?: boolean
}

const MOOD_EMOJI: Record<string, string> = {
  star: "⭐",
  calm: "☮️",
  storm: "⛈️",
  void: "🌑",
  comet: "☄️",
  prompts: "📋",
}

export default function ArchivedLogs({ onNavigate, entries, onDelete, fullScreen, isPreview }: ArchivedLogsProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const containerClass = fullScreen
    ? "border-4 border-primary bg-slate-950 p-8 w-full max-w-2xl mx-auto"
    : isPreview
      ? "border-4 border-primary bg-slate-950 p-6 h-full flex flex-col"
      : "border-4 border-primary bg-slate-950 p-8 w-full max-w-2xl mx-auto"

  const visibleEntries = isPreview ? entries.slice(0, 3) : entries

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="mb-6 border-b-4 border-primary pb-4">
        <h2 className="text-white font-sans font-bold" style={{ fontSize: "14px", letterSpacing: "1px" }}>
          ARCHIVED LOG ENTRIES
        </h2>
      </div>

      {/* Logs list */}
      <div className={`space-y-3 ${isPreview ? "flex-1 overflow-y-auto pr-2" : "mb-6 max-h-96 overflow-y-auto pr-2"}`}>
        {visibleEntries.length === 0 ? (
          <div className="text-center font-sans" style={{ fontSize: "11px", color: "#FFFFFF" }}>
            NO LOGS YET. START YOUR FIRST ENTRY.
          </div>
        ) : (
          visibleEntries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => setSelectedId(selectedId === entry.id ? null : entry.id)}
              className="border-4 border-primary bg-slate-900 p-4 cursor-pointer hover:bg-slate-800 transition"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{MOOD_EMOJI[entry.mood] || "📝"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="text-xs font-sans font-bold"
                      style={{ fontSize: "10px", letterSpacing: "1px", color: "#00FFFF" }}
                    >
                      STARDATE {entry.stardate}
                    </div>
                  </div>
                  <div className="text-xs font-sans truncate" style={{ fontSize: "10px", color: "#FFFFFF" }}>
                    {entry.text.substring(0, 60)}...
                  </div>
                  {selectedId === entry.id && (
                    <div
                      className="mt-3 pt-3 border-t-2 border-primary font-sans text-xs"
                      style={{ fontSize: "10px", color: "#FFFFFF" }}
                    >
                      <p className="mb-3">{entry.text}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(entry.id)
                        }}
                        className="text-red-400 hover:text-red-300 transition font-bold tracking-wider"
                      >
                        DELETE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {!isPreview && (
        <div className="border-t-4 border-primary pt-4">
          <button
            onClick={() => onNavigate("console")}
            className="w-full font-bold py-2 px-4 hover:brightness-110 transition font-sans text-xs tracking-wider border-2"
            style={{ backgroundColor: "#00FFFF", color: "#000000", borderColor: "#00FFFF" }}
          >
            BACK
          </button>
        </div>
      )}
    </div>
  )
}
