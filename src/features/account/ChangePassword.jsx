import styled from "styled-components";
import { SingleFormCol } from "../../ui/FormCol";
import { Input } from "../../ui/Input";
import { FormRow } from "../../ui/FormRow";
import { Button } from "../../ui/Button";
import { useState } from "react";
import { updateUserPassword } from "../../services/apiUser";
import toast from "react-hot-toast";

const StyledForm = styled.form`
  width: 800px;
  min-width: 800px;
  margin: 100px auto 0px auto;
  padding: 0px 50px 0px 50px;
  @media (max-width: 1280px) {
    width: 100%;
    min-width: 100%;
    padding: 0px 20px 0px 20px;
  }
  @media (max-width: 900px) {
    width: 80%;
    min-width: 80%;
    margin: 20px auto 0 auto;
    padding: 0px 20px 0px 20px;
  }
`;

const StyledSpan = styled.div`
  margin-top: 10px;
  padding: 0 0 6px 6px;
  border-bottom: 1px solid var(--primary-border-color);
  color: var(--primary-font-color);
  font-weight: 300;
  letter-spacing: 1px;
  @media (max-width: 900px) {
    font-size: 22px;
  }
`;

function ChangePassword() {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await updateUserPassword({ currPassword, newPassword });
    toast.success(response);
    setCurrPassword("");
    setNewPassword("");
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <SingleFormCol>
        <FormRow>
          <StyledSpan>current password</StyledSpan>
          <Input
            name={"current"}
            type="password"
            maxLength={12}
            value={currPassword}
            onChange={(e) => setCurrPassword(e.target.value)}
          />
        </FormRow>
      </SingleFormCol>
      <SingleFormCol>
        <FormRow>
          <StyledSpan>new password</StyledSpan>
          <Input
            name={"new"}
            type="password"
            maxLength={12}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormRow>
      </SingleFormCol>
      <Button type="submit">Save</Button>
    </StyledForm>
  );
}

export default ChangePassword;
