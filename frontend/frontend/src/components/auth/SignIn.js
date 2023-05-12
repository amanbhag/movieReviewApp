import React, { useContext, useEffect, useState } from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
// import ThemeProvider, { ThemeContext } from "../../context/ThemeProvider";
import { useAuth, useNotification, useTheme } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { useNavigate } from "react-router-dom";
const validateUserInfo = ({ name, email, password }) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidName = /^[a-z A-Z]+$/;

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const SignIn = () => {
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;
  // console.log("isLoggedIn: ", isLoggedIn);
  // console.log("authInfo: ", authInfo);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return console.log("error", error);

    // if (!ok) return updateNotification("error", error);

    handleLogin(userInfo.email, userInfo.password);
  };
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + "w-72"} onSubmit={handleSubmit}>
          <Title>Sign in</Title>
          <FormInput
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            placeHolder="john@email.com"
            name="email"
          />
          <FormInput
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            placeHolder="******"
            name="password"
            type="password"
          />
          <Submit value="Sign In" busy={isPending} />

          <div className="flex justify-between">
            {" "}
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignIn;
