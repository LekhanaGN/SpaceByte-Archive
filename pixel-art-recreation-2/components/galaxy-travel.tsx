"use client"

export default function GalaxyTravel() {
  return (
    <div className="border-4 border-cyan-400 bg-opacity-90 bg-slate-900 p-6 rounded-lg relative h-full overflow-hidden flex flex-col justify-between">
      {/* Galaxy visualization */}
      <div className="relative flex-1 mb-6 flex items-center justify-center">
        <canvas
          width={200}
          height={200}
          className="absolute"
          ref={(canvas) => {
            if (canvas) {
              const ctx = canvas.getContext("2d")
              if (ctx) {
                ctx.clearRect(0, 0, 200, 200)

                // Draw spiral galaxy
                ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"
                ctx.lineWidth = 2

                for (let angle = 0; angle < Math.PI * 6; angle += 0.1) {
                  const r = angle * 10
                  const x = 100 + r * Math.cos(angle)
                  const y = 100 + r * Math.sin(angle)

                  if (angle === 0) {
                    ctx.moveTo(x, y)
                  } else {
                    ctx.lineTo(x, y)
                  }
                }
                ctx.stroke()
              }
            }
          }}
        />
      </div>

      {/* Travel stats */}
      <div className="text-center">
        <div className="mb-2 text-white drop-shadow-lg" style={{ fontSize: "14px", lineHeight: "1.4" }}>
          YOU'VE TRAVELED
          <br />
          15 LIGHT-DAYS
        </div>
        <div className="text-xs text-cyan-300 mb-6">NEXT GALAXY: 5 DAYS</div>
      </div>

      {/* Control buttons */}
      <div className="absolute right-4 bottom-6 flex flex-col gap-2">
        <button className="w-10 h-10 bg-gray-600 border-2 border-gray-400 hover:bg-gray-500 transition flex items-center justify-center text-white text-lg">
          ↗
        </button>
        <button className="w-10 h-10 bg-gray-600 border-2 border-gray-400 hover:bg-gray-500 transition flex items-center justify-center text-white text-lg">
          ⟳
        </button>
      </div>
    </div>
  )
}
