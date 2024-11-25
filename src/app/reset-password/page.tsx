"use client";

import Button from "@/components/Shared/Button";
import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import useIsMobile from "@/libs/useIsMobile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  ResetPasswordRequestDto,
  AuthenticationResponseDto,
} from "@/orval/type.schemas";
import axios from "axios";
import { validatePassword } from "@/libs/utils";
import { LocalStorageLib } from "@/libs/localStorage.lib";
import PasswordConditions from "@/components/Shared/PasswordConditions";
import { Colors } from "@/constants/Colors";

export default function Page() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const isMobile = useIsMobile();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const conditionsText = [
    "min 8 characters",
    "at least 1 number",
    "at least 1 special character (example:@#$!&)",
    "at least 1 uppercase letter (A-Z)",
  ];
  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordRequestDto) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Auth/ResetPassword`,
        data
      );
    },
  });

  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    const token = params.get("token");
    const email = params.get("email");
    if (token && email) {
      setToken(token);
      setEmail(email);
    } else {
      router.replace("/");
    }
  }, [router]);

  return (
    <main className={`flex flex-1 min-h-screen flex-col bg-[#F8F1EA]`}>
      <div
        className={`flex flex-1 justify-center items-center ${
          isMobile ? `py-4` : `py-20`
        }`}
      >
        <div className={`flex flex-col ${isMobile ? `w-[90%]` : `w-[35%]`}`}>
          <TextInput
            type={"password"}
            title="Password"
            value={password}
            placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6"
          />
          <PasswordConditions password={password} />
          <TextInput
            type={"password"}
            title="Confirm Password"
            value={confirmPassword}
            placeholder="enter your confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 mt-10"
          />
          <Button
            title="Reset"
            className="p-4 mt-6 text-white"
            isLoading={resetPasswordMutation.isPending}
            disabled={resetPasswordMutation.isPending}
            style={{
              backgroundColor:
                password == confirmPassword ? Colors.primary : Colors.darkGray,
            }}
            onClick={async () => {
              if (!validatePassword(password)) {
                window.alert("Password not meet condition");
              } else if (password != confirmPassword) {
                window.alert("Password not same as confirm password");
              } else {
                await resetPasswordMutation.mutate(
                  {
                    token: token?.replaceAll(" ", "+"),
                    email: email,
                    password: confirmPassword,
                  },
                  {
                    onSuccess: async (response) => {
                      const data = response.data as AuthenticationResponseDto;
                      await LocalStorageLib.setJWTtoken(data);
                      window.alert("Password has been reset successfully");
                      router.replace("/");
                    },
                    onError: (e) => {
                      window.alert(e.message);
                    },
                  }
                );
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}
