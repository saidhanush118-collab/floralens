import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
  reviewCount,
  interactive = false,
  onRate,
}) => {
  const sizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {Array.from({ length: maxRating }).map((_, idx) => {
          const starValue = idx + 1;
          const isFilled = rating >= starValue;
          const isHalf = !isFilled && rating >= starValue - 0.5;

          return (
            <button
              key={idx}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRate && onRate(starValue)}
              className={`p-0.5 focus:outline-none transition-transform ${
                interactive ? 'cursor-pointer hover:scale-125' : 'cursor-default'
              }`}
            >
              <Star
                className={`${sizeMap[size]} ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : isHalf
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'text-slate-200 fill-slate-100'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showNumber && (
        <span className="text-xs font-semibold text-slate-700 ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-xs text-slate-500">
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  );
};
