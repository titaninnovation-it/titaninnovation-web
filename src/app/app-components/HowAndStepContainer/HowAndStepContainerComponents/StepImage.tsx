"use client";

import useIsMobile from "@/libs/useIsMobile";
import Image from "next/image";

export default function StepImage() {
  const isMobile = useIsMobile();
  return (
    <>
      <div className="flex-1">
        <div
          className={`relative w-[100%] ${
            isMobile ? `h-[30vh]` : `h-[100%]`
          }`}
        >
          <Image
            src={`/81679172_Track excavator -5 1.png`}
            objectFit="contain"
            alt=""
            fill
          />
        </div>
      </div>
    </>
  );
}
