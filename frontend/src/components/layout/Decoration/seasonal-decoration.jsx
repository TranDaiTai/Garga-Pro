"use client"

import { useEffect, useState } from "react"
import { decorationThemes, getCurrentSeasonTheme } from "@/lib/decorations"



export function SeasonalDecoration() {
  const [currentTheme, setCurrentTheme] = useState(null)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Get stored theme or use auto-detected seasonal theme
    const storedTheme = localStorage.getItem("decorationTheme")
    const theme = storedTheme || getCurrentSeasonTheme()
    const config = decorationThemes[theme ]

    setCurrentTheme(config)

    // Generate particles for animation
    if (config.enabled && config.particles) {
      const newParticles = []
      let id = 0

      config.particles.forEach((particle) => {
        for (let i = 0; i < particle.count; i++) {
          const speedMap = {
            slow: Math.random() * 20 + 20,
            medium: Math.random() * 15 + 12,
            fast: Math.random() * 10 + 8,
          }

          newParticles.push({
            id: id++,
            emoji: particle.emoji,
            left: Math.random() * 100,
            duration: speedMap[particle.speed],
            delay: Math.random() * 5,
          })
        }
      })

      setParticles(newParticles)
    }
  }, [])

  if (!currentTheme || !currentTheme.enabled) {
    return null
  }

  return (
    <>
      {/* Background gradient overlay */}
      <div
        className={`fixed inset-0 pointer-events-none bg-gradient-to-b ${currentTheme.backgroundColor || "from-transparent to-transparent"} opacity-10 z-0`}
        style={{ mixBlendMode: "overlay" }}
      />

      {/* Falling particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-2xl animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: "-30px",
              animation: `fall ${particle.duration}s linear ${particle.delay}s infinite`,
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      <style >{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

export function DecorationThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState("default")

  useEffect(() => {
    const stored = localStorage.getItem("decorationTheme") || "default"
    setActiveTheme(stored)
  }, [])

  const handleThemeChange = (theme) => {
    localStorage.setItem("decorationTheme", theme)
    setActiveTheme(theme)
    window.location.reload()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg border border-border">
      <p className="text-xs font-semibold text-foreground mb-2">Decoration Theme</p>
      <div className="flex flex-wrap gap-2">
        {Object.keys(decorationThemes).map((theme) => (
          <button
            key={theme}
            onClick={() => handleThemeChange(theme)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              activeTheme === theme
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
