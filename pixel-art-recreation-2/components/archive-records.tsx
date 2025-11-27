"use client"

import { useState } from "react"

interface ArchiveRecordsProps {
  onBack: () => void
  isPreview?: boolean
}

export default function ArchiveRecords({ onBack, isPreview }: ArchiveRecordsProps) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const records = [
    { id: 1, icon: "📋", title: "Stardate Logs", subtitle: "" },
    { id: 2, icon: "📁", title: "Stardate 07.12", subtitle: "Feeling: Star" },
    { id: 3, icon: "📺", title: "Stardate 07.11", subtitle: "Feeling: Storm" },
    { id: 4, icon: "📦", title: "Storm", subtitle: "Feeling: Storm" },
  ]

  return (
    <div className="border-4 border-cyan-400 bg-opacity-90 bg-slate-900 p-6 rounded-lg relative h-full">
      {/* Header */}
      <div className="mb-4 border-b-2 border-cyan-400 pb-4">
        <h2 className="text-xl text-white drop-shadow-lg" style={{ fontSize: "12px" }}>
          Archive Records
        </h2>
      </div>

      {/* Records list */}
      <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
        {records.map((record) => (
          <div
            key={record.id}
            className="border-2 border-cyan-400 bg-slate-800 p-3 cursor-pointer hover:bg-slate-700 transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{record.icon}</span>
              <div className="flex-1">
                <div className="text-xs text-white">{record.title}</div>
                {record.subtitle && <div className="text-xs text-cyan-300">{record.subtitle}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isPreview && (
        <div className="border-t-2 border-cyan-400 pt-4">
          <button
            onClick={onBack}
            className="w-full bg-cyan-400 text-blue-900 font-bold py-2 px-4 hover:bg-cyan-300 transition text-xs tracking-wider"
          >
            BACK
          </button>
        </div>
      )}
    </div>
  )
}
