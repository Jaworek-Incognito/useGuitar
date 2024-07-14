import React, { useEffect, useState } from "react";
import { TiStar } from "react-icons/ti";

type RatingProps = {
  editable?: string;
  rate?: number;
  ratingAverage?: number;
  setStars?: number;
  card?: string;
  numOfRatings?: number;
  isComment?: string;
};

function Rating({
  editable,
  ratingAverage,
  setStars,
  card,
  rate,
  numOfRatings,
  isComment,
}: RatingProps) {
  const ratingAverageFloor = !isNaN(ratingAverage)
    ? Math.round(ratingAverage)
    : null;

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const totalStars = 5;

  useEffect(() => {
    setRating(rate || ratingAverageFloor);
  }, [rate, ratingAverageFloor]);
  return (
    <div className="h-8 flex">
      {[...Array(totalStars)].map((star, index) => {
        const currentrating = index + 1;

        return (
          <React.Fragment key={index}>
            <label key={index}>
              {editable === "true" ? (
                <>
                  {" "}
                  <input
                    className="hidden"
                    key={star}
                    type="radio"
                    name="rating"
                    value={currentrating}
                    onChange={() => {
                      setRating(currentrating);
                      setStars(currentrating);
                    }}
                  />{" "}
                  <span
                    className={`-mr-1 text-4xl ${
                      currentrating <= (hover || rating)
                        ? "text-secondary-500"
                        : "text-neutral-700"
                    }`}
                    rating={rating}
                    currentrating={currentrating}
                    hover={hover}
                    card={card}
                    onMouseEnter={() => setHover(currentrating)}
                    onMouseLeave={() => setHover(null)}
                  >
                    {" "}
                    <TiStar />
                  </span>
                </>
              ) : (
                <>
                  {" "}
                  <input
                    className="hidden"
                    key={star}
                    type="radio"
                    name="rating"
                    value={currentrating}
                  />
                  <span
                    className={`-mr-1 text-[26px] ${
                      currentrating <= (hover || rating)
                        ? "text-secondary-500"
                        : "text-neutral-700"
                    }`}
                    rating={rating}
                    currentrating={currentrating}
                    card={card}
                    hover={hover}
                  >
                    {" "}
                    <TiStar />
                  </span>
                </>
              )}
            </label>
          </React.Fragment>
        );
      })}
      {ratingAverage && card === "true" ? (
        <span className="text-base pl-2 font-bold text-neutral-300">
          {ratingAverage}
        </span>
      ) : (
        <span className="text-xl pl-2 font-bold text-neutral-300">
          {ratingAverage}
        </span>
      )}
      {!isComment && (
        <span className="pl-2 text-sm mt-[4px] text-primary-300">
          {numOfRatings ? `(${numOfRatings})` : "(0)"}
        </span>
      )}
    </div>
  );
}

export default Rating;