import { useEffect, useState } from "react";
import { TiStar } from "react-icons/ti";
import styled from "styled-components";

const Input = styled.input`
  display: none;
`;

const Star = styled.span`
  /* cursor: pointer; */
  font-size: ${(props) => (props.card ? "20px" : "28px")};
  margin-right: -5px;
  /* padding: 0 5px; */
  color: ${(props) =>
    props.currentrating <= (props.hover || props.rating) ? "#0654ab" : "#ddd"};
`;

const Content = styled.div`
  color: #000;
`;

const P = styled.p`
  padding: 0 10px;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 1px;
  color: inherit;
  border-top: ${(props) =>
    props.editable === false && props.review !== true
      ? "1px solid #ddd"
      : "none"};
`;

const Span = styled.span`
  font-size: 14px;
  padding-left: 4px;
  color: #aaa;
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
    ? Math.floor(ratingAvarage)
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
        );
      })}
      {!isComment && <Span>{numOfRatings ? `(${numOfRatings})` : "(0)"}</Span>}
    </Content>
  );
}

export default Rating;
