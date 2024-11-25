"use client";

import Button from "@/components/Shared/Button";
import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import useIsMobile from "@/libs/useIsMobile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ChangePasswordDto, ResponseDto } from "@/orval/type.schemas";
import { validatePassword } from "@/libs/utils";
import { LocalStorageLib } from "@/libs/localStorage.lib";
import { AxiosLibs } from "@/libs/axios-client";
import { Colors } from "@/constants/Colors";
import PasswordConditions from "@/components/Shared/PasswordConditions";

export default function Page() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const conditionsText = [
    "min 8 characters",
    "at least 1 number",
    "at least 1 special character (example:@#$!&)",
    "at least 1 uppercase letter (A-Z)",
  ];
  const changePasswordMutation = useMutation({
    mutationFn: async (data: ChangePasswordDto) => {
      return AxiosLibs.axiosClient.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Auth/ChangePassword`,
        data
      );
    },
  });

  // useEffect(() => {
  //   const init = async () => {
  //     const tokens = await LocalStorageLib.getJWTToken();
  //     if (tokens) {
  //     } else {
  //       router.replace("/");
  //     }
  //   };
  //   init();
  // }, []);

  return (
    <main className={`flex flex-col bg-[#FAF3EA]`}>
      <div
        className={`flex flex-1 justify-center items-center ${
          isMobile ? `py-4` : `py-20`
        }`}
      >
        <div className={`flex flex-col ${isMobile ? `w-[90%]` : `w-[45%]`}`}>
          <Text
            title={`Change Password`}
            size="2-extra-big"
            className="mb-6 text-center whitespace-pre-line"
          />
          <TextInput
            type={"password"}
            title="Current Password"
            value={currentPassword}
            placeholder="enter your current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mb-6"
          />
          <TextInput
            type={"password"}
            title="Password"
            value={newPassword}
            placeholder="enter your password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-6"
          />
          <PasswordConditions password={newPassword} />
          <TextInput
            type={"password"}
            title="Confirm Password"
            value={confirmPassword}
            placeholder="enter your confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 mt-10"
          />
          <Button
            title="Save"
            className="p-4 mt-6"
            isLoading={changePasswordMutation.isPending}
            style={{
              backgroundColor: Colors.primary,
            }}
            onClick={async () => {
              if (!validatePassword(newPassword)) {
                window.alert("Password not meet condition");
              } else if (newPassword != confirmPassword) {
                window.alert("Password not same as confirm password");
              } else {
                await changePasswordMutation.mutate(
                  {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                  },
                  {
                    onSuccess: async (response) => {
                      const data = response.data as ResponseDto;
                      if (data.isSuccess) {
                        window.alert("Changed successfully");
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
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}
