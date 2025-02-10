"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);
export const AppProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  return (
    <AppContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};
