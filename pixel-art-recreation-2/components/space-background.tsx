"use client"

import { useEffect, useRef } from "react"

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Retro space gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#0a0a1a")
    gradient.addColorStop(0.25, "#1a0a2e")
    gradient.addColorStop(0.5, "#2d1b52")
    gradient.addColorStop(0.75, "#1a0f3e")
    gradient.addColorStop(1, "#0f0820")

    // Vaporwave/retro colors
    const retroColors = [
      "#ff6ec7", // Hot magenta
      "#b19cd9", // Soft purple
      "#7dd3fc", // Light blue
      "#ffa6f6", // Light pink
      "#00f5ff", // Cyan
      "#ff00ff", // Magenta
      "#8b5cf6", // Violet
      "#ec4899", // Pink
      "#ffd700", // Gold
      "#00ffff", // Bright cyan
      "#ff1493", // Deep pink
      "#ffffff", // White
    ]

    // Moving stars
    const movingStars: Array<{
      x: number
      y: number
      size: number
      color: string
      opacity: number
      speedX: number
      speedY: number
      twinkleSpeed: number
      twinklePhase: number
    }> = []

    for (let i = 0; i < 150; i++) {
      movingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: retroColors[Math.floor(Math.random() * retroColors.length)],
        opacity: Math.random() * 0.8 + 0.2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      })
    }

    // Bright star clusters (retro space vibes)
    const starClusters = [
      {
        centerX: 0.2,
        centerY: 0.25,
        radius: 0.15,
        starCount: 30,
        color: "#ff6ec7",
        stars: [] as Array<{ x: number; y: number; size: number; angle: number; distance: number; rotationSpeed: number }>,
      },
      {
        centerX: 0.75,
        centerY: 0.3,
        radius: 0.12,
        starCount: 25,
        color: "#7dd3fc",
        stars: [] as Array<{ x: number; y: number; size: number; angle: number; distance: number; rotationSpeed: number }>,
      },
      {
        centerX: 0.85,
        centerY: 0.7,
        radius: 0.1,
        starCount: 20,
        color: "#ffd700",
        stars: [] as Array<{ x: number; y: number; size: number; angle: number; distance: number; rotationSpeed: number }>,
      },
      {
        centerX: 0.15,
        centerY: 0.75,
        radius: 0.13,
        starCount: 28,
        color: "#00ffff",
        stars: [] as Array<{ x: number; y: number; size: number; angle: number; distance: number; rotationSpeed: number }>,
      },
      {
        centerX: 0.5,
        centerY: 0.5,
        radius: 0.18,
        starCount: 35,
        color: "#ff00ff",
        stars: [] as Array<{ x: number; y: number; size: number; angle: number; distance: number; rotationSpeed: number }>,
      },
    ]

    // Initialize cluster stars
    starClusters.forEach((cluster) => {
      for (let i = 0; i < cluster.starCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * cluster.radius
        cluster.stars.push({
          x: 0,
          y: 0,
          size: Math.random() * 2.5 + 0.5,
          angle: angle,
          distance: distance,
          rotationSpeed: (Math.random() - 0.5) * 0.002,
        })
      }
    })

    // Constellation patterns (moving)
    const constellations = [
      {
        points: [
          { x: 0.1, y: 0.15 },
          { x: 0.15, y: 0.18 },
          { x: 0.18, y: 0.12 },
          { x: 0.1, y: 0.15 },
        ],
        speedX: 0.0001,
        speedY: 0.0002,
      },
      {
        points: [
          { x: 0.85, y: 0.2 },
          { x: 0.88, y: 0.25 },
          { x: 0.92, y: 0.22 },
          { x: 0.88, y: 0.18 },
          { x: 0.85, y: 0.2 },
        ],
        speedX: -0.0001,
        speedY: 0.0001,
      },
      {
        points: [
          { x: 0.8, y: 0.55 },
          { x: 0.85, y: 0.58 },
          { x: 0.82, y: 0.62 },
          { x: 0.78, y: 0.6 },
          { x: 0.8, y: 0.55 },
        ],
        speedX: 0.0002,
        speedY: -0.0001,
      },
    ]

    let animationFrame: number

    const animate = () => {
      // Draw background
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw moving stars
      movingStars.forEach((star) => {
        star.x += star.speedX
        star.y += star.speedY

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        star.twinklePhase += star.twinkleSpeed
        const twinkleOpacity = star.opacity * (0.5 + 0.5 * Math.sin(star.twinklePhase))

        ctx.fillStyle = star.color
        ctx.globalAlpha = twinkleOpacity
        ctx.shadowBlur = star.size * 4
        ctx.shadowColor = star.color

        ctx.fillRect(star.x, star.y, star.size, star.size)
      })

      ctx.shadowBlur = 0
      ctx.globalAlpha = 1

      // Draw rotating star clusters
      starClusters.forEach((cluster) => {
        const centerX = cluster.centerX * canvas.width
        const centerY = cluster.centerY * canvas.height

        cluster.stars.forEach((star) => {
          star.angle += star.rotationSpeed

          const x = centerX + Math.cos(star.angle) * star.distance * canvas.width
          const y = centerY + Math.sin(star.angle) * star.distance * canvas.height

          ctx.fillStyle = cluster.color
          ctx.globalAlpha = 0.8
          ctx.shadowBlur = star.size * 6
          ctx.shadowColor = cluster.color

          ctx.fillRect(x - star.size / 2, y - star.size / 2, star.size, star.size)

          // Add cross sparkle effect for brighter stars
          if (star.size > 1.5) {
            ctx.globalAlpha = 0.6
            ctx.fillRect(x - star.size * 2, y - 0.5, star.size * 4, 1)
            ctx.fillRect(x - 0.5, y - star.size * 2, 1, star.size * 4)
          }
        })

        // Draw cluster glow
        ctx.globalAlpha = 0.15
        const clusterGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, cluster.radius * canvas.width)
        clusterGlow.addColorStop(0, cluster.color)
        clusterGlow.addColorStop(1, "transparent")
        ctx.fillStyle = clusterGlow
        ctx.fillRect(
          centerX - cluster.radius * canvas.width,
          centerY - cluster.radius * canvas.height,
          cluster.radius * canvas.width * 2,
          cluster.radius * canvas.height * 2
        )
      })

      ctx.shadowBlur = 0
      ctx.globalAlpha = 1

      // Draw moving constellations
      constellations.forEach((constellation) => {
        // Update positions
        constellation.points.forEach((point) => {
          point.x += constellation.speedX
          point.y += constellation.speedY

          // Wrap around
          if (point.x < 0) point.x = 1
          if (point.x > 1) point.x = 0
          if (point.y < 0) point.y = 1
          if (point.y > 1) point.y = 0
        })

        ctx.strokeStyle = "#7dd3fc"
        ctx.lineWidth = 1.5
        ctx.globalAlpha = 0.6
        ctx.shadowBlur = 3
        ctx.shadowColor = "#7dd3fc"

        ctx.beginPath()
        constellation.points.forEach((point, index) => {
          const x = point.x * canvas.width
          const y = point.y * canvas.height

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }

          // Draw constellation stars
          ctx.fillStyle = "#7dd3fc"
          ctx.fillRect(x - 2, y - 2, 4, 4)

          // Add sparkle
          ctx.fillRect(x - 4, y - 0.5, 8, 1)
          ctx.fillRect(x - 0.5, y - 4, 1, 8)
        })
        ctx.stroke()
      })

      ctx.shadowBlur = 0
      ctx.globalAlpha = 1

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}