import React, { useEffect, useState } from "react";
import Container from "../Container";
// import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
import OtpInput from "react-otp-input";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmailVerificationToken, verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";

const EmailVerification = () => {
  const { state } = useLocation();
  const user = state?.user;
  console.log("user: ", user);
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  console.log("isLoggedIn: ", isLoggedIn);
  const { updateNotification } = useNotification();
  const isVerified = user?.isVerified;
  console.log("isVerified: ", isVerified);

  let navigate = useNavigate();

  const [otp, setOtp] = useState("");
  console.log("user from console checl" + user);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length < 6) return updateNotification("error", "invalid otp");
    const {
      error,
      message,
      user: userResPonse,
    } = await verifyUserEmail({
      userId: user.id,
      OTP: otp,
    });
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    localStorage.setItem("auth-token", userResPonse.token);
    isAuth();
  };
  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user, isLoggedIn, isVerified]);
  let handleClick = async () => {
    console.log("checking user" + user.id);
    const response = await resendEmailVerificationToken(user.id);
    if (response.error) return updateNotification("error", response.error);

    updateNotification("success", response.message);
  };
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>
            <Title>Please enter the otp to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-suble">
              OTP has been sent to your email account
            </p>
          </div>
          <div className="flex justify-center items-center space-x-100 ">
            <OtpInput
              value={otp}
              onChange={setOtp}
              shouldAutoFocus={true}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  type="number"
                  className="h-10 w-auto border-2 dark:border-dark-subtle border-light-suble dark:focus:border-white focus:border-primary bg-transparent dark:text-white text-primary outline-none text-center font-semibold text-2xl mr-2"
                />
              )}
            />
          </div>
          <div>
            <Submit value={`Verify account`} />
            <button
              type="button"
              onClick={handleClick}
              className="dark:text-white text-blue-500 font-semibold hover:underline mt-2"
            >
              Request for new otp
            </button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
