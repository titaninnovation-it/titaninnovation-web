"use client";

import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import useIsMobile from "@/libs/useIsMobile";
import Button from "@/components/Shared/Button";
import { useEffect, useState } from "react";
import ButtonIcon from "@/components/Shared/ButtonIcon";
import CustomIcon from "@/components/Shared/CustomIcon";
import dayjs from "dayjs";
import { Colors } from "@/constants/Colors";

interface OtpFormProps {
  isLoading: boolean;
  onNext(otp: string): void;
  onPrev(): void;
  onResend(): void;
}

export default function OtpForm(props: OtpFormProps) {
  const isMobile = useIsMobile();
  const [otp, setOtp] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(60000);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (seconds) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const leftSeconds = (prevSeconds as number) - 1000;
          return leftSeconds;
        });
      }, 1000);
    } else if (seconds < 0) {
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [seconds]);

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
          title={`Step 1 of 3\nVerify your email`}
          size="medium"
          className="whitespace-pre-line"
        />
      </div>
      <TextInput
        title="Enter the 6 digit OTP number that we send to your email"
        maxLength={6}
        value={otp}
        placeholder="000000"
        onChange={(e) => setOtp(e.target.value)}
        type={"number"}
        className="mb-2"
      />
      <Button
        title={`Resend ${dayjs.duration(seconds).format("mm:ss")}`}
        disabled={seconds > 0}
        isLoading={props.isLoading}
        className="self-end p-2 text-white"
        onClick={() => props.onResend()}
        style={{
          backgroundColor: seconds > 0 ? Colors.darkGray : Colors.primary,
        }}
      />
      <Button
        title="Next"
        isLoading={props.isLoading}
        className="p-4 mt-6 text-white"
        onClick={() => props.onNext(otp)}
        style={{
          backgroundColor: otp.length < 6 ? Colors.darkGray : Colors.primary,
        }}
      />
    </div>
  );
}
