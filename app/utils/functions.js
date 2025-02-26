"use client";
import { DOMAIN } from "../utils/constants";
import Cookies from "js-cookie";
import axios from "axios";
export const handlingGettingAdmin = async () => {
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

    // console.log("response:", response.data);
    if (response.status === 200) {
      Cookies.set("state", "authenticated");
      return response.data.admin;
    }
  } catch (error) {
    if (error.code !== "ERR_NETWORK") {
      Cookies.set("state", "notauthenticated");
      Cookies.set("Token", "");
    }

    console.log("Error:", error.response?.data || error.message);
    return null;
  }
};
export const handlingGettingBrands = async () => {
  try {
    // let token = Cookies.get("Token");
    const response = await axios.get(
      `${DOMAIN}/api/Brand`,
      {},
      {
        headers: {
          //   Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.data.brands;
    }
  } catch (error) {
    console.log("error getting brands", error);
    return null;
  }
};
export default { handlingGettingAdmin, handlingGettingBrands };
