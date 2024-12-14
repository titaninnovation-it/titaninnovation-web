"use client";

import Image from "next/image";
import ButtonIcon from "../Shared/ButtonIcon";
import CustomIcon from "../Shared/CustomIcon";
import Text from "../Shared/Text";
import useIsMobile from "@/libs/useIsMobile";

export default function SocialAndDownloadApp() {
  const isMobile = useIsMobile();
  return (
    <div className={`flex flex-1 flex-col ${isMobile?``:`px-10`}`}>
      <div className="flex gap-4 mb-4">
        <ButtonIcon
          icon={
            <CustomIcon
              name="ic:baseline-facebook"
              size={25}
              color={"#000000"}
            />
          }
          onClick={() => {}}
          className="p-2 rounded-full shadow"
        />
        <ButtonIcon
          icon={
            <CustomIcon
              name="hugeicons:instagram"
              size={25}
              color={"#000000"}
            />
          }
          onClick={() => {}}
          className="p-2 rounded-full shadow"
        />
      </div>
      <Text title="Discover our app" size={"big"} />
      <div className="flex flex-row gap-2 mt-2">
        <div
          className="flex"
          style={{
            position: "relative",
            height: isMobile ? 60 : 60,
            width: isMobile ? 140 : 120,
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
          className={`flex`}
          style={{
            position: "relative",
            height: isMobile ? 60 : 60,
            width: isMobile ? 140 : 120,
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
  );
}
