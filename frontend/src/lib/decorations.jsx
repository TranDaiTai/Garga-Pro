export const decorationThemes = {
  default: {
    theme: "default",
    name: "Auto Seasonal",
    enabled: true,
    emoji: "🌎",
    backgroundColor: "",
    cornerElements: [],
    
    edgeElements: [],
    particles: [],
  },
  christmas: {
    theme: "christmas",
    name: "Christmas",
    enabled: true,
    emoji: "🎄",
    backgroundColor: "from-red-100 to-green-100",
    accentColor: "text-red-600",
    cornerElements: [
      { emoji: "🎄", position: "top-left" },
      { emoji: "🎅", position: "top-right" },
      { emoji: "❄️", position: "bottom-left" },
      { emoji: "🎁", position: "bottom-right" },
    ],
    edgeElements: [
      { emoji: "⭐️", position: "top-left" },
      { emoji: "🌟", position: "top-right" },
      { emoji: "✨", position: "bottom-left" },
      { emoji: "💫", position: "bottom-right" },
    ],
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
    backgroundColor: "from-orange-100 to-purple-100",
    accentColor: "text-orange-600",
    cornerElements: [
      { emoji: "🎃", position: "top-left" },
      { emoji: "👻", position: "top-right" },
      { emoji: "🦇", position: "bottom-left" },
      { emoji: "💀", position: "bottom-right" },
    ],
    edgeElements: [
      { emoji: "🕸️", position: "top-left" },
      { emoji: "🕷️", position: "top-right" },
      { emoji: "⚰️", position: "bottom-left" },
      { emoji: "🔮", position: "bottom-right" },
    ],
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
    backgroundColor: "from-pink-100 to-red-100",
    accentColor: "text-red-500",
    cornerElements: [
      { emoji: "❤️", position: "top-left" },
      { emoji: "💝", position: "top-right" },
      { emoji: "🌹", position: "bottom-left" },
      { emoji: "💌", position: "bottom-right" },
    ],
    edgeElements: [
      { emoji: "💕", position: "top-left" },
      { emoji: "💖", position: "top-right" },
      { emoji: "💗", position: "bottom-left" },
      { emoji: "💘", position: "bottom-right" },
    ],
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
    backgroundColor: "from-blue-100 to-yellow-100",
    accentColor: "text-blue-600",
    cornerElements: [
      { emoji: "🎆", position: "top-left" },
      { emoji: "🎇", position: "top-right" },
      { emoji: "✨", position: "bottom-left" },
      { emoji: "🎉", position: "bottom-right" },
    ],
    edgeElements: [
      { emoji: "🎊", position: "top-left" },
      { emoji: "🎈", position: "top-right" },
      { emoji: "🌟", position: "bottom-left" },
      { emoji: "🥳", position: "bottom-right" },
    ],
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
    backgroundColor: "from-yellow-100 to-pink-100",
    accentColor: "text-yellow-600",
    cornerElements: [
      { emoji: "🐰", position: "top-left" },
      { emoji: "🐣", position: "top-right" },
      { emoji: "🌷", position: "bottom-left" },
      { emoji: "🌸", position: "bottom-right" },
    ],
    edgeElements: [
      { emoji: "🥚", position: "top-left" },
      { emoji: "🌼", position: "top-right" },
      { emoji: "💐", position: "bottom-left" },
      { emoji: "🌺", position: "bottom-right" },
    ],
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
    backgroundColor: "from-yellow-100 to-blue-100",
    accentColor: "text-yellow-500",
    cornerElements: [
      { emoji: "☀️", position: "top-left" },
      { emoji: "🏖️", position: "top-right" },
      { emoji: "🌊", position: "bottom-left" },
      { emoji: "🍉", position: "bottom-right" },
    ],
    edgeElements: [
      { emoji: "🕶️", position: "top-left" },
      { emoji: "🎣", position: "top-right" },
      { emoji: "🏄‍♂️", position: "bottom-left" },
      { emoji: "🌴", position: "bottom-right" },
    ],
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

  if (month === 11) return "christmas"          // December
  if (month === 9) return "halloween"          // October
  if (month === 1) return "valentine"          // February
  if (month === 0 && date <= 14) return "newyear"  // Jan first 2 weeks
  if ((month === 2 && date >= 20) || (month === 3 && date <= 25)) return "easter" // Easter
  if (month >= 5 && month <= 7) return "summer" // June - August

  return "default"
}
