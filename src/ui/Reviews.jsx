import styled from "styled-components";
import TextExpander from "../ui/TextExpander";
import { Button } from "./Button";
import { useState } from "react";
import Rating from "./Rating";
import Spinner from "./Spinner";
import { useGetProductReviews } from "../services/useReviews";
import { useCreateReview } from "../services/useCreateReview";

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

const StyledH1 = styled.h1`
  display: block;
  text-align: center;
  background-color: transparent;
  font-size: 24px;
  color: #000;
  padding: 20px 0 40px 0;
  letter-spacing: 1px;
  border-bottom: 1px solid #ddd;
`;

const Wrapper = styled.div`
  color: #000;
  margin-bottom: 100px;
  /* border-top: 1px solid #ddd; */
`;

const Review = styled.div`
  margin: 20px 0;
  /* border-bottom: 1px solid #eee; */
  color: #000;
  padding: 26px 22px 12px 22px;
  background-color: #eee;
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
  border-bottom: 1px solid #000;
`;

const Span = styled.span`
  color: #000;
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
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 300;
  background-color: #eee;
  border: 1px solid #ddd;
  padding: 16px;
  &:focus {
    outline: 1px solid #ddd;
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
  ${Review}:hover & {
    opacity: 1;
  }
`;

function Reviews({ id: productId }) {
  const [isWriting, setIsWriting] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [stars, setStars] = useState(null);

  const { reviews, isLoading: isLoadingReviews } =
    useGetProductReviews(productId);

  const { createReview, isPending } = useCreateReview();

  const review = {
    rating: stars,
    comment: newReview,
  };

  return (
    <Wrapper>
      {isLoadingReviews || isPending ? (
        <Spinner />
      ) : (
        <>
          <StyledH1>
            {reviews.length > 0
              ? `This product has ${reviews.length} reviews`
              : "This product has not been reviewed yet"}
          </StyledH1>
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
                        return alert("Please provide review and rating");
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
                  <ReportButton>report</ReportButton>
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
