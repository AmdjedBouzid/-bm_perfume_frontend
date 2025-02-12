"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { DOMAIN } from "../utils/constants";
import Cookies from "js-cookie";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    const handlingGettingAdmin = async () => {
      try {
        let token = Cookies.get("Token");

        if (!token || typeof token !== "string") {
          console.log("No token found in cookies");
          Cookies.set("Token", "");
          Cookies.set("state", "notauthenticated");
          return;
        }

        const response = await axios.post(
          `${DOMAIN}/api/auth/me`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        console.log("response:", response.data);
        if (response.status === 200) {
          setAdmin(response.data.admin);
          Cookies.set("state", "authenticated");
        }
      } catch (error) {
        if (error.code !== "ERR_NETWORK") {
          Cookies.set("state", "notauthenticated");
          Cookies.set("Token", "");
        }

        console.error("Error:", error.response?.data || error.message);
      }
    };

    handlingGettingAdmin();
  }, []);

  return (
    <AppContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
