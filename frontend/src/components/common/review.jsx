import { Star } from "lucide-react";
import ReviewCard from "@/components/common/ReviewCard";
import { useState, useEffect, useMemo } from "react";

export default function ReviewComponent({ product, reviews }) {
  const [likedReviews, setLikedReviews] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Đếm số lượng review theo từng rating
  const mapCountReviews = useMemo(() => {
    if (!reviews || !Array.isArray(reviews)) {
      return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    }
    
    return reviews.reduce((map, review) => {
      const rating = Math.round(review.rating); // Làm tròn rating
      if (rating >= 1 && rating <= 5) {
        map[rating] = (map[rating] || 0) + 1;
      }
      return map;
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  }, [reviews]);

  // Đếm review có media và comments
  const reviewStats = useMemo(() => {
    if (!reviews || !Array.isArray(reviews)) return { mediaCount: 0, commentCount: 0 };
    
    return reviews.reduce(
      (stats, review) => ({
        mediaCount: stats.mediaCount + (review.images?.length > 0 ? 1 : 0),
        commentCount: stats.commentCount + (review.comments?.length > 0 ? 1 : 0),
      }),
      { mediaCount: 0, commentCount: 0 }
    );
  }, [reviews]);

  const handleLikeReview = (reviewId) => {
    setLikedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  // Filter reviews theo rating đã chọn
  const filteredReviews = useMemo(() => {
    if (!selectedFilter || !reviews) return reviews;
    
    return reviews.filter((review) => {
      if (selectedFilter === "media") {
        return review.media?.length > 0;
      }
      if (selectedFilter === "comments") {
        return review.comments?.length > 0;
      }
      return Math.round(review.rating) === selectedFilter;
    });
  }, [reviews, selectedFilter]);

  const filterButtons = [
    { label: `5 Sao (${mapCountReviews[5]})`, value: 5 },
    { label: `4 Sao (${mapCountReviews[4]})`, value: 4 },
    { label: `3 Sao (${mapCountReviews[3]})`, value: 3 },
    { label: `2 Sao (${mapCountReviews[2]})`, value: 2 },
    { label: `1 Sao (${mapCountReviews[1]})`, value: 1 },
    { label: `Có Hình Ảnh / Video (${reviewStats.mediaCount})`, value: "media" },
  ];

  return (
    <div>
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-start gap-6 mb-6">
          {/* Overall Rating */}
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-accent mb-2">
              {product.rating || 0}
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating || 0)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {reviews?.length || 0} đánh giá
            </p>
          </div>

          {/* Rating Filters */}
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(
                  selectedFilter === filter.value ? null : filter.value
                )}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  selectedFilter === filter.value
                    ? "border-accent text-accent bg-accent/5"
                    : "border-border text-foreground hover:border-accent hover:bg-accent/5"
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
        {filteredReviews?.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            liked={likedReviews.includes(review.id)}
            onLike={() => handleLikeReview(review.id)}
          />
        ))}
        
        {(!filteredReviews || filteredReviews.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            Không có đánh giá nào phù hợp với bộ lọc
          </div>
        )}
      </div>
    </div>
  );
}