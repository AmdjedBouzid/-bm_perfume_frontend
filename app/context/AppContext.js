"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { DOMAIN } from "../utils/constants";
import Cookies from "js-cookie";
import {
  handlingGettingAdmin,
  handlingGettingBrands,
} from "../utils/functions";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [admin, setAdmin] = useState("");
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [allPerfumes, setAllPerfumes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminData = await handlingGettingAdmin();
        const brandsData = await handlingGettingBrands();

        setAdmin(adminData || null);
        setBrands(brandsData || []);
        // console.log("Fetched brands:", brandsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        admin,
        setAdmin,
        products,
        setProducts,
        brands,
        setBrands,
        allPerfumes,
        setAllPerfumes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
