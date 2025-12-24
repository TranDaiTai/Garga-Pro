export const Card = ({ children, className = "" }) => (
  <div className={`bg-card text-card-foreground rounded-xl shadow-sm border border-border ${className}`}>
    {children}
  </div>
)

export const Badge = ({ status }) => {
  let colorClass = "bg-muted text-muted-foreground"

  switch (status) {
    case "Completed":
    case "Done":
      colorClass = "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400"
      break
    case "Pending":
    case "Todo":
      colorClass = "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      break
    case "In Progress":
      colorClass = "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
      break
    case "Cancelled":
    case "High":
      colorClass = "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400"
      break
    case "Medium":
      colorClass = "bg-accent/10 text-primary"
      break
  }

  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>{status}</span>
}

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-accent text-primary-foreground hover:bg-accent/90 shadow-sm hover:shadow-md",
    outline: "border border-border bg-transparent hover:bg-muted",
    ghost: "hover:bg-muted",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
