"use client"

import { useState, useEffect } from "react"
import ArchiveConsole from "@/components/archive-console"
import CaptainsLogInput from "@/components/captains-log-input"
import MissionPrompts from "@/components/mission-prompts"
import ArchivedLogs from "@/components/archived-logs"
import StarMapProgress from "@/components/star-map-progress"
import SpaceBackground from "@/components/space-background"
import CopilotChat from "@/components/copilot-chat"

type ViewType = "console" | "daily-entry" | "mission-prompts" | "archived-logs" | "star-map" | "copilot-chat"
type Entry = { id: number; stardate: string; mood: string; text: string }

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("console")
  const [entries, setEntries] = useState<Entry[]>([])
  const [showCopilot, setShowCopilot] = useState(false)

  useEffect(() => {
    const savedEntries = localStorage.getItem("captainsLogEntries")
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    } else {
      const defaultEntries = [
        { id: 1, stardate: "2847.3", mood: "star", text: "Today was a good day. I managed to overcome my fears." },
        { id: 2, stardate: "2847.2", mood: "calm", text: "Feeling peaceful after meditation." },
        { id: 3, stardate: "2847.1", mood: "storm", text: "Had a challenging day but learned from it." },
      ]
      setEntries(defaultEntries)
      localStorage.setItem("captainsLogEntries", JSON.stringify(defaultEntries))
    }
  }, [])

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("captainsLogEntries", JSON.stringify(entries))
    }
  }, [entries])

  const handleAddEntry = (entry: { stardate: string; mood: string; text: string }) => {
    const newEntry = { id: Date.now(), ...entry }
    setEntries([newEntry, ...entries])
  }

  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter((e) => e.id !== id))
  }

  const navigationProps = {
    onNavigate: (view: ViewType) => setCurrentView(view),
    currentView,
  }

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden relative">
      <SpaceBackground />

      <div className="relative z-10 p-8 min-h-screen flex items-center justify-center">
        {currentView === "console" && (
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-2 gap-8">
              <ArchiveConsole {...navigationProps} />
              <StarMapProgress totalDays={15} />
              <CaptainsLogInput {...navigationProps} onAddEntry={handleAddEntry} />
              <ArchivedLogs {...navigationProps} entries={entries} onDelete={handleDeleteEntry} />
            </div>

            <div className="mt-8">
              <button
                onClick={() => setShowCopilot(!showCopilot)}
                className="w-full bg-primary text-background font-bold py-3 px-4 hover:brightness-110 transition font-sans border-4 border-primary mb-4"
                style={{ fontSize: "10px", letterSpacing: "1px" }}
              >
                {showCopilot ? "CLOSE AI COPILOT" : "OPEN AI COPILOT"}
              </button>

              {showCopilot && (
                <div className="h-[500px]">
                  <CopilotChat onNavigate={setCurrentView} />
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === "daily-entry" && (
          <CaptainsLogInput {...navigationProps} onAddEntry={handleAddEntry} fullScreen />
        )}

        {currentView === "mission-prompts" && <MissionPrompts {...navigationProps} onAddEntry={handleAddEntry} />}

        {currentView === "archived-logs" && (
          <ArchivedLogs {...navigationProps} entries={entries} onDelete={handleDeleteEntry} fullScreen />
        )}

        {currentView === "star-map" && <StarMapProgress totalDays={15} fullScreen onNavigate={setCurrentView} />}
      </div>
    </div>
  )
}
