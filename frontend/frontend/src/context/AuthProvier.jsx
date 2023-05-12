import React, { createContext, useEffect, useState } from "react";
import { getIsAuth, signInUser } from "../api/auth";
import { useNotification } from "../hooks";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

const AuthProvier = ({ children }) => {
  const [authInfo, setauthInfo] = useState({ ...defaultAuthInfo });
  const { updateNotification } = useNotification();
  const handleLogin = async (email, password) => {
    setauthInfo({ ...authInfo, isPending: true });
    const { error, user } = await signInUser({ email, password });
    if (error) {
      updateNotification("error", error);
      return setauthInfo({ ...authInfo, isPending: false, error });
    }
    setauthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    localStorage.setItem("auth-token", user.token);
  };
  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;
    setauthInfo({ ...authInfo, isPending: true });
    const { error, user } = await getIsAuth(token);
    if (error) {
      updateNotification("error", error);
      return setauthInfo({ ...authInfo, isPending: false, error });
    }
    setauthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setauthInfo({ ...defaultAuthInfo });
  };
  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogin, isAuth, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvier;
