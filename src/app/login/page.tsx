"use client";

import useIsMobile from "@/libs/useIsMobile";
import LoginForm from "./login-components/LoginForm";
import { useState } from "react";
import ForgotPasswordForm from "./login-components/ForgotPasswordForm";
import { useMutation } from "@tanstack/react-query";
import {
  AuthenticationResponseDto,
  ForgotPasswordRequestDto,
  LoginDto,
  ResponseDto,
} from "@/orval/type.schemas";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/libs/zustand/authStore";

export default function Page() {
  const authStore = useAuthStore();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isVisibleForgotPasswordForm, setIsVisibleForgotPasswordForm] =
    useState<boolean>(false);
  const loginMutation = useMutation({
    mutationFn: async (data: LoginDto) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Auth/Login`,
        data
      );
    },
  });
  const requestForgotPasswordMutation = useMutation({
    mutationFn: async (data: ForgotPasswordRequestDto) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Auth/ForgotPassword`,
        data
      );
    },
  });
  return (
    <main
      className="flex flex-col w-full min-h-screen"
      style={{
        backgroundColor: Colors.lightGrayishOrange,
        height: "100%",
        flex: 1,
      }}
    >
      <div
        className={`flex flex-1 justify-center items-center ${
          isMobile ? `py-4` : `py-20`
        }`}
      >
        {isVisibleForgotPasswordForm ? (
          <ForgotPasswordForm
            isLoading={requestForgotPasswordMutation.isPending}
            onSubmit={async (email) => {
              await requestForgotPasswordMutation.mutate(
                {
                  email,
                },
                {
                  onSuccess: async (response) => {
                    const data = response.data as ResponseDto;
                    if (data.isSuccess) {
                      window.alert(
                        `We had sent a reset password link to ${email}.`
                      );
                      router.replace("/");
                    } else {
                      window.alert(data.errMessage);
                    }
                  },
                  onError: (e) => {
                    window.alert(e.message);
                  },
                }
              );
            }}
            onBack={() => setIsVisibleForgotPasswordForm(false)}
          />
        ) : (
          <LoginForm
            isLoading={loginMutation.isPending}
            onSubmit={async ({ email, password }) => {
              await loginMutation.mutate(
                {
                  email,
                  password,
                },
                {
                  onSuccess: async (response) => {
                    const data = response.data as AuthenticationResponseDto;
                    authStore.logIn(data);
                  },
                  onError: (e) => {
                    window.alert(e.message);
                  },
                }
              );
            }}
            onForgotPassowrd={() => setIsVisibleForgotPasswordForm(true)}
          />
        )}
      </div>
    </main>
  );
}
