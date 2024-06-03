import styled from "styled-components";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Li = styled.li`
  display: grid;
  grid-template-rows: 320px 1fr;
  border: 1px solid #ddd;
  /* border-radius: 14px; */
  color: #000;
  width: 270px;
  padding: 18px 0;
  height: 540px;
  background-color: #fff;
  overflow: hidden;
  margin: 0 6px 12px 6px;
  transition: all 0.2s;
  &:hover {
    border: 1px solid #aaa;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Img = styled.img`
  display: flex;
  width: auto;
  height: auto;
  max-width: 180px;
  max-height: 280px;
  object-fit: cover;
  scale: 1;
  transition: 0.2s;
  &:hover {
    scale: 1.2;
  }
`;

const InfoContainer = styled.div`
  padding: 40px 16px 18px 16px;
  display: grid;
  grid-template-rows: 2fr 1fr 1fr;
`;

const P = styled.p`
  font-size: 16px;

  padding: 6px 10px;
`;

const Span = styled.span`
  /* padding-left: 8px; */
  text-align: left;
  font-size: 18px;
  color: #000;
  /* font-weight: 700; */
  text-transform: uppercase;
  margin: auto 0;
`;

const Price = styled.span`
  letter-spacing: 1px;
  font-size: 18px;
  font-weight: 700;
  margin: auto 0 auto 4px;
`;

function ProductsElement({ product }) {
  const {
    name,
    body,
    neck,
    price,
    pickups,
    _id: id,
    images,
    category,
    averageRating,
    numOfReviews,
  } = product;

  const urlName = name.replaceAll(" ", "_");

  return (
    <Link to={`product/${urlName}`}>
      <Li>
        <ImageContainer>
          <Img src={images[0].imageURL ? images[0].imageURL : ""} />
        </ImageContainer>
        <InfoContainer>
          <Span>{name}</Span>
          <Span>
            {averageRating > 0 ? (
              <>
                <Rating
                  rate={averageRating}
                  card={"true"}
                  numOfRatings={numOfReviews}
                />
              </>
            ) : (
              <>
                <Rating rate={0} card={"true"} />
              </>
            )}
          </Span>
          <Price>{`$${price}.00`}</Price>
        </InfoContainer>
      </Li>
    </Link>
  );
}

export default ProductsElement;
