"use client";
import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import Image from "next/image";

export default function DownloadAppContainer() {
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex bg-[#003366] ${isMobile ? `flex-col` : ``}`}
      style={{
        backgroundImage: `url('/TITAN.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={`flex-col ${isMobile ? `p-4` : `p-20`}`}>
        <Text
          title="DOWNLOAD TITAN INNOVATION APP NOW"
          size={"2-extra-big"}
          className={`text-white`}
        />
        <div className={`flex flex-row gap-4 ${isMobile ? `` : `mt-10`}`}>
          <div
            className="flex items-center justify-center"
            style={{
              position: "relative",
              height: isMobile ? 80 : 180,
              width: isMobile ? 140 : 180,
            }}
            onClick={() => {
              window.location.href =
                "https://apps.apple.com/us/app/titan-innovation/id6736380841";
            }}
          >
            <Image
              src={`/download-on-the-appstore.png`}
              alt=""
              fill
              objectFit="contain"
            />
          </div>
          <div
            className="flex items-center justify-center"
            style={{
              position: "relative",
              height: isMobile ? 80 : 180,
              width: isMobile ? 140 : 180,
            }}
            onClick={() => {
              window.location.href =
                "https://play.google.com/store/apps/details?id=com.titanhmapp";
            }}
          >
            <Image
              src={`/get-it-on-google-play.png`}
              alt=""
              fill
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <div
        className="flex self-end"
        style={{
          position: "relative",
          height: isMobile ? 240 : 500,
          width: isMobile ? 400 : 950,
        }}
        onClick={() => {
          window.location.href =
            "https://play.google.com/store/apps/details?id=com.titanhmapp";
        }}
      >
        <Image src={`/download app.png`} alt="" fill objectFit="contain" />
      </div>
    </div>
  );
}
