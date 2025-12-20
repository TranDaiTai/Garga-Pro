import { Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

export function Breadcrumb({ items = [] }) {
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
        
        {/* Nút quay lại */}
        <Link
          to={items[items.length - 2]?.to || "/"}
          className="text-accent hover:text-accent/80 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>

        {/* Breadcrumb list */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <div key={index} className="flex items-center gap-2">
              {!isLast ? (
                <Link
                  to={item.to}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-semibold">
                  {item.label}
                </span>
              )}

              {!isLast && <span className="text-muted-foreground">/</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
