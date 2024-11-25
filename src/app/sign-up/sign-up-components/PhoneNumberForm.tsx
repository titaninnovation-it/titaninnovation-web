"use client";

import Button from "@/components/Shared/Button";
import ButtonIcon from "@/components/Shared/ButtonIcon";
import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import { Colors } from "@/constants/Colors";
import useIsMobile from "@/libs/useIsMobile";
import { useState } from "react";

interface PhoneNumberFormProps {
  onNext(phoneNumber: string): void;
  onPrev(): void;
}

export default function PhoneNumberForm(props: PhoneNumberFormProps) {
  const isMobile = useIsMobile();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  return (
    <div
      className={`flex flex-col p-10 rounded-lg ${
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
          title={`Step 2 of 3\nVerify your phone number`}
          size="medium"
          className="whitespace-pre-line"
        />
      </div>
      <TextInput
        title="Phone Number"
        maxLength={6}
        placeholder="011234XXXX"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        type={"tel"}
        className="mb-2"
      />
      <Button
        title="Next"
        disabled={phoneNumber.trim().length == 0}
        className="p-4 mt-6 text-white"
        onClick={() => props.onNext(phoneNumber)}
        style={{
          backgroundColor:
            phoneNumber.length < 1 ? Colors.darkGray : Colors.primary,
        }}
      />
    </div>
  );
}
