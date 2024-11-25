"use client";

import Button from "@/components/Shared/Button";
import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import useIsMobile from "@/libs/useIsMobile";
import { useState } from "react";

export default function NotifyContainer() {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState<string>("");
  return (
    <div className={`flex bg-[#F2F2F2] ${isMobile ? `` : ``}`}>
      {!isMobile && <div className="flex flex-1" />}
      <div
        className={`flex flex-col flex-1 ${
          isMobile ? `p-8` : `p-20 items-start`
        }`}
      >
        <Text
          size={`${isMobile ? `medium` : `2-extra-big`}`}
          title="Can't Find What You Looking For?"
          className="mb-4 text-center"
        />
        <Text
          size={`${isMobile ? `small` : `medium`}`}
          title="Let us know, and you will get notified when the heavy machine in store"
          className="mb-4 text-center"
        />
        <div
          className={`flex w-full ${
            isMobile ? `flex-col self-center` : `flex-row self-start`
          }`}
        >
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="none"
            placeholder="Enter your email here"
            iconLeft={
              <CustomIcon
                name={"ic:baseline-email"}
                size={20}
                color={"#4c1e1e"}
                className="absolute left-4 top-3"
              />
            }
            className={`${isMobile ? `mb-4` : `w-[80%]`}`}
          />
          <Button title="Notify me" className={`p-2 rounded-full bg-[#4A4A4A] text-white`} />
        </div>
      </div>
    </div>
  );
}
