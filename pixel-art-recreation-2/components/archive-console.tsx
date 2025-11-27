"use client"

import RetroFolderIcon from "./retro-folder-icon"

interface ArchiveConsoleProps {
  onNavigate: (view: "daily-entry" | "mission-prompts" | "archived-logs" | "star-map") => void
  currentView: string
}

export default function ArchiveConsole({ onNavigate, currentView }: ArchiveConsoleProps) {
  const folders = [
    { id: "daily-entry", label: "Daily Entry", variant: "captain-log" as const, color: "#FFD700" },
    { id: "mission-prompts", label: "Mission Prompts", variant: "mission" as const, color: "#9BBC0F" },
    { id: "archived-logs", label: "Archived Logs", variant: "archive" as const, color: "#FF6B6B" },
    { id: "star-map", label: "Star Map", variant: "map" as const, color: "#00F2E0" },
  ]

  return (
    <div className="border-4 border-primary bg-slate-950 p-8 col-span-2">
      {/* Header */}
      <div className="mb-8 text-center border-b-4 border-primary pb-6">
        <div className="text-xs text-primary mb-3 font-sans" style={{ fontSize: "10px", letterSpacing: "3px" }}>
          ⬌ 2847.3
        </div>
        <h1
          className="text-white drop-shadow-lg font-sans font-bold"
          style={{ fontSize: "20px", letterSpacing: "2px" }}
        >
          SPACEBYTE ARCHIVE
        </h1>
        <p className="text-foreground font-sans mt-2" style={{ fontSize: "10px", letterSpacing: "1px", color: "#FFFFFF" }}>
          COMMANDER'S MENTAL WELLNESS TERMINAL
        </p>
      </div>

      {/* Folder grid */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => onNavigate(folder.id as any)}
            className="flex flex-col items-center gap-4 hover:opacity-75 transition-opacity cursor-pointer group"
          >
            {/* Folder icon box */}
            <div
              className="p-4 border-4 flex items-center justify-center w-32 h-32 transition-all hover:brightness-110"
              style={{
                borderColor: folder.color,
                backgroundColor: folder.color + "20",
              }}
            >
              <RetroFolderIcon variant={folder.variant} color={folder.color} label={folder.label} />
            </div>
            <span
              className="text-xs text-center font-sans font-bold"
              style={{ fontSize: "11px", letterSpacing: "1px", color: "#FFFFFF" }}
            >
              {folder.label}
            </span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t-4 border-primary pt-6 text-center">
        <p
          className="text-primary font-sans"
          style={{ fontSize: "11px", letterSpacing: "3px", animation: "pulse 1s infinite" }}
        >
          ENTER THE ARCHIVE
        </p>
      </div>
    </div>
  )
}