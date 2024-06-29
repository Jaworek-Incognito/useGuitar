import { useEffect, useState } from "react";
import { TiStar } from "react-icons/ti";
import styled from "styled-components";

const Input = styled.input`
  display: none;
`;

const Star = styled.span`
  font-size: ${(props) => (props.card ? "20px" : "28px")};
  margin-right: -5px;
  color: ${(props) =>
    props.currentrating <= (props.hover || props.rating)
      ? "#065ec0"
      : "#2f3135"};
`;

const Content = styled.div`
  color: #e9e9e9;
  height: 30px;
`;

const Span = styled.span`
  font-size: 14px;
  padding-left: 4px;
  color: #afb0b2;
`;

const AvarageRatingSpan = styled.span`
  font-size: 20px;
  padding-left: 6px;
  padding-bottom: 10px;
  font-weight: 700;
`;

const CardAvarageRatingSpan = styled.span`
  font-size: 16px;
  padding-left: 6px;
  font-weight: 700;
`;

function Rating({
  editable,
  review,
  rate,
  ratingAvarage,
  setStars,
  card,
  numOfRatings,
  isComment,
}) {
  const ratingAvarageFloor = !isNaN(ratingAvarage)
    ? Math.round(ratingAvarage)
    : null;

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const totalStars = 5;

  useEffect(() => {
    setRating(rate || ratingAvarageFloor);
  }, [rate, ratingAvarageFloor]);
  return (
    <Content editable={editable} review={review}>
      {[...Array(totalStars)].map((star, index) => {
        const currentrating = index + 1;

        return (
          <>
            <label key={index}>
              {editable ? (
                <>
                  {" "}
                  <Input
                    key={star}
                    type="radio"
                    name="rating"
                    value={currentrating}
                    onChange={() => {
                      setRating(currentrating);
                      setStars(currentrating);
                    }}
                  />{" "}
                  <Star
                    rating={rating}
                    currentrating={currentrating}
                    hover={hover}
                    card={card}
                    onMouseEnter={() => setHover(currentrating)}
                    onMouseLeave={() => setHover(null)}
                  >
                    {" "}
                    <TiStar />
                  </Star>
                </>
              ) : (
                <>
                  {" "}
                  <Input
                    key={star}
                    type="radio"
                    name="rating"
                    value={currentrating}
                  />
                  <Star
                    rating={rating}
                    currentrating={currentrating}
                    card={card}
                    hover={hover}
                  >
                    {" "}
                    <TiStar />
                  </Star>
                </>
              )}
            </label>
          </>
        );
      })}
      {ratingAvarage && card === "true" ? (
        <CardAvarageRatingSpan>{ratingAvarage}</CardAvarageRatingSpan>
      ) : (
        <AvarageRatingSpan>{ratingAvarage}</AvarageRatingSpan>
      )}
      {!isComment && <Span>{numOfRatings ? `(${numOfRatings})` : "(0)"}</Span>}
    </Content>
  );
}

export default Rating;
