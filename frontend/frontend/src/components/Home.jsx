import React from "react";
import { useAuth } from "../hooks";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import NotVerified from "./user/NotVerified";

const Home = () => {
  return <NotVerified />;
};

export default Home;
