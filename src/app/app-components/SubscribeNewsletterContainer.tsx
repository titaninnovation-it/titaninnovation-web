"use client";

import Button from "@/components/Shared/Button";
import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import useIsMobile from "@/libs/useIsMobile";
import { useState } from "react";

export default function SubscribeNewsletterContainer() {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState<string>("");
  return (
    <div className={`p-4 ${isMobile ? `` : `w-[70%] self-center`}`}>
      <div
        className={`flex flex-col bg-[#F2F2F2] rounded-tl-3xl rounded ${
          isMobile ? `p-8` : `p-20`
        }`}
      >
        <Text
          size={`${isMobile ? `medium` : `2-extra-big`}`}
          title="Subscribe to get information, latest news and other interesting offers about Titan Innovation."
          className="mb-4 text-center"
        />
        <div
          className={`flex self-center ${isMobile ? `flex-col` : `flex-row`}`}
        >
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="none"
            iconLeft={
              <CustomIcon
                name={"ic:baseline-email"}
                size={20}
                color={"#939393"}
                className="absolute left-4 top-3"
              />
            }
            className={`${isMobile ? `mb-4` : `w-[80%] mr-4`}`}
          />
          <Button title="Subscribe" className={`p-2 rounded-full`} />
        </div>
      </div>
    </div>
  );
}
