"use client";

import Button from "@/components/Shared/Button";
import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";

export default function LetUsSellContainer() {
  const isMobile = useIsMobile();
  return (
    <div className={`flex bg-[#F2F2F2] ${isMobile ? `` : ``}`}>
      <div
        className={`flex flex-col flex-1 items-center ${
          isMobile ? `p-8` : `p-20`
        }`}
      >
        <Text
          size={`${isMobile ? `medium` : `2-extra-big`}`}
          title="Can't sell your machine? Let us help!"
          className="mb-4 text-center"
        />
        <Text
          size={`${isMobile ? `small` : `medium`}`}
          title="Chat with us now through Whatsapp"
          className="mb-4 text-center"
        />
        <Button
          title="Whatsapp us now"
          className={`p-2 px-10 rounded-full bg-black text-white`}
        />
      </div>
    </div>
  );
}
