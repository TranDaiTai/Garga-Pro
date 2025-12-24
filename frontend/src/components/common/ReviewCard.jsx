import { Star } from "lucide-react"

export default function ReviewCard({ review, onLike }) {
  return (
    <div className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-sm font-bold text-accent">
              {review.authorDisplay.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{review.authorDisplay}</p>
            <p className="text-xs text-muted-foreground">
              {review.location} | {review.reviewDate}
            </p>
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? "fill-accent text-accent"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {review.content}
      </p>

      {/* Images */}
      {review.images?.length > 0 && (
        <div className="flex gap-3 mb-4">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Review image ${index + 1}`}
              className="w-20 h-20 rounded border border-border object-cover hover:scale-110 transition-transform cursor-pointer"
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4 pt-4 border-t border-border/50">
        <button
          onClick={() => onLike(review.id)}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            review.likes
              ? "text-accent"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          👍 Hữu ích({review.likes})
        </button>
      </div>
    </div>
  )
}
