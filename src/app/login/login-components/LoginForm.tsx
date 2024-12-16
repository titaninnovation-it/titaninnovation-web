"use client";

import Button from "@/components/Shared/Button";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import { Colors } from "@/constants/Colors";
import useIsMobile from "@/libs/useIsMobile";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormProps {
  isLoading: boolean;
  onSubmit(data: { email: string; password: string }): void;
  onForgotPassowrd(): void;
}

export default function LoginForm(props: LoginFormProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isDisabledLoginButton =
    email.trim().length == 0 || password.trim().length < 5 || props.isLoading;

  return (
    <div
      className={`flex flex-col p-10 rounded-lg bg-white ${
        isMobile ? `w-[90%]` : `w-[35%]`
      }`}
    >
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
      <Text
        title={`Login to Titan Innovation`}
        size="2-extra-big"
        className="mb-6 text-center whitespace-pre-line"
      />
      <TextInput
        title="Email"
        value={email}
        autoCapitalize={'none'}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <TextInput
        title="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2"
      />
      <Button
        title="Forgot Password?"
        className={`text-blue-500 bg-transparent shadow-none self-end mb-6`}
        onClick={() => props.onForgotPassowrd()}
      />
      <Button
        className="p-2 rounded-full mb-6 text-white"
        disabled={isDisabledLoginButton}
        isLoading={props.isLoading}
        title="Login"
        style={{
          backgroundColor: isDisabledLoginButton
            ? Colors.darkGray
            : Colors.primary,
        }}
        onClick={() =>
          props.onSubmit({
            email,
            password,
          })
        }
      />
      <div className={`flex items-center`}>
        <Text title="Don't you have an account?" size="small" />
        <Button
          isLoading={props.isLoading}
          title="Sign Up"
          className={`text-blue-500 bg-transparent shadow-none ml-2`}
          onClick={() => {
            router.push("/sign-up");
          }}
        />
      </div>
    </div>
  );
}
