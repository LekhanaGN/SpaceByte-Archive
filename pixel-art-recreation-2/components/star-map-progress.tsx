
import { useEffect, useRef, useState } from "react"

export default function StarMapDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [totalLightDays, setTotalLightDays] = useState(0)
  const [animatedDays, setAnimatedDays] = useState(0)
  const [demoMode, setDemoMode] = useState(false)

  const MAX_JOURNEY = 60

  // Smooth animation for rocket progress
  useEffect(() => {
    let animationFrame: NodeJS.Timeout
    const steps = 40
    let currentStep = 0

    const animateProgress = () => {
      if (currentStep < steps) {
        const progress = currentStep / steps
        setAnimatedDays(Math.floor(totalLightDays * progress))
        currentStep++
        animationFrame = setTimeout(animateProgress, 16)
      } else {
        setAnimatedDays(totalLightDays)
      }
    }

    animateProgress()
    return () => clearTimeout(animationFrame)
  }, [totalLightDays])

  // Draw pixel-art rocket
  const drawPixelRocket = (ctx: CanvasRenderingContext2D, x: number, y: number, isIgniting: boolean) => {
    // Rocket body - golden yellow (BIGGER)
    ctx.fillStyle = "#FFD700"
    ctx.fillRect(x - 8, y - 20, 16, 30) // Main body

    // Rocket nose cone - red
    ctx.fillStyle = "#FF6B6B"
    ctx.fillRect(x - 6, y - 28, 12, 10) // Nose

    // Rocket window - cyan
    ctx.fillStyle = "#00CCFF"
    ctx.fillRect(x - 4, y - 12, 8, 8) // Window

    // Rocket fins - yellow
    ctx.fillStyle = "#FFD700"
    ctx.fillRect(x - 12, y + 6, 6, 8) // Left fin
    ctx.fillRect(x + 6, y + 6, 6, 8) // Right fin

    if (isIgniting) {
      // Ignition flames
      const time = Date.now() / 1000
      const flameLength = 10 + 6 * Math.sin(time * 8)

      // Left flame
      ctx.fillStyle = "#FF6B6B"
      ctx.fillRect(x - 8, y + 10, 4, flameLength)

      // Center flame
      ctx.fillStyle = "#FF9933"
      ctx.fillRect(x - 2, y + 12, 4, flameLength + 3)

      // Right flame
      ctx.fillStyle = "#FF6B6B"
      ctx.fillRect(x + 4, y + 10, 4, flameLength)

      // Flame glow
      ctx.shadowColor = "#FF9933"
      ctx.shadowBlur = 12
    }
  }

  // Draw canvas with animated rocket
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#0F1729"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    // Draw stars background
    ctx.fillStyle = "#FFFFFF"
    ctx.globalAlpha = 0.7
    for (let i = 0; i < 50; i++) {
      const starX = (i * 73) % width
      const starY = (i * 97) % height
      ctx.fillRect(starX, starY, 2, 2)
    }

    ctx.globalAlpha = 1

    // Draw some planets/celestial bodies
    ctx.fillStyle = "#FF8C42"
    ctx.globalAlpha = 0.6
    ctx.beginPath()
    ctx.arc(width - 60, 60, 30, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#6BB6FF"
    ctx.globalAlpha = 0.5
    ctx.beginPath()
    ctx.arc(60, height - 80, 40, 0, Math.PI * 2)
    ctx.fill()

    ctx.globalAlpha = 1

    // Calculate rocket position - starts from middle, goes UP based on days
    const rocketX = centerX
    const rocketBaseY = centerY + 100 // Start lower
    
    // Rocket goes higher with each day - 15 pixels per day
    const rocketY = rocketBaseY - (animatedDays * 15)

    // Check if rocket is igniting (has days logged)
    const isIgniting = animatedDays > 0

    // Draw trail if moving
    if (animatedDays > 0) {
      ctx.strokeStyle = "#FFD700"
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.4
      ctx.beginPath()
      ctx.moveTo(rocketX, rocketBaseY)
      ctx.lineTo(rocketX, rocketY)
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    // Draw the pixel rocket
    drawPixelRocket(ctx, rocketX, rocketY, isIgniting)

    // Draw starting point marker
    ctx.fillStyle = "#00CCFF"
    ctx.globalAlpha = 0.5
    ctx.fillRect(rocketX - 15, rocketBaseY - 2, 30, 4)
    ctx.globalAlpha = 1

  }, [animatedDays])

  const progressPercent = Math.min(animatedDays / MAX_JOURNEY, 1)

  // Demo mode: auto-increment
  useEffect(() => {
    if (!demoMode) return

    const interval = setInterval(() => {
      setTotalLightDays((prev) => {
        if (prev >= MAX_JOURNEY) {
          setDemoMode(false)
          return prev
        }
        return prev + 1
      })
    }, 500)

    return () => clearInterval(interval)
  }, [demoMode])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        body { margin: 0; }
      `}</style>
      
      <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center p-4 py-8">
        <div className="border-4 border-cyan-400 bg-slate-950 p-8 w-full max-w-2xl flex flex-col gap-6">
          
          {/* Title */}
          <div className="text-center">
            <h1 className="text-cyan-400 text-2xl tracking-widest mb-2" style={{ fontFamily: '"Press Start 2P", monospace' }}>🚀 SPACE JOURNEY 🚀</h1>
            <p className="text-cyan-300 text-sm" style={{ fontFamily: '"Press Start 2P", monospace' }}>Each log ignites your rocket higher into space</p>
          </div>

          {/* Canvas */}
          <div className="flex items-center justify-center bg-slate-900 p-4 border-2 border-cyan-400">
            <canvas
              ref={canvasRef}
              width={400}
              height={600}
              className=""
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* Stats */}
          <div className="text-center border-t-4 border-cyan-400 pt-4">
            <div className="text-white font-bold mb-3" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: "14px", letterSpacing: "2px" }}>
              ALTITUDE REACHED
              <br />
              <span className="text-cyan-400 text-2xl">{animatedDays}</span> DAYS | <span className="text-cyan-400 text-2xl">{animatedDays * 15}</span> PIXELS UP
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-slate-900 border-2 border-cyan-400 h-6 mb-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-cyan-300 h-full transition-all duration-200"
                style={{ width: `${progressPercent * 100}%` }}
              />
            </div>

            <div className="text-cyan-300 text-sm" style={{ fontFamily: '"Press Start 2P", monospace', letterSpacing: "1px", marginBottom: "12px" }}>
              PROGRESS: {Math.round(progressPercent * 100)}% → TARGET: {MAX_JOURNEY} DAYS
            </div>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTotalLightDays(Math.max(0, totalLightDays - 1))}
              className="bg-red-600 text-white font-bold py-3 px-3 hover:brightness-110 transition border-2 border-red-600 text-xs tracking-wider"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              ◀ -1 DAY
            </button>

            <button
              onClick={() => setDemoMode(!demoMode)}
              className={`font-bold py-3 px-3 transition border-2 text-xs tracking-wider ${
                demoMode
                  ? "bg-yellow-600 text-white border-yellow-600 hover:brightness-110"
                  : "bg-green-600 text-white border-green-600 hover:brightness-110"
              }`}
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              {demoMode ? "⏹ STOP" : "▶ AUTO"}
            </button>

            <button
              onClick={() => setTotalLightDays(Math.min(MAX_JOURNEY, totalLightDays + 1))}
              className="bg-green-600 text-white font-bold py-3 px-3 hover:brightness-110 transition border-2 border-green-600 text-xs tracking-wider"
              style={{ fontFamily: '"Press Start 2P", monospace' }}
            >
              +1 DAY ▶
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              setTotalLightDays(0)
              setDemoMode(false)
            }}
            className="w-full bg-slate-800 text-cyan-400 font-bold py-3 px-4 hover:bg-slate-700 transition border-2 border-cyan-400 text-sm tracking-wider"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            🔄 RESET TO GROUND
          </button>

          {/* Back to Home */}
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 px-4 transition border-2 border-cyan-400 text-sm tracking-wider"
            style={{ fontFamily: '"Press Start 2P", monospace' }}
          >
            ← BACK TO HOME
          </button>

          {/* Info */}
          <div className="bg-slate-900 border-2 border-cyan-400 p-4 rounded">
            <p className="text-cyan-300 text-xs leading-relaxed" style={{ fontFamily: '"Press Start 2P", monospace' }}>
              🚀 <strong>HOW IT WORKS:</strong> Your rocket starts at ground level. Each day you log, it ignites and shoots higher! The rocket gains 15 pixels of altitude per day. Watch it climb to the stars!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}