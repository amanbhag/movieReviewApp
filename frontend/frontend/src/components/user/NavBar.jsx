import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import Container from "../Container";

const NavBar = () => {
  const { toggleMode } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  console.log("isLoggedIn: ", isLoggedIn);

  return (
    <div className="bg-secondary shadown-sm shadow-gray-500">
      <Container className="  p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            {" "}
            <img src="./logo.png" alt="5*Mrp" className="h-10" />
          </Link>

          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={toggleMode}
                className="dark:bg-white bg-dark-subtle p-1 rounded"
              >
                <BsFillSunFill className="text-secondary" />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1  rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
                placeholder="search"
              />
            </li>
            <Link to="/auth/signin">
              <li>
                {isLoggedIn ? (
                  <button
                    className="text-white font-semibold text-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="text-white font-semibold text-lg"
                    to="/auth/sign-in"
                  >
                    LogIn
                  </button>
                )}
              </li>
            </Link>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
