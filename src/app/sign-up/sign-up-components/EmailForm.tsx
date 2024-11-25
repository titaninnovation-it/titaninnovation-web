"use client";

import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import useIsMobile from "@/libs/useIsMobile";
import Button from "@/components/Shared/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { Colors } from "@/constants/Colors";
interface EmailFormProps {
  isLoading: boolean;
  onNext(email: string): void;
}

export default function EmailForm(props: EmailFormProps) {
  const [captcha, setCaptcha] = useState<null | string>(null);
  const isMobile = useIsMobile();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
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
        title={`Sign up to start\nexperience`}
        size="2-extra-big"
        className="mb-6 text-center whitespace-pre-line"
      />
      <TextInput
        required={email.trim().length == 0}
        title="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-8"
      />
      <ReCAPTCHA
        sitekey="6Ld2vIAqAAAAACFc73GCd3Vhl0xlmic0_EooAQZJ"
        onChange={(data) => setCaptcha(data)}
      />
      <Button
        className="p-2 rounded-full mb-6 mt-6 text-white"
        title="Next"
        style={{
          backgroundColor:
            captcha && email.trim().length > 0 ? Colors.primary : Colors.darkGray,
        }}
        disabled={!captcha}
        isLoading={props.isLoading}
        onClick={() => props.onNext(email)}
      />
      <div className={`flex items-center`}>
        <Text title="Already have an account?" size="small" />
        <Button
          title="Login here"
          className={`text-blue-500 bg-transparent shadow-none ml-2`}
          onClick={() => router.push("/login")}
        />
      </div>
    </div>
  );
}
