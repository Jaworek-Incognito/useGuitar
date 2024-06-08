import { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogin } from "../../services/useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { forgotPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

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

const Span = styled.span`
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

function Login() {
  const [email, setEmail] = useState("");
  const [forgrotEmail, setForgrotEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageForm, setPageForm] = useState("login");

  const { Login, isPending } = useLogin();

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    Login({ user });
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    const response = await forgotPasswordApi(forgrotEmail);
    toast.loading("Loading...");
    if (response) {
      toast.dismiss();
      toast.success(response);
      navigate("/");
    }
  }

  return (
    <Wrapper>
      <StyledNavLink to={"/"}>
        <Img src="https://res.cloudinary.com/dlartwnnr/image/upload/v1715989024/logo-white-no-background_yb7i1k.svg" />
      </StyledNavLink>
      {pageForm === "login" && (
        <Form onSubmit={handleLogin}>
          <FormRow>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              disabled={isPending}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Label htmlFor="password">Password</Label>
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
            <Button disabled={isPending} type="submit">
              {isPending ? <SpinnerMini /> : "Login"}
            </Button>
            <Span
              onClick={() => setPageForm("forgotPassword")}
              style={{ color: "#065ec0", fontWeight: 700, cursor: "pointer" }}
            >
              I forgot password
            </Span>
            <NavLink to="/signup" style={{ color: "#065ec0", fontWeight: 700 }}>
              If you aren't registered, please sign up.
            </NavLink>
          </FormRow>
        </Form>
      )}
      {pageForm === "forgotPassword" && (
        <Form onSubmit={handleForgotPassword}>
          <FormRow>
            <Label htmlFor="forgotEmail">Please provide your email</Label>
            <Input
              id="forgotEmail"
              type="email"
              autoComplete="email"
              value={forgrotEmail}
              disabled={isPending}
              onChange={(e) => setForgrotEmail(e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Button disabled={isPending} type="submit">
              {isPending ? <SpinnerMini /> : "Submit"}
            </Button>
          </FormRow>
        </Form>
      )}
    </Wrapper>
  );
}

export default Login;
