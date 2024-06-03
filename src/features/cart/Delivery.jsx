import { useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import countries from "../../utilities/countries";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { StyledError } from "../../ui/StyledError";
import { useUser } from "../../services/useUser";
import { useUpdateOrderingUser } from "../../services/useUpdateOrderingUser";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledH1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  /* letter-spacing: 2px; */
  font-family: "Roboto";
  padding: 6px;
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  margin: 40px auto 80px auto;
  width: 1200px;
  position: relative;
`;

const StyledFormCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  /* padding: 8px; */
  /* border-bottom: 1px solid #eee; */
`;

const StyledSingleFormCol = styled(StyledFormCol)`
  grid-template-columns: 1fr;
`;

const StyledFormRow = styled.div`
  display: grid;
  grid-template-rows: 1fr auto 16px;

  /* padding: 8px; */
  /* border-bottom: 1px solid #eee; */
`;

const StyledInput = styled.input`
  font-family: "Lato";
  font-size: 18px;
  padding: 10px 16px;
  margin-top: 8px;
  border-radius: 6px;
  font-weight: 300;
  outline: none;
  border: 1px solid #ddd;
  background-color: transparent;
  letter-spacing: 1px;
  /* color: #fff; */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:disabled {
    opacity: 0.5;
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const StyledForm = styled.form`
  padding: 0px 50px 0px 50px;
`;

const StyledSpan = styled.div`
  margin-top: 10px;
  padding: 0 0 6px 6px;
  border-bottom: 1px solid #f4f4f4;
  font-weight: 300;
  letter-spacing: 1px;
`;

const FormContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const StyledSelect = styled.select`
  font-family: "Lato";
  font-size: 18px;
  padding: 10px;
  margin-top: 8px;
  border-radius: 6px;
  font-weight: 300;
  outline: none;
  border: 1px solid #ddd;
  background-color: transparent;
  letter-spacing: 1px;
  &:disabled {
    opacity: 0.5;
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  font-size: 24px;
  background-color: #065ec0;
  width: 100%;
  color: #fff;
  border: none;
  outline: none;
  padding: 8px 0;
  transition: all 0.3s;
  letter-spacing: 2px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  cursor: pointer;
  &:hover {
    background-color: #0654ab;
  }
  &:disabled {
    opacity: 0.5;
    background-color: #0654ab;
    cursor: not-allowed;
  }
`;

const defaultValues = {
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  city: "",
  postCode: "",
};

function Delivery() {
  const cart = useSelector((state) => state.cart.cartAfterFetch);
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const { updateOrderingUser, isPending } = useUpdateOrderingUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!cart || cart.length < 1) {
      return navigate("/cart");
    }
    return reset(user);
  }, [navigate, cart, reset, user]);

  function onSubmit(data) {
    updateOrderingUser(data, {
      onSuccess: () => {
        navigate("/cart/overview");
      },
    });
  }
  function onError(errors) {
    if (errors?.category?.message) {
      alert(errors.category.message);
    }
  }

  const isWorking = isLoading || isPending;

  return (
    <Wrapper>
      <FormContainer>
        <StyledH1>Delivery</StyledH1>
        <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
          <StyledFormCol>
            <StyledFormRow>
              <StyledSpan>first name</StyledSpan>
              <StyledInput
                type="text"
                name="firstName"
                disabled={isWorking}
                {...register("firstName", {
                  required: "This field is required",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="firstName"
                render={({ message }) => <StyledError>{message}</StyledError>}
              />
            </StyledFormRow>
            <StyledFormRow>
              <StyledSpan>last name</StyledSpan>
              <StyledInput
                type="text"
                name="lastName"
                disabled={isWorking}
                {...register("lastName", {
                  required: "This field is required",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="lastName"
                render={({ message }) => <StyledError>{message}</StyledError>}
              />
            </StyledFormRow>
          </StyledFormCol>
          <StyledSingleFormCol>
            <StyledFormRow>
              <StyledSpan>street address</StyledSpan>
              <StyledInput
                type="text"
                name="address"
                disabled={isWorking}
                {...register("address", { required: "This field is required" })}
              />
              <ErrorMessage
                errors={errors}
                name="address"
                render={({ message }) => <StyledError>{message}</StyledError>}
              />
            </StyledFormRow>
          </StyledSingleFormCol>
          <StyledFormCol>
            <StyledFormRow>
              <StyledSpan>city</StyledSpan>
              <StyledInput
                type="text"
                name="city"
                disabled={isWorking}
                {...register("city", {
                  required: "This field is required",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="city"
                render={({ message }) => <StyledError>{message}</StyledError>}
              />
            </StyledFormRow>
            <StyledFormRow>
              <StyledSpan>post code</StyledSpan>
              <StyledInput
                type="text"
                name="postCode"
                disabled={isWorking}
                {...register("postCode", {
                  required: "This field is required",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="postCode"
                render={({ message }) => <StyledError>{message}</StyledError>}
              />
            </StyledFormRow>
          </StyledFormCol>
          <StyledFormCol>
            <StyledFormRow>
              <StyledSpan>phone number</StyledSpan>
              <StyledInput
                type="text"
                name="phoneNumber"
                disabled={isWorking}
                {...register("phoneNumber", {
                  required: "This field is required",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="phoneNumber"
                render={({ message }) => <StyledError>{message}</StyledError>}
              />
            </StyledFormRow>
            <StyledFormRow>
              <StyledSpan>country</StyledSpan>
              <StyledSelect
                name="country"
                defaultValue={"Poland"}
                disabled={isWorking}
                {...register("country", {
                  required: "This field is required",
                })}
              >
                {countries.map((country) => (
                  <option value={country} key={country}>
                    {country}
                  </option>
                ))}
              </StyledSelect>
              <ErrorMessage
                errors={errors}
                name="country"
                render={({ message }) => <StyledError>{message}</StyledError>}
              />
            </StyledFormRow>
          </StyledFormCol>
          <StyledButton type="submit" disabled={isWorking}>
            {isWorking ? <SpinnerMini /> : "Continue"}
          </StyledButton>
        </StyledForm>
      </FormContainer>
    </Wrapper>
  );
}

export default Delivery;
