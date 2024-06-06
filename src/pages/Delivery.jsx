import { useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import countries from "../utilities/countries";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { StyledError } from "../ui/StyledError";
import { useUser } from "../services/useUser";
import { useUpdateOrderingUser } from "../services/useUpdateOrderingUser";
import SpinnerMini from "../ui/SpinnerMini";
import toast from "react-hot-toast";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { FormRow } from "../ui/FormRow";
import { FormCol, SingleFormCol } from "../ui/FormCol";

const StyledH1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  font-family: "Roboto";
  padding: 6px;
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  margin: 40px auto 80px auto;
  width: 1200px;
  position: relative;
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

const defaultValues = {
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  city: "",
  postCode: "",
};

function Delivery({ isAccountPage }) {
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
    if (!isAccountPage && (!cart || cart.length < 1)) {
      return navigate("/cart");
    }
    return reset(user);
  }, [navigate, cart, reset, user, isAccountPage]);

  function onSubmit(data) {
    updateOrderingUser(data, {
      onSuccess: () => {
        if (!isAccountPage) navigate("/cart/overview");
        else {
          toast.success(
            "Your default shipment details have been successfully saved",
            { duration: 5000 }
          );
        }
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
        {!isAccountPage && <StyledH1>Delivery</StyledH1>}
        <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
          <FormCol>
            <FormRow>
              <StyledSpan>first name</StyledSpan>
              <Input
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
            </FormRow>
            <FormRow>
              <StyledSpan>last name</StyledSpan>
              <Input
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
            </FormRow>
          </FormCol>
          <SingleFormCol>
            <FormRow>
              <StyledSpan>street address</StyledSpan>
              <Input
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
            </FormRow>
          </SingleFormCol>
          <FormCol>
            <FormRow>
              <StyledSpan>city</StyledSpan>
              <Input
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
            </FormRow>
            <FormRow>
              <StyledSpan>post code</StyledSpan>
              <Input
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
            </FormRow>
          </FormCol>
          <FormCol>
            <FormRow>
              <StyledSpan>phone number</StyledSpan>
              <Input
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
            </FormRow>
            <FormRow>
              <StyledSpan>country</StyledSpan>
              <Select
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
              </Select>
              <ErrorMessage
                errors={errors}
                name="country"
                render={({ message }) => <StyledError>{message}</StyledError>}
              />
            </FormRow>
          </FormCol>
          <Button type="submit" disabled={isWorking}>
            {isWorking ? <SpinnerMini /> : isAccountPage ? "Save" : "Continue"}
          </Button>
        </StyledForm>
      </FormContainer>
    </Wrapper>
  );
}

export default Delivery;
