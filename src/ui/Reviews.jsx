import styled from "styled-components";
import TextExpander from "../ui/TextExpander";
import { useState } from "react";
import Rating from "./Rating";
import Spinner from "./Spinner";
import { useProductReviews } from "../services/useReviews";
import { useCreateReview } from "../services/useCreateReview";
import { TiStar } from "react-icons/ti";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { reportReviewApi } from "../services/apiReviews";

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background-color: #065ec0;
  color: #fff;
  padding: 16px 24px;
  border-radius: 14px;
  font-size: 16px;
  &:hover {
    background-color: #0654ab;
  }
`;

const Wrapper = styled.div`
  color: #e9e9e9;
  padding-bottom: 40px;
`;

const Review = styled.div`
  margin: 40px 0 0 0;
  color: #e9e9e9;
  padding: 26px 22px 12px 22px;
  background-color: var(--primary-bg-color);
  border: 1px solid var(--primary-border-color);
  border-radius: 18px;
`;

const ReviewHeader = styled.header`
  display: flex;
  color: inherit;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: 800;
  height: 40px;
  padding: 0px 10px 22px 10px;
  letter-spacing: 2px;
  border-bottom: 1px solid var(--primary-border-color);
`;

const Span = styled.span`
  color: #e9e9e9;
`;

const DateSpan = styled(Span)`
  font-size: 14px;
  font-weight: 300;
  color: #888;
`;

const ReviewContent = styled.div`
  color: inherit;
  text-align: justify;
  padding: 16px 0 8px 0;
  font-size: 18px;
  font-weight: 300;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const Textarea = styled.textarea`
  width: 900px;
  height: 200px;
  resize: none;
  color: #e9e9e9;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 300;
  background-color: #131418;
  border: 1px solid var(--primary-border-color);
  padding: 16px;
  &:focus {
    outline: 1px solid var(--primary-border-color);
  }
  @media (max-width: 900px) {
    width: 92%;
  }
`;

const ReportButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ReportButton = styled.button`
  cursor: pointer;
  border: none;
  color: #ca1b1b;
  letter-spacing: 1px;
  font-weight: 700;
  opacity: 0;
  transition: all 0.2s;
  background-color: transparent;
  ${Review}:hover & {
    opacity: 1;
  }
`;

const ReviewsSummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewsRatingsContainer = styled.div`
  flex-basis: 50%;
  display: grid;
  grid-template-columns: 250px 100px;

  @media (max-width: 900px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const ReviewsAvarageRatingContainer = styled.div`
  flex-basis: 50%;
  text-align: right;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Row = styled.p`
  display: flex;
  font-size: 28px;
  align-items: center;
  gap: 6px;
  padding: 6px 0px 6px 12px;
  transition: all 0.2s;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: var(--primary-bg-hover-color);
  }
`;

const Col = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 28px;
  align-items: center;
  gap: 12px;
  width: 50%;
  padding: 6px 0px 6px 12px;
  color: var(--primary-border-color);
`;

function Reviews({ id: productId, averageRating }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isWriting, setIsWriting] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [stars, setStars] = useState(null);

  const {
    reviews,
    ratingsCount,
    isLoading: isLoadingReviews,
  } = useProductReviews(productId);

  const { createReview, isPending } = useCreateReview();

  const review = {
    rating: stars,
    comment: newReview,
  };

  function handleClick(name, value) {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  }

  return (
    <Wrapper>
      {isLoadingReviews || isPending ? (
        <Spinner />
      ) : (
        <>
          <Review>
            <ReviewsSummaryContainer>
              <ReviewsRatingsContainer>
                <div>
                  <Row onClick={() => handleClick("rating", 1)}>
                    1 <TiStar style={{ color: "#0654ab" }} />
                  </Row>

                  <Row onClick={() => handleClick("rating", 2)}>
                    2 <TiStar style={{ color: "#0654ab" }} />
                    <TiStar style={{ color: "#0654ab" }} />
                  </Row>

                  <Row onClick={() => handleClick("rating", 3)}>
                    3 <TiStar style={{ color: "#0654ab" }} />
                    <TiStar style={{ color: "#0654ab" }} />
                    <TiStar style={{ color: "#0654ab" }} />
                  </Row>

                  <Row onClick={() => handleClick("rating", 4)}>
                    4 <TiStar style={{ color: "#0654ab" }} />
                    <TiStar style={{ color: "#0654ab" }} />
                    <TiStar style={{ color: "#0654ab" }} />
                    <TiStar style={{ color: "#0654ab" }} />
                  </Row>

                  <Row onClick={() => handleClick("rating", 5)}>
                    5 <TiStar style={{ color: "#0654ab" }} />
                    <TiStar style={{ color: "#0654ab" }} />
                    <TiStar style={{ color: "#0654ab" }} />
                    <TiStar style={{ color: "#0654ab" }} />
                    <TiStar style={{ color: "#0654ab" }} />
                  </Row>
                </div>
                <div>
                  <Col>
                    {ratingsCount.map((rating) => (
                      <span key={rating[0]}>{rating[1]}</span>
                    ))}
                  </Col>
                </div>
              </ReviewsRatingsContainer>
              <ReviewsAvarageRatingContainer>
                <span>{averageRating}/5</span>{" "}
                <TiStar style={{ color: "#0654ab", fontSize: "46px" }} />
              </ReviewsAvarageRatingContainer>
            </ReviewsSummaryContainer>
          </Review>

          <Review>
            <ReviewContent>
              {isWriting && (
                <>
                  <Textarea
                    onChange={(e) => setNewReview(e.target.value)}
                    value={newReview}
                  ></Textarea>
                </>
              )}
              <ButtonContainer>
                {!isWriting ? (
                  <StyledButton
                    onClick={() => setIsWriting(true)}
                    disabled={isPending}
                  >
                    Write review
                  </StyledButton>
                ) : (
                  <StyledButton
                    fontSize="16px"
                    padding="16px 24px"
                    borderRadius="14px"
                    onClick={() => {
                      if (!newReview || !stars)
                        return toast.error("Please provide review and rating");
                      createReview(
                        { productId, review },
                        {
                          onSuccess: () => {
                            setIsWriting(false);
                            setStars(null);
                            setNewReview("");
                          },
                        }
                      );
                    }}
                    disabled={isPending}
                  >
                    Add review
                  </StyledButton>
                )}
                {isWriting && (
                  <Rating
                    editable={true}
                    setStars={setStars}
                    isComment={true}
                  />
                )}
              </ButtonContainer>
            </ReviewContent>
          </Review>
          {reviews.map((review) => (
            <Review key={review._id}>
              <ReviewHeader>
                <Span>
                  <Rating review={true} rate={review.rating} isComment={true} />
                </Span>
                <DateSpan>{review.createdAt.split("T")[0]}</DateSpan>
              </ReviewHeader>
              <ReviewContent>
                <TextExpander collapsedNumWords={50}>
                  {review.comment}
                </TextExpander>
                <ReportButtonContainer>
                  <ReportButton
                    onClick={async () => {
                      const response = await reportReviewApi(review._id);
                      toast.success(response);
                    }}
                  >
                    report
                  </ReportButton>
                </ReportButtonContainer>
              </ReviewContent>
            </Review>
          ))}
        </>
      )}
    </Wrapper>
  );
}

export default Reviews;
