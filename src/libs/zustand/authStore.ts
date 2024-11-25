import { create } from "zustand";
import { LocalStorageLib } from "../localStorage.lib";
import { AxiosLibs } from "../axios-client";
import {
  AuthenticationResponseDto,
  UserProfileDto,
} from "@/orval/type.schemas";

type AuthStore = {
  profile: UserProfileDto | null;
  getProfile: () => void;
  logOut: () => void;
  logIn: (data: AuthenticationResponseDto) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  profile: null,
  getProfile: async () => {
    try {
      const tokens =
        (await LocalStorageLib.getJWTtoken()) as unknown as AuthenticationResponseDto;
      if (tokens) {
        AxiosLibs.setAccessToken(tokens.token as string);
        try {
          const { data } = await AxiosLibs.axiosClient.get("/api/User/profile");
          set((state) => ({
            ...state,
            profile: data.data,
          }));
        } catch (e) {
          window.alert(e);
        }
      }
    } catch (e) {
      throw e;
    }
  },
  logOut: () => {
    LocalStorageLib.clear();
    set((state) => ({
      ...state,
      profile: null,
    }));
    window.location.href = "/";
  },
  logIn: async (data) => {
    await LocalStorageLib.setJWTtoken(data);
    Promise.all([get().getProfile()]).then(() => {
      window.location.href = "/";
    });
  },
}));
