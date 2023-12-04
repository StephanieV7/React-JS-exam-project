import React, { createContext, useState } from "react";

const PassengerInfoContext = createContext();

export const PassengerInfoProvider = ({ children }) => {
  const [addedInfo, setAddedInfo] = useState(false);

const values = {
  addedInfo,
  setAddedInfo
}

  return (
    <PassengerInfoContext.Provider value={values}>
      {children}
    </PassengerInfoContext.Provider>
  );
};

export default PassengerInfoProvider;
