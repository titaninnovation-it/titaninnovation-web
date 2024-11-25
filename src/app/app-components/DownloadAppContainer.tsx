"use client";
import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import Image from "next/image";

export default function DownloadAppContainer() {
  const isMobile = useIsMobile();
  return (
    <div className={`flex bg-[#003366]`}>
      <div className={`flex-col ${isMobile ? `p-4` : `p-20`}`}>
        <Text
          title="DOWNLOAD TITAN INNOVATION APP NOW"
          size={"extra-big"}
          className={`text-white`}
        />
        <div className="flex flex-row gap-4 mt-10">
          <Image
            onClick={() => {
              window.location.href =
                "https://apps.apple.com/us/app/titan-innovation/id6736380841";
            }}
            src={`/download-on-the-appstore.png`}
            alt=""
            width={isMobile ? 80 : 120}
            height={isMobile ? 80 : 120}
            objectFit="contain"
          />
          <Image
            onClick={() => {
              window.location.href =
                "https://play.google.com/store/apps/details?id=com.titanhmapp";
            }}
            src={`/get-it-on-google-play.png`}
            alt=""
            width={isMobile ? 80 : 120}
            height={isMobile ? 80 : 120}
            objectFit="contain"
          />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Image
          src={`/Group 33218.png`}
          alt=""
          width={isMobile ? 160 : 300}
          height={isMobile ? 80 : 300}
          objectFit="contain"
        />
      </div>
    </div>
  );
}
