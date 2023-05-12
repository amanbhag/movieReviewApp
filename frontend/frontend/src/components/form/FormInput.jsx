import React from "react";

const FormInput = ({ name, label, placeholder, ...rest }) => {
  return (
    <div className="flex flex-col-reverse">
      <input
        type="text"
        id={name}
        name={name}
        className="bg-transparent rounded border-2 dark:border-dark-subtle  border-light-suble    w-full text-lg outline-none dark:focus:border-white focus:border-primary dark:text-white p-1 text-primary-subtle peer transition self-start"
        placeholder={placeholder}
        {...rest}
      ></input>
      <label
        htmlFor={name}
        className="font-sembold dark:text-dark-subtle text-light-suble dark:peer-focus:text-primary transition self-start"
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
