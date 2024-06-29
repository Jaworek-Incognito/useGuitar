import styled from "styled-components";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { MdOutlineDiscount } from "react-icons/md";
import { priceConverter } from "../helpers/priceConverter";

const Li = styled.li`
  display: grid;
  grid-template-rows: 240px 1fr;
  border: ${(props) =>
    props.featured
      ? "1px solid #065EC0"
      : "1px solid var(--primary-border-color)"};
  color: var(--secondary-font-color);
  width: 270px;
  padding: 0 0 18px 0;
  height: 460px;
  background-color: var(--primary-bg-color);
  overflow: hidden;
  margin: 0 6px 0px 6px;
  transition: all 0.2s;
  position: relative;
  &:hover {
    border: ${(props) =>
      props.featured ? "1px solid #3D86D8" : "1px solid #4E5157"};
  }
  @media (max-width: 680px) {
    min-width: 90%;
    margin: 0 auto;
  }
`;

const StyledLink = styled(Link)`
  margin-bottom: 40px;
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
  max-width: 120px;
  max-height: 220px;
  object-fit: cover;
  scale: 1;
  transition: 0.2s;
`;

const InfoContainer = styled.div`
  padding: 20px 16px 18px 16px;
  display: grid;
  grid-template-rows: 2fr 1fr 1fr;
`;

const Span = styled.span`
  text-align: left;
  font-size: 18px;
  color: var(--secondary-font-color);
  text-transform: uppercase;
  margin: auto 0;
  @media (max-width: 680px) {
    font-size: 20px;
    text-align: center;
    font-weight: 700;
  }
`;

const Price = styled.span`
  letter-spacing: 1px;
  font-size: 18px;
  font-weight: 700;
  margin: auto 0 auto 4px;
  @media (max-width: 680px) {
    text-align: center;
    font-size: 24px;
  }
`;

const DiscountContainer = styled.div`
  position: absolute;
  top: 14px;
  right: 10px;
  z-index: 1000;
  background-color: #067206;
  width: fit-content;
  padding: 2px 8px;
  margin-top: 6px;
  color: #fff;
  display: flex;
  font-size: 14px;
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
    discount,
    featured,
  } = product;

  const urlName = name.replaceAll(" ", "_");

  return (
    <StyledLink
      to={`/${
        category !== "multi effect" ? `${category}s` : "multiEffects"
      }/product/${urlName}`}
    >
      <Li featured={featured}>
        {discount > 0 && (
          <DiscountContainer>
            <MdOutlineDiscount />
            <span style={{ marginLeft: "4px" }}> Save {discount} %</span>
          </DiscountContainer>
        )}

        <ImageContainer>
          <Img src={images[0].imageURL ? images[0].imageURL : ""} />
        </ImageContainer>
        <InfoContainer>
          <Span>{name}</Span>
          <Span>
            {averageRating > 0 ? (
              <>
                <Rating
                  card={"true"}
                  numOfRatings={numOfReviews}
                  ratingAvarage={averageRating}
                />
              </>
            ) : (
              <>
                <Rating rate={0} card={"true"} />
              </>
            )}
          </Span>
          <Price>${priceConverter(price)}</Price>
        </InfoContainer>
      </Li>
    </StyledLink>
  );
}

export default ProductsElement;
