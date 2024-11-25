"use client";

import useIsMobile from "@/libs/useIsMobile";
import { useState } from "react";
import EmailForm from "./sign-up-components/EmailForm";
import OtpForm from "./sign-up-components/OtpForm";
import PhoneNumberForm from "./sign-up-components/PhoneNumberForm";
import ConfirmPasswordForm from "./sign-up-components/ConfirmPasswordForm";
import {
  AuthenticationResponseDtoDataResponseDto,
  EmailExistsRequestDto,
  EmailExistsResponseDto,
  GenerateOtpForRegistrationDto,
  RegisterDto,
  ResponseDto,
  VerifyOtpDto,
} from "@/orval/type.schemas";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LocalStorageLib } from "@/libs/localStorage.lib";

export default function Page() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [step, setStep] = useState<
    "email" | "otp" | "phoneNumber" | "password"
  >("email");
  const [registerForm, setRegisterForm] = useState<RegisterDto>({
    confirmPassword: null,
    email: "",
    password: "",
    phoneNumber: "",
    otpCode: "",
  });
  const checkEmailMutation = useMutation({
    mutationFn: async (data: EmailExistsRequestDto) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Auth/CheckEmail`,
        data
      );
    },
  });
  const generateOtpMutation = useMutation({
    mutationFn: async (data: GenerateOtpForRegistrationDto) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Otp/GenerateOtpForRegistration`,
        data
      );
    },
  });
  const verifyOtpMutation = useMutation({
    mutationFn: async (data: VerifyOtpDto) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Otp/VerifyOtpForRegistration`,
        data
      );
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterDto) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Auth/Register`,
        data
      );
    },
  });

  const isLoading =
    checkEmailMutation.isPending ||
    generateOtpMutation.isPending ||
    verifyOtpMutation.isPending ||
    registerMutation.isPending;
  return (
    <main className={`flex flex-1 min-h-screen flex-col bg-[#F8F1EA]`}>
      <div
        className={`flex flex-1 justify-center items-center ${
          isMobile ? `` : `py-20`
        }`}
      >
        {step == "email" && (
          <EmailForm
            isLoading={isLoading}
            onNext={async (email) => {
              await checkEmailMutation.mutate(
                {
                  email: email,
                },
                {
                  onSuccess: async (response) => {
                    const data = response.data as EmailExistsResponseDto;
                    if (data.emailExists) {
                      window.alert("email exits");
                    } else {
                      setRegisterForm((prevState) => ({ ...prevState, email }));
                      setStep("otp");
                    }
                  },
                  onError: (e) => {
                    window.alert(e.message);
                  },
                }
              );
            }}
          />
        )}
        {step == "otp" && (
          <OtpForm
            isLoading={isLoading}
            onNext={async (otp) => {
              await verifyOtpMutation.mutate(
                {
                  email: registerForm.email,
                  otp: otp,
                },
                {
                  onSuccess: async (response) => {
                    const data = response.data as ResponseDto;
                    if (data.isSuccess) {
                      setRegisterForm((prevState) => ({
                        ...prevState,
                        otpCode: otp,
                      }));
                      setStep("phoneNumber");
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
            onPrev={() => setStep("email")}
            onResend={async () => {
              await generateOtpMutation.mutate(
                {
                  email: registerForm.email,
                },
                {
                  onSuccess: async (response) => {
                    const data = response.data as ResponseDto;
                    if (data.isSuccess) {
                      window.alert("Please check email");
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
          />
        )}
        {step == "phoneNumber" && (
          <PhoneNumberForm
            onNext={(phoneNumber) => {
              setRegisterForm((prevState) => ({ ...prevState, phoneNumber }));
              setStep("password");
            }}
            onPrev={() => setStep("email")}
          />
        )}
        {step == "password" && (
          <ConfirmPasswordForm
            isLoading={isLoading}
            onSubmit={async (data) => {
              await registerMutation.mutate(
                {
                  ...registerForm,
                  password: data.password,
                  confirmPassword: data.confirmPassword,
                  picFullName: data.picFullName,
                  companyName: data.companyName,
                },
                {
                  onSuccess: async (response) => {
                    const data =
                      response.data as AuthenticationResponseDtoDataResponseDto;
                    if (data.isSuccess && data.data) {
                      window.alert("Registered successfully");
                      await LocalStorageLib.setJWTtoken(data.data);
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
            onPrev={() => {
              setStep("phoneNumber");
            }}
          />
        )}
      </div>
    </main>
  );
}
