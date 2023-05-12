import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="dark:text-dark-subtle text-black dark:hover:text-white transition hover:text-primary"
    >
      {children}
    </Link>
  );
};

export default CustomLink;
