"use client";

import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import Image from "next/image";

export default function OurInsurancePartnersContainer() {
  const isMobile = useIsMobile();
  return (
    <div className={`flex ${isMobile ? `` : ``}`}>
      <div
        className={`flex flex-col flex-1 items-center ${
          isMobile ? `mb-8` : `mb-20`
        }`}
      >
        <Text
          size={`${isMobile ? `medium` : `2-extra-big`}`}
          title="Our Insurance Partners"
          className="mb-4 text-center"
        />
        <Image
          src={`/generali.png`}
          alt=""
          width={isMobile ? 80 : 140}
          height={isMobile ? 80 : 140}
          objectFit="contain"
        />
      </div>
    </div>
  );
}
