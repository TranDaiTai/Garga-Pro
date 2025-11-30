export const decorationThemes = {
  default: {
    theme: "default",
    name: "Auto Seasonal",
    enabled: false,
    emoji: "🌎",
  },
  christmas: {
    theme: "christmas",
    name: "Christmas",
    enabled: true,
    emoji: "🎄",
    backgroundColor: "from-red-50 to-green-50",
    accentColor: "text-red-600",
    cornerElements: "🎄🎅❄️🎁",
    edgeElements: "⭐️🌟✨💫",
    particles: [
      { emoji: "🎄", count: 6, speed: "slow", size: "large" },
      { emoji: "❄️", count: 12, speed: "medium", size: "medium" },
      { emoji: "🎅", count: 4, speed: "slow", size: "large" },
      { emoji: "🎁", count: 8, speed: "medium", size: "medium" },
    ],
  },
  halloween: {
    theme: "halloween",
    name: "Halloween",
    enabled: true,
    emoji: "🎃",
    backgroundColor: "from-orange-50 to-purple-50",
    accentColor: "text-orange-600",
    cornerElements: "🎃👻🦇💀",
    edgeElements: "🕸️🕷️⚰️🔮",
    particles: [
      { emoji: "👻", count: 10, speed: "medium", size: "medium" },
      { emoji: "🎃", count: 8, speed: "medium", size: "large" },
      { emoji: "🦇", count: 12, speed: "fast", size: "small" },
      { emoji: "🕷️", count: 6, speed: "slow", size: "small" },
    ],
  },
  valentine: {
    theme: "valentine",
    name: "Valentine's Day",
    enabled: true,
    emoji: "❤️",
    backgroundColor: "from-pink-50 to-red-50",
    accentColor: "text-red-500",
    cornerElements: "❤️💝🌹💌",
    edgeElements: "💕💖💗💘",
    particles: [
      { emoji: "❤️", count: 15, speed: "slow", size: "medium" },
      { emoji: "💕", count: 12, speed: "medium", size: "medium" },
      { emoji: "🌹", count: 8, speed: "slow", size: "large" },
      { emoji: "💝", count: 6, speed: "medium", size: "medium" },
    ],
  },
  newyear: {
    theme: "newyear",
    name: "New Year",
    enabled: true,
    emoji: "🎆",
    backgroundColor: "from-blue-50 to-yellow-50",
    accentColor: "text-blue-600",
    cornerElements: "🎆🎇✨🎉",
    edgeElements: "🥳🌟🎊🎈",
    particles: [
      { emoji: "🎆", count: 10, speed: "medium", size: "large" },
      { emoji: "🎇", count: 8, speed: "fast", size: "medium" },
      { emoji: "✨", count: 15, speed: "fast", size: "small" },
      { emoji: "🎉", count: 6, speed: "medium", size: "medium" },
    ],
  },
  easter: {
    theme: "easter",
    name: "Easter",
    enabled: true,
    emoji: "🐰",
    backgroundColor: "from-yellow-50 to-pink-50",
    accentColor: "text-yellow-600",
    cornerElements: "🐰🐣🌷🌸",
    edgeElements: "🥚🌼💐🌺",
    particles: [
      { emoji: "🐰", count: 6, speed: "slow", size: "large" },
      { emoji: "🐣", count: 12, speed: "medium", size: "medium" },
      { emoji: "🌷", count: 10, speed: "slow", size: "medium" },
      { emoji: "🌸", count: 8, speed: "slow", size: "medium" },
    ],
  },
  summer: {
    theme: "summer",
    name: "Summer",
    enabled: true,
    emoji: "☀️",
    backgroundColor: "from-yellow-50 to-blue-50",
    accentColor: "text-yellow-500",
    cornerElements: "☀️🏖️🌊🍉",
    edgeElements: "🕶️🎣🏄‍♂️🌴",
    particles: [
      { emoji: "☀️", count: 8, speed: "slow", size: "large" },
      { emoji: "🌊", count: 12, speed: "medium", size: "medium" },
      { emoji: "🍉", count: 6, speed: "slow", size: "medium" },
      { emoji: "🕶️", count: 8, speed: "fast", size: "small" },
    ],
  },
}

export const getCurrentSeasonTheme = () => {
  const month = new Date().getMonth()
  const date = new Date().getDate()

  // December: Christmas
  if (month === 11) return "christmas"
  // October: Halloween
  if (month === 9) return "halloween"
  // February: Valentine
  if (month === 1) return "valentine"
  // January: New Year (first 2 weeks)
  if (month === 0 && date <= 14) return "newyear"
  // March - April: Easter
  if ((month === 2 && date >= 20) || (month === 3 && date <= 25)) return "easter"
  // June - August: Summer
  if (month >= 5 && month <= 7) return "summer"

  return "default"
}