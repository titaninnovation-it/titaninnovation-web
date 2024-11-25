"use client";

import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import Image from "next/image";

export default function WhyUs() {
  const list = [
    {
      title: `Professional`,
      description: `All machinery on our platform are fully insepected and verfified by professionals.`,
    },
    {
      title: `Trusted & Safe`,
      description: `Full inspection reports are provided to validate the true value for each machinery.`,
    },
    {
      title: `Hassle-Free`,
      description: `We will handle all the tedious procedures from paperwork to delivery right to the doorstep.`,
    },
    {
      title: `Best Price`,
      description: `We provide the best offer with full transparency.`,
    },
  ];
  const isMobile = useIsMobile();
  return (
    <>
      <div className={`flex mb-20 ${isMobile ? `flex-col` : ``}`}>
        <div className="flex-1 bg-[#D9D9D9]">
          <div
            className={`relative w-[100%] ${
              isMobile ? `h-[20vh]` : `h-[100%]`
            }`}
          >
            <Image
              src={`/81679172_Track excavator -5 1.png`}
              objectFit="cover"
              alt=""
              fill
            />
          </div>
        </div>
        <div className={`p-6 ${isMobile ? `flex-1` : `flex flex-col w-[65%] px-[10rem]`}`}>
          <Text size="2-extra-big" title="Why Us?" />
          {list.map((data) => (
            <div key={data.title} className={`flex flex-row ${isMobile?`mt-5`:`mt-10`}`}>
              <div
                className={`rounded-lg bg-[#555555] flex-[10%] ${
                  isMobile
                    ? `w-[2rem] h-[2rem]`
                    : `w-[3rem] h-[3rem]`
                }`}
              />
              <div
                className={`flex flex-col ml-4 flex-[90%]`}
              >
                <Text
                  title={data.title}
                  size={isMobile ? "medium" : "extra-big"}
                />
                <Text title={data.description} size="small" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
