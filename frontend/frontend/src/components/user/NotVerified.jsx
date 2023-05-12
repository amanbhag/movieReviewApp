import React from "react";
import { useAuth } from "../../hooks";
import Container from "../Container";
import { useNavigate } from "react-router-dom";

const NotVerified = () => {
  const { authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const navigate = useNavigate();

  const isVerified = authInfo.profile?.isVerified;
  const navigateToVerification = () => {
    navigate("auth/verification", { state: { user: authInfo.profile } });
  };

  console.log("authInfo: ", authInfo);
  return (
    <Container>
      {isLoggedIn && !isVerified ? (
        <p className="text-lg text-center bg-blue-50 p-2 ">
          It looks like you have not verified your account ,
          <button
            onClick={navigateToVerification}
            className="text-blue-500 font-semibold hover:underline"
          >
            click here to your verify your account
          </button>
        </p>
      ) : null}
    </Container>
  );
};

export default NotVerified;
