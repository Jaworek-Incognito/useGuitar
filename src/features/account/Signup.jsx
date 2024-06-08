import { useForm } from "react-hook-form";
import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ErrorMessage } from "@hookform/error-message";
import { StyledErrorForm } from "../../ui/StyledErrorForm";
import { signUpApi } from "../../services/apiAuth";

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  color: #fff;
  height: 100dvh;
  background-color: #0f131b;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
`;

const Form = styled.form`
  padding: 30px 40px 52px 40px;
  width: 500px;

  background-color: #131418;
  border: 1px solid #2f3135;
  border-radius: 12px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-rows: 28px max-content 18px;

  padding: 4px 16px;
`;

const Input = styled.input`
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 5px;
  background-color: transparent;
  outline: none;
  border: 1px solid #2f3135;
  color: #fff;
  &:focus {
    border: 1px solid #555;
  }
`;

const Button = styled.button`
  color: #fff;
  background-color: #065ec0;
  font-size: 20px;
  padding: 16px 0;
  margin-top: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 2px;
  min-height: 64px;
  &:hover {
    background-color: #0654ab;
  }
`;

const StyledNavLink = styled(NavLink)`
  width: fit-content;
  height: fit-content;

  color: #fff;
`;

const Img = styled.img`
  object-fit: cover;
  aspect-ratio: 4/3;
  width: 400px;
`;

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords doesn't match.");
    }
    const response = await signUpApi(data.email, data.password);
    toast.loading("Loading...");
    if (response) {
      toast.dismiss();
      toast.success(response);
      navigate("/");
    }
  }

  function onError(errors) {
    if (errors?.category?.message) {
      alert(errors.category.message);
    }
  }

  const isPending = false;

  return (
    <Wrapper>
      <StyledNavLink to={"/"}>
        <Img src="https://res.cloudinary.com/dlartwnnr/image/upload/v1715989024/logo-white-no-background_yb7i1k.svg" />
      </StyledNavLink>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            disabled={isPending}
            {...register("email", {
              required: "Please provide email",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <StyledErrorForm>{message}</StyledErrorForm>
            )}
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="password"
            disabled={isPending}
            {...register("password", {
              required: "Please provide password",
              minLength: {
                value: 6,
                message: "Password cannnot be shorter than 6 characters",
              },
              maxLength: {
                value: 20,
                message: "Password cannot be longer than 20 characters",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <StyledErrorForm>{message}</StyledErrorForm>
            )}
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="password">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="confirmPassword"
            disabled={isPending}
            {...register("confirmPassword", {
              required: "Please confirm password",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => (
              <StyledErrorForm>{message}</StyledErrorForm>
            )}
          />
        </FormRow>
        <FormRow>
          <Button disabled={isPending} onClick={handleSubmit}>
            {isPending ? <SpinnerMini /> : "Sign Up"}
          </Button>
        </FormRow>
      </Form>
    </Wrapper>
  );
}

export default Signup;
