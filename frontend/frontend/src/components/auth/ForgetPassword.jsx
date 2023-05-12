import React, { useState } from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { forgetPasswordofuser } from "../../api/auth";
import { useAuth, useNotification, useTheme } from "../../hooks";

const validateUserInfo = (email) => {
  console.log("emailfrom: ", email);
  console.log("email: ", email);

  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email!" };
  return { ok: true };
};

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  console.log("email: ", email);
  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { ok, error } = validateUserInfo(email);

    // if (!ok) return updateNotification("error", error);

    const { error, message } = await forgetPasswordofuser(email);
    console.log("message: ", message);

    if (error) return updateNotification("error", error);
    updateNotification("success", message);
  };
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + "w-96"}>
          <Title>Please enter your email</Title>
          <FormInput
            label="Email"
            placeHolder="john@email.com"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <Submit value="Submit" />

          <div className="flex justify-between">
            {" "}
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default ForgetPassword;
