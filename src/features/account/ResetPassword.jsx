import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";
import { useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPasswordApi } from "../../services/apiAuth";

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
  padding: 24px 40px;
  width: 500px;

  background-color: #131418;
  border: 1px solid #2f3135;
  border-radius: 12px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;

  padding: 12px;
  gap: 12px;
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

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords doesn't match.");
    }
    const email = searchParams.get("email");
    const forgotPasswordToken = searchParams.get("forgotPasswordToken");
    const response = await resetPasswordApi(
      email,
      password,
      forgotPasswordToken
    );
    toast.loading("Loading...");
    if (response) {
      toast.dismiss();
      toast.success(response);
      navigate("/");
    }
  }

  const isPending = false;
  return (
    <Wrapper>
      <StyledNavLink to={"/"}>
        <Img src="https://res.cloudinary.com/dlartwnnr/image/upload/v1715989024/logo-white-no-background_yb7i1k.svg" />
      </StyledNavLink>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="password"
            value={password}
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="password"
            value={confirmPassword}
            disabled={isPending}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <Button disabled={isPending} type="submit">
            {isPending ? <SpinnerMini /> : "Save New Password"}
          </Button>
        </FormRow>
      </Form>
    </Wrapper>
  );
}

export default ResetPassword;
