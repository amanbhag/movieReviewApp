import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div className="fixed inset-0 dark:bg-primary -z-10 flex justify-center items-center space-y-6">
      {children}
    </div>
  );
};

export default FormContainer;
