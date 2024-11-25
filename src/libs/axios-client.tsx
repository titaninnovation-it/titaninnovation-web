"use client";

import Axios from "axios";
import { LocalStorageLib } from "./localStorage.lib";
import { AuthenticationResponseDto } from "@/orval/type.schemas";

const axiosClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      if (Axios.isAxiosError(error) && error.response?.status === 401) {
        const tokens =
          (await LocalStorageLib.getJWTtoken()) as unknown as AuthenticationResponseDto;
        const response = await refreshAuth(
          tokens.token as string,
          tokens.refreshToken as string
        );
        await LocalStorageLib.setJWTtoken(response?.data);
        if (error.config) {
          const newRequestConfig = { ...error.config };
          newRequestConfig.headers = {
            ...error.config.headers,
            Authorization: `Bearer ${response?.data.token}`,
          } as any;
          return await axiosClient(newRequestConfig);
        }
      } else {
        return Promise.reject(error);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const setAccessToken = (token: string) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const refreshAuth = async (token: string, refreshToken: string) => {
  try {
    return await axiosClient({
      timeout: 60000,
      url: process.env.NEXT_PUBLIC_API_URL + "/api/Auth/GenerateNewJwtToken",
      method: "POST",
      data: {
        token: token,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    LocalStorageLib.clear();
    window.location.href = "/login";
  }
};

export const AxiosLibs = {
  setAccessToken,
  axiosClient,
};
