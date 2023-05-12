import { Route, Routes } from "react-router-dom";
import ConfirmPassword from "./components/auth/ConfirmPasswor";
// import ConfirmPasswor from "./components/auth/ConfirmPasswor";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import SignIn from "./components/auth/SignIn";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import OtpInput from "./components/OtpINput";
import NavBar from "./components/user/NavBar";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <>
      <NavBar />
      {/* <div className="fixed left-1/2 -translate-x-1/2 top-24">
        <div className="bounce-cutom shadow-md shadow-gray-400 bg-red-400 rounded">
          <p className="text-white px-4 font-semibold">Something went wrong</p>
        </div>
      </div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ConfirmPassword />} />
        <Route path="/auth/confirm-password2-checking" element={<OtpInput />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
