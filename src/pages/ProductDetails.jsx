import { Link } from "react-router-dom";
import styled from "styled-components";
import { GrStatusGood, GrStatusWarning } from "react-icons/gr";
import { FaCartPlus, FaRegWindowClose } from "react-icons/fa";
import DetailsTable from "../ui/DetailsTable";
import Slider from "react-slick";
import { useState } from "react";
import Modal from "react-modal";
import PageNotFound from "../ui/PageNotFound";
import Spinner from "../ui/Spinner";
import { useProduct } from "../services/useProduct";
import Rating from "../ui/Rating";
import DescriptionFormater from "../ui/DescriptionFormater";
import Reviews from "../ui/Reviews";
import { useDispatch } from "react-redux";
import { addItem } from "../utilities/cartSlice";
import useTitle from "../hooks/useTitle";
import { priceConverter } from "../helpers/priceConverter";

Modal.setAppElement("#root");

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background-color: #065ec0;
  color: var(--secondary-font-color);
  padding: 16px 24px;
  border-radius: 14px;
  font-size: 16px;
  &:hover {
    background-color: #0654ab;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 1000px;
  @media (max-width: 900px) {
    width: var(--page-width);
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 500px 500px;
  padding-top: 12px;
  @media (max-width: 900px) {
    display: block;
  }
`;

const StyledH1 = styled.h1`
  width: 100%;
  background-color: transparent;
  color: var(--secondary-font-color);
  padding: 20px 0px 0 0px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 24px;
`;

const StyledHeaderTitle = styled(StyledH1)`
  padding: 20px 0px 40px 0px;
  text-align: center;
  border-bottom: 1px solid var(--primary-border-color);
  color: var(--primary-font-color);
`;

const Price = styled.span`
  display: block;
  font-size: 30px;

  color: var(--secondary-font-color);
`;

const PriceContainer = styled.div`
  margin-top: 8px;
  padding: 16px 0px 8px 0;
  font-weight: 800;
  border-bottom: 1px solid var(--primary-border-color);
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  color: var(--primary-font-color);
  padding: 0 6px;
  text-decoration: none;
  text-transform: capitalize;
  transition: all 0.2s;
  &:hover {
    color: var(--secondary-font-color);
  }
`;

const LesserHeaderSpan = styled.span`
  font-size: 14px;
  color: var(--secondary-font-color);
`;

const ImageWrapper = styled.div`
  height: 600px;
  width: 500px;
  background-color: #fff;

  padding: 0 16px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const ImageWrapperOnMobile = styled.div`
  margin: 0 auto;
  display: none;
  width: 100%;

  @media (max-width: 900px) {
    display: block;
    padding-top: 40px;
  }
`;

const HeaderWrapper = styled.div`
  height: 600px;
  width: 500px;
  display: flex;

  align-items: center;
  width: fit-content;
  padding: 0 16px;

  @media (max-width: 900px) {
    margin: 0 auto;
    padding: 36px 0;
    height: fit-content;
  }
`;

const HeaderContainer = styled.header`
  padding: 0 56px;
  line-height: 250%;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 600px;
  width: 500px;
  cursor: pointer;
`;

const StyledImage = styled.img`
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 350px;
  max-height: 450px;
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    position: static;
    transform: none;
    top: 0%;
    left: 0%;
  }
`;

const StatusSpan = styled.span`
  display: block;
  font-size: 22px;
  font-weight: 800;
  margin: 12px 0;
  letter-spacing: 1px;
  padding: 6px 0 6px 0;
  text-transform: uppercase;
  color: ${(props) => (props.inventory > 0 ? "#067206" : "#B50404")};
`;

const StyledIcon = styled.span`
  padding-right: 10px;
  font-size: 20px;
  color: inherit;
`;

const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 500px 500px;
  margin: 40px 0 60px 0;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ModalImage = styled.img`
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 800px;
  max-width: 450px;
`;

const ModalImageContainer = styled.div`
  position: relative;
  height: 800px;
  width: 450px;
`;

const ModalCloseButton = styled.div`
  position: absolute;
  z-index: 9999;
  color: #000;
  right: 12px;
  top: 10px;
  font-size: 34px;
  cursor: pointer;
`;

const DescriptionWrapper = styled.div`
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 300;
  width: 800px;
  margin: 0 auto;
  color: var(--secondary-font-color);
  @media (max-width: 900px) {
    width: var(--page-width);
    padding: 0 20px;
  }
`;

const RatingContainer = styled.div`
  border-top: 1px solid var(--primary-border-color);
  margin-top: 18px;
`;

const NoDiscountPriceSpan = styled.span`
  margin-left: 10px;
  font-family: "Roboto";
  text-decoration: line-through;
  font-weight: 300;
  text-decoration-thickness: 1px;
  color: red;
  font-size: 26px;
`;

function ProductDetails() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currImage, setCurrImage] = useState(null);

  const dispatch = useDispatch();

  const { product, isLoadingProduct, error } = useProduct();

  let titleName = product?.name.toUpperCase() || "useGuitar";

  useTitle(titleName);

  if (!isLoadingProduct && error) return <PageNotFound />;

  if (!product) return <Spinner />;

  const {
    name,
    price,
    inventory,
    images,
    category,
    description,
    _id: id,
    numOfReviews,
    averageRating,
    noDiscountPrice,
    discount,
  } = product;

  return (
    <>
      <Wrapper>
        {modalIsOpen && (
          <div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={{
                content: {
                  width: "850px",
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  transform: "translate(-50%, -50%)",
                  overflowY: "hidden",
                  overflowX: "hidden",
                },
              }}
            >
              <ModalCloseButton
                onClick={() => {
                  setModalIsOpen(false);
                }}
              >
                <FaRegWindowClose />
              </ModalCloseButton>
              <Slider
                dots={true}
                slidesToShow={1}
                arrows={true}
                infinite={images.length > 1}
                initialSlide={currImage}
                focusOnSelect={false}
              >
                {isLoadingProduct ? (
                  <Spinner />
                ) : (
                  images.map((image) => (
                    <ModalImageContainer key={image.imageId}>
                      <ModalImage src={image.imageURL} />
                    </ModalImageContainer>
                  ))
                )}
              </Slider>
              <br />
            </Modal>
          </div>
        )}
        <>
          <StyledLink to="/">Home</StyledLink>
          <LesserHeaderSpan>{` > `}</LesserHeaderSpan>
          <StyledLink
            to={`/${
              category !== "multi effect" ? `${category}s` : "multiEffects"
            } `}
          >{`${category}s`}</StyledLink>
          <LesserHeaderSpan>{` > `}</LesserHeaderSpan>
          <StyledLink to="">{name}</StyledLink>
          <Container>
            <ImageWrapperOnMobile>
              <StyledImage src={images[0].imageURL} />
            </ImageWrapperOnMobile>
            <ImageWrapper>
              <Slider
                dots={true}
                slidesToShow={1}
                arrows={false}
                autoplay={true}
                autoplaySpeed={3000}
                pauseOnDotsHover={true}
                pauseOnHover={true}
                draggable={false}
                infinite={images.length > 1}
                focusOnSelect={false}
              >
                {images.map((image, index) => (
                  <ImageContainer
                    onClick={() => {
                      setModalIsOpen(true);
                      setCurrImage(index);
                    }}
                    key={image.imageId}
                  >
                    <StyledImage src={image.imageURL} />
                  </ImageContainer>
                ))}
              </Slider>
            </ImageWrapper>
            <HeaderWrapper>
              <HeaderContainer>
                <StyledH1>{name}</StyledH1>
                <PriceContainer>
                  <Price>
                    ${priceConverter(price)}
                    {discount > 1 && (
                      <NoDiscountPriceSpan>
                        ${priceConverter(noDiscountPrice)}
                      </NoDiscountPriceSpan>
                    )}
                  </Price>
                </PriceContainer>
                <StatusSpan inventory={inventory}>
                  <StyledIcon>
                    {inventory > 0 ? <GrStatusGood /> : <GrStatusWarning />}
                  </StyledIcon>
                  {inventory > 0 ? "In Stock" : "Out Of Stock"}
                </StatusSpan>

                <StyledButton onClick={() => dispatch(addItem(id))}>
                  <span style={{ padding: "0 10px 0 0", color: "#fff" }}>
                    <FaCartPlus />
                  </span>
                  ADD TO CART
                </StyledButton>
                <RatingContainer>
                  <Rating
                    editable={false}
                    ratingAvarage={averageRating}
                    numOfRatings={numOfReviews}
                  />
                </RatingContainer>
              </HeaderContainer>
            </HeaderWrapper>

            <DetailsWrapper>
              <DetailsTable product={product} />
            </DetailsWrapper>
          </Container>
          <DescriptionWrapper>
            <StyledHeaderTitle>Description</StyledHeaderTitle>
            <DescriptionFormater description={description} />
          </DescriptionWrapper>
          <Reviews id={id} averageRating={averageRating} />
        </>
      </Wrapper>
    </>
  );
}

export default ProductDetails;
