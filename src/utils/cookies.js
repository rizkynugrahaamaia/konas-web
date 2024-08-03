import Cookies from 'js-cookie';
// import { jwtDecode } from "jwt-decode";
const KONAS_TOKEN = 'konas_token1';

export const getCookies = () => {
  return Cookies.get(KONAS_TOKEN);
};

export const setCookies = (value) => {
    Cookies.set(KONAS_TOKEN, value, {});
};

export const clearCookies = () => {
   Cookies.remove(KONAS_TOKEN);
};
