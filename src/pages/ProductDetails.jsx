import { Link } from "react-router-dom";
import styled from "styled-components";
import { GrStatusGood, GrStatusWarning } from "react-icons/gr";
import Button from "../ui/Button";
import { FaCartPlus, FaRegWindowClose } from "react-icons/fa";
import Span from "../ui/Span";
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

Modal.setAppElement("#root");

const Wrapper = styled.div`
  margin: 0 auto;
  width: 1000px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 500px 500px;
  padding-top: 12px;
`;

const StyledH1 = styled.h1`
  width: 100%;
  background-color: transparent;
  color: #000;
  padding: 20px 0px 0 0px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 24px;
`;

const StyledHeaderTitle = styled(StyledH1)`
  padding: 20px 0px 40px 0px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const Price = styled.span`
  display: block;
  font-size: 30px;

  color: #000;
`;

const PriceContainer = styled.div`
  margin-top: 8px;
  padding: 16px 0px 8px 0;
  font-weight: 800;
  border-bottom: 1px solid #ddd;
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  color: #000;
  padding: 0 6px;
  text-decoration: none;
  text-transform: capitalize;
  &:hover {
    color: #434545;
  }
`;

const LesserHeaderSpan = styled.span`
  font-size: 14px;
  color: #000;
`;

const ImageWrapper = styled.div`
  height: 600px;
  width: 500px;

  border-right: 1px solid #ddd;
  padding: 0 16px;
`;

const HeaderWrapper = styled.div`
  height: 600px;
  width: 500px;
  display: flex;

  align-items: center;
  width: fit-content;

  padding: 0 16px;
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
`;

const StatusSpan = styled.span`
  display: block;
  font-size: 22px;
  font-weight: 800;
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

const DeliverySpan = styled.span`
  display: block;
  font-size: 16px;
  color: #000;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 500px 500px;
  margin: 40px 0 60px 0;
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
  /* text-align: justify; */
  letter-spacing: 1px;
  font-weight: 300;
  width: 800px;
  margin: 0 auto;
`;

const RatingContainer = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 18px;
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
        {isLoadingProduct ? (
          <Spinner />
        ) : (
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
                  {isLoadingProduct ? (
                    <Spinner />
                  ) : (
                    images.map((image, index) => (
                      <ImageContainer
                        onClick={() => {
                          setModalIsOpen(true);
                          setCurrImage(index);
                        }}
                        key={image.imageId}
                      >
                        <StyledImage src={image.imageURL} />
                      </ImageContainer>
                    ))
                  )}
                </Slider>
              </ImageWrapper>

              <HeaderWrapper>
                <HeaderContainer>
                  <StyledH1>{name}</StyledH1>
                  <PriceContainer>
                    <Price>$ {price}.00</Price>
                  </PriceContainer>
                  <StatusSpan inventory={inventory}>
                    <StyledIcon>
                      {inventory > 0 ? <GrStatusGood /> : <GrStatusWarning />}
                    </StyledIcon>
                    {inventory > 0 ? "In Stock" : "Out Of Stock"}
                  </StatusSpan>
                  <DeliverySpan>
                    Order before 3pm Mon-Thu for next day delivery
                  </DeliverySpan>
                  <Button
                    fontSize="16px"
                    padding="16px 24px"
                    borderRadius="14px"
                    onClick={() => dispatch(addItem(id))}
                  >
                    <Span padding="0 10px 0 0" color="#fff">
                      <FaCartPlus />
                    </Span>
                    ADD TO CART
                  </Button>
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
            <Reviews id={id} />
          </>
        )}
      </Wrapper>
    </>
  );
}

export default ProductDetails;
