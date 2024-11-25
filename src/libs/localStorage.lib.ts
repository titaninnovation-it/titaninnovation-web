import { AuthenticationResponseDto } from "@/orval/type.schemas";

const JWTTOKEN = "JWTTOKEN";

const setJWTtoken = (data: AuthenticationResponseDto) => {
  return localStorage.setItem(JWTTOKEN, JSON.stringify(data));
};

const getJWTtoken = () => {
  let data = localStorage.getItem(JWTTOKEN);
  if (data) {
    return JSON.parse(data) as AuthenticationResponseDto;
  } else {
    return null;
  }
};

const removeJWTtoken = () => {
  localStorage.removeItem(JWTTOKEN);
};

const clear = () => {
  localStorage.clear();
};

export const LocalStorageLib = {
  setJWTtoken,
  getJWTtoken,
  removeJWTtoken,
  clear,
};
