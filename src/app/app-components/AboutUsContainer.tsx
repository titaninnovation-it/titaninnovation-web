"use client";
import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";

export default function AbountUsContainer() {
  const isMobile = useIsMobile();
  return (
    <div className={`flex ${isMobile ? `flex-col p-4` : `p-20`}`}>
      <div
        className={`flex flex-col flex-1 justify-center ${
          isMobile ? `text-center` : `pl-40`
        }`}
      >
        <Text
          className=" whitespace-pre-line"
          size={"medium"}
          title={`OUR STORY`}
        />
        <Text
          className=" whitespace-pre-line"
          size={"2-extra-big"}
          title={`About Us.`}
        />
      </div>
      <div
        className={`shadow-lg rounded-lg bg-white ${
          isMobile ? `p-6` : `flex-[20%] p-10`
        }`}
      >
        <Text
          className=" whitespace-pre-line"
          size={"medium"}
          title={`Titan Innovation is Malaysia's leading trading platform for constuction and heavy equipment. Fully digital with everything under one platform, we provide you with an easy, trustworthy, and cost-efficient way to buy, sell, or rent heavy construction equipment.\n\nWith our proprietary end-to-end matching mechanism, our platform helps to connect business solution providers and users within the heavy construction equipment industry. We truly believe in the goal of sustainable operations, by creating more business opportunities in Malaysia. Sourcing for heavy construction equipment doest not need to be a hassle anymore!`}
        />
      </div>
    </div>
  );
}
