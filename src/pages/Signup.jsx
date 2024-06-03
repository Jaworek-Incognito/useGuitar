import { useForm } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  height: 55dvh;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
`;

const Form = styled.form`
  padding: 24px 40px;
  width: 500px;
  background-color: #2f3135;
  border: 1px solid #aaa;
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
  border: 1px solid #aaa;
  color: #fff;
`;

const Button = styled.button`
  color: #fff;
  background-color: #065ec0;
  font-size: 16px;
  padding: 16px 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 2px;
  &:hover {
    background-color: #0654ab;
  }
`;

function Signup() {
  const { register, handleSubmit, formState } = useForm();

  return (
    <Wrapper>
      <Form></Form>
    </Wrapper>
  );
}

export default Signup;
