"use client";

import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import useIsMobile from "@/libs/useIsMobile";
import Button from "@/components/Shared/Button";
import { useState } from "react";
import ButtonIcon from "@/components/Shared/ButtonIcon";
import CustomIcon from "@/components/Shared/CustomIcon";
import { validatePassword } from "@/libs/utils";
import { Colors } from "@/constants/Colors";
import PasswordConditions from "@/components/Shared/PasswordConditions";

interface ConfirmPasswordFormProps {
  isLoading: boolean;
  onSubmit({
    password,
    confirmPassword,
    companyName,
    picFullName,
  }: {
    password: string;
    confirmPassword: string;
    companyName: string;
    picFullName: string;
  }): void;
  onPrev(): void;
}

export default function ConfirmPasswordForm(props: ConfirmPasswordFormProps) {
  const isMobile = useIsMobile();
  const [companyName, setCompanyName] = useState<string>("");
  const [picFullName, setPicFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const isDisabledNext =
    companyName.trim().length == 0 ||
    picFullName.trim().length == 0 ||
    password.trim().length == 0 ||
    confirmPassword.trim().length == 0;
  return (
    <div className={`flex flex-col ${isMobile ? `w-[90%]` : `w-[35%]`}`}>
      <img
        src={`/logo.png`}
        alt=""
        className={`${isMobile ? `mx-8` : ``}`}
        style={{
          width: isMobile ? 50 : 100,
          height: 80,
          objectFit: "contain",
          marginBottom: 20,
          alignSelf: "center",
        }}
      />
      <div className={`flex mb-10`}>
        <ButtonIcon
          icon={
            <CustomIcon
              name="mingcute:left-line"
              size={isMobile ? 25 : 40}
              color={"#000"}
            />
          }
          onClick={() => {
            props.onPrev();
          }}
          className="mr-2"
        />
        <Text
          title={`Step 3 of 3\nCreate your password`}
          size="medium"
          className="whitespace-pre-line"
        />
      </div>
      <TextInput
        id={"companyName"}
        type={"text"}
        title="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="mb-6"
      />
      <TextInput
        id={"picFullName"}
        type={"text"}
        title="Your Full Name"
        value={picFullName}
        onChange={(e) => setPicFullName(e.target.value)}
        className="mb-6"
      />
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
        isLoading={props.isLoading}
        disabled={props.isLoading || isDisabledNext}
        title="Next"
        className="p-4 mt-6 text-white"
        onClick={() => {
          if (!validatePassword(password)) {
            window.alert("Password not meet condition");
          } else if (password != confirmPassword) {
            window.alert("Password not same as confirm password");
          } else {
            props.onSubmit({
              companyName,
              picFullName,
              password,
              confirmPassword,
            });
          }
        }}
        style={{
          backgroundColor: isDisabledNext ? Colors.darkGray : Colors.primary,
        }}
      />
    </div>
  );
}
