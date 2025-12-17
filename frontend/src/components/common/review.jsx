import { Star } from "lucide-react";
import ReviewCard from "@/components/common/ReviewCard";
import { useState

 } from "react";

 
  // const handleLikeReview = (reviewId) => {
  //   setLikedReviews(prev =>
  //     prev.includes(reviewId)
  //       ? prev.filter(id => id !== reviewId)
  //       : [...prev, reviewId]
  //   )
  // }

export default function ReviewComponent({ product, review }) {
  const [likedReviews, setLikedReviews] = useState([]);

  return (
    <div>
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-start gap-6 mb-6">
          {/* Overall Rating */}
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-accent mb-2">
              {product.rating}
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Tất cả</p>
          </div>

          {/* Rating Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "5 Sao (1)", value: 5 },
              { label: "4 Sao (0)", value: 4 },
              { label: "3 Sao (0)", value: 3 },
              { label: "2 Sao (0)", value: 2 },
              { label: "1 Sao (0)", value: 1 },
              { label: "Có Hình Ảnh / Video (1)", value: "media" },
              { label: "Có Bình Luận (1)", value: "comments" },
            ].map((filter) => (
              <button
                key={filter.value}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  filter.value === 5
                    ? "border-accent text-accent bg-accent/5"
                    : "border-border text-foreground hover:border-accent"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      ;{/* Reviews List */}
      <div className="space-y-4">
        {review?.map((review) => {
          return (
            <ReviewCard
              key={review.id}
              review={review}
              liked={likedReviews}
              onLike={setLikedReviews}
            />
          );
        })}
      </div>
      ;{/* Rating Summary */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-start gap-6 mb-6">
          {/* Overall Rating */}
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-accent mb-2">
              {product.rating}
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Tất cả</p>
          </div>

          {/* Rating Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "5 Sao (1)", value: 5 },
              { label: "4 Sao (0)", value: 4 },
              { label: "3 Sao (0)", value: 3 },
              { label: "2 Sao (0)", value: 2 },
              { label: "1 Sao (0)", value: 1 },
              { label: "Có Hình Ảnh / Video (1)", value: "media" },
              { label: "Có Bình Luận (1)", value: "comments" },
            ].map((filter) => (
              <button
                key={filter.value}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  filter.value === 5
                    ? "border-accent text-accent bg-accent/5"
                    : "border-border text-foreground hover:border-accent"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {review?.map((review) => {
          return (
            <ReviewCard
              key={review.id}
              review={review}
              liked={likedReviews}
              onLike={setLikedReviews}
            />
          );
        })}
      </div>
    </div>
  );
}
