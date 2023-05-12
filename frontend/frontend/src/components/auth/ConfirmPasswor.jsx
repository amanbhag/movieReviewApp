import React, { useEffect, useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import { resetPassword, verifyPassResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";

const ConfirmPassword = () => {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isverifying, setisVerifying] = useState(true);
  const [isValid, setIsValid] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  let token = searchParams.get("token");
  console.log("token: ", token);
  let id = searchParams.get("id");
  console.log("id: ", id);
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPassResetToken(token, id);
    setisVerifying(false);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }

    setIsValid(true);
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.one.trim())
      return updateNotification("error", "password is missing");
    if (password.one.trim().length < 8)
      return updateNotification("error", "password must be 8 characters long");
    if (password.one !== password.two)
      return updateNotification("error", "password do not match");
    const { error, message } = resetPassword({
      newPassword: password.one,
      userId: id,
      token,
    });

    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    navigate("/auth/signin", { replace: true });
  };

  if (isverifying) {
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait we are verifying your token{" "}
            </h1>
            <span>
              <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary " />
            </span>
          </div>
        </Container>
      </FormContainer>
    );
  }
  if (!isValid) {
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait we are verifying your token{" "}
            </h1>
            <span>
              <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary " />
            </span>
          </div>
        </Container>
      </FormContainer>
    );
  }
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + "w-96"}>
          <Title>Enter new pasword</Title>
          <FormInput
            label="New password"
            placeHolder="***********"
            name="one"
            type="password"
            value={password.one}
            onChange={handleChange}
          />
          <FormInput
            label="Confirm password"
            placeHolder="***********"
            name="two"
            type="password"
            value={password.two}
            onChange={handleChange}
          />
          <Submit value="Submit" />

          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default ConfirmPassword;
