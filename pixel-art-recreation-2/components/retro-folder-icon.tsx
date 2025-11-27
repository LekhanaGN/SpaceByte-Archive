"use client"

interface RetroFolderIconProps {
  label: string
  color: string
  variant: "captain-log" | "mission" | "archive" | "map"
}

export default function RetroFolderIcon({ label, color, variant }: RetroFolderIconProps) {
  const renderIcon = () => {
    switch (variant) {
      case "captain-log":
        // Yellow folder with document inside
        return (
          <svg viewBox="0 0 120 100" className="w-full h-full">
            {/* Folder tab */}
            <rect x="10" y="10" width="40" height="15" fill={color} stroke="#FFF" strokeWidth="2" />
            {/* Folder body */}
            <rect x="10" y="20" width="100" height="70" fill={color} stroke="#FFF" strokeWidth="2" />
            {/* Document lines inside */}
            <line x1="30" y1="40" x2="90" y2="40" stroke="#FFF" strokeWidth="2" />
            <line x1="30" y1="50" x2="90" y2="50" stroke="#FFF" strokeWidth="2" />
            <line x1="30" y1="60" x2="90" y2="60" stroke="#FFF" strokeWidth="2" />
            <line x1="30" y1="70" x2="70" y2="70" stroke="#FFF" strokeWidth="2" />
          </svg>
        )
      case "mission":
        // Green folder with star inside
        return (
          <svg viewBox="0 0 120 100" className="w-full h-full">
            {/* Folder tab */}
            <rect x="10" y="10" width="40" height="15" fill={color} stroke="#FFF" strokeWidth="2" />
            {/* Folder body */}
            <rect x="10" y="20" width="100" height="70" fill={color} stroke="#FFF" strokeWidth="2" />
            {/* Star inside */}
            <polygon points="60,35 65,48 80,48 70,57 75,70 60,62 45,70 50,57 40,48 55,48" fill="#FFF" />
          </svg>
        )
      case "archive":
        // Red/Blue folder with stacked papers
        return (
          <svg viewBox="0 0 120 100" className="w-full h-full">
            {/* Folder tab */}
            <rect x="10" y="10" width="40" height="15" fill={color} stroke="#FFF" strokeWidth="2" />
            {/* Folder body */}
            <rect x="10" y="20" width="100" height="70" fill={color} stroke="#FFF" strokeWidth="2" />
            {/* Stacked papers */}
            <rect x="35" y="38" width="50" height="8" fill="#FFF" stroke="#FFF" strokeWidth="1" />
            <rect x="35" y="48" width="50" height="8" fill="#FFF" stroke="#FFF" strokeWidth="1" />
            <rect x="35" y="58" width="50" height="8" fill="#FFF" stroke="#FFF" strokeWidth="1" />
          </svg>
        )
      case "map":
        // Cyan folder with map grid
        return (
          <svg viewBox="0 0 120 100" className="w-full h-full">
            {/* Folder tab */}
            <rect x="10" y="10" width="40" height="15" fill={color} stroke="#FFF" strokeWidth="2" />
            {/* Folder body */}
            <rect x="10" y="20" width="100" height="70" fill={color} stroke="#FFF" strokeWidth="2" />
            {/* Map grid */}
            <line x1="30" y1="40" x2="90" y2="40" stroke="#FFF" strokeWidth="1" />
            <line x1="30" y1="50" x2="90" y2="50" stroke="#FFF" strokeWidth="1" />
            <line x1="30" y1="60" x2="90" y2="60" stroke="#FFF" strokeWidth="1" />
            <line x1="50" y1="35" x2="50" y2="65" stroke="#FFF" strokeWidth="1" />
            <line x1="70" y1="35" x2="70" y2="65" stroke="#FFF" strokeWidth="1" />
          </svg>
        )
    }
  }

  return <div className="w-full h-full flex items-center justify-center">{renderIcon()}</div>
}
