import React, { createContext, useContext, useState } from "react";
export const NotiFicationContext = createContext();
let timeoutId;

const NotificationProver = ({ children }) => {
  if (timeoutId) clearTimeout(timeoutId);
  const [notfication, setnotfication] = useState();
  const [classes, setclasses] = useState("");
  const updateNotification = (type, value) => {
    switch (type) {
      case "error":
        setclasses("bg-red-500");

        break;

      case "success":
        setclasses("bg-green-500");
        break;
      case "warning":
        setclasses("bg-orange-500");
      default:
        setclasses("bg-red-500");
    }
    setnotfication(value);
    setTimeout(() => {
      setnotfication("");
    }, 3000);
  };

  return (
    <NotiFicationContext.Provider value={{ updateNotification }}>
      {children}
      {notfication && (
        <div className="fixed left-1/2 -translate-x-1/2 top-24">
          <div className="bounce-cutom shadow-md shadow-gray-400 rounded">
            <p className={classes + " text-white px-4 font-semibold"}>
              {notfication}
            </p>
          </div>
        </div>
      )}
    </NotiFicationContext.Provider>
  );
};

export default NotificationProver;
