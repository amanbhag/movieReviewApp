import React, { useRef, useState } from "react";

import OtpInput from "react-otp-input";
import Container from "./Container";
import CustomLink from "./CustomLink";
import Submit from "./form/Submit";
import Title from "./form/Title";

const EmailVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const otpCopy = [...otp];

    // Update the OTP value at the current index
    otpCopy[index] = value;

    // If the current input is not the last input, focus on the next input
    if (index < inputRefs.current.length - 1 && value !== "") {
      inputRefs.current[index + 1].focus();
    }

    setOtp(otpCopy);
  };

  const handleKeyDown = (e, index) => {
    // If the backspace key is pressed and the current input is empty, focus on the previous input
    if (e.keyCode === 8 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center space-y-6">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <div>
            <Title>Please enter the otp to verify your account</Title>
            <p className="text-center text-dark-subtle">
              OTP has been sent to your email account
            </p>
          </div>
          <div>
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          <Submit value={`submit`} />

          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EmailVerification;
