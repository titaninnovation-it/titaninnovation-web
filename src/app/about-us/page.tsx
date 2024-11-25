"use client";

import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import PorpularHeavyMachineryContainer from "../app-components/PorpularHeavyMachineryContainer";
import FAQsContainer from "../app-components/FAQsContainer";
import { Colors } from "@/constants/Colors";

export default function Page() {
  const isMobile = useIsMobile();
  return (
    <main className={`flex flex-col bg-[#FAF2EA]`}>
      <div
        className="flex flex-1 p-10 justify-center items-center"
        style={{
          backgroundColor: Colors.primary,
        }}
      >
        <Text size="2-extra-big" title="About Us" />
      </div>
      <div className={`flex mb-40  ${isMobile ? `flex-col p-2` : `p-20`}`}>
        <div className={`flex-[30%] text-center ${isMobile ? `p-4` : ``}`}>
          <Text size="2-extra-big" title="OUR STORY" />
        </div>
        <div
          className={`flex-[70%] bg-white rounded-2xl ${
            isMobile ? `p-4` : `p-20`
          }`}
        >
          <Text
            size="medium"
            title={`Titan Innovation is Malaysia’s leading trading platform for construction and heavy equipment. Fully digital with everything under one platform, we provide you with an easy, trustworthy, and cost-efficient way to buy, sell, or rent heavy construction equipment.\n\nWith our proprietary end-to-end matching mechanism, our platform helps to connect business solution providers and users within the heavy construction equipment industry. We truly believe in the goal of sustainable operations, by creating more business opportunities in Malaysia. Sourcing for heavy construction equipment does not need to be a hassle anymore! `}
            className=" whitespace-pre-line"
          />
        </div>
      </div>
      <div className={`flex mb-40 ${isMobile ? `flex-col` : ``}`}>

          <div className={`flex-[40%] p-20 rounded-2xl ${isMobile ? `` : ``}`}>
            <img
              src={
                "/asian-two-female-engineer-team-monitors-control-planning-maintenance-metalworking-machines-industrial-plants-concept-labor-day.png"
              }
              alt=""
              className={`object-cover rounded-xl ${
                isMobile ? `w-full h-full` : ` h-full `
              }`}
            />
          </div>

        <div
          className={`flex-[60%] flex flex-col justify-center ${
            isMobile ? `p-4` : `px-20`
          }`}
        >
          <Text size="big" title="OUR PURPOSE" className="self-center mb-4" />
          <Text
            size="medium"
            title={`In an industry riddled with thousands of competitors and service providers, it’s hard to find a trustable long-term partner for your business.\n\nThis is why Titan Innovation seeks to facilitate the tedious process between valued buyers and sellers within the heavy machinery sector, so that you can focus fully on scaling your business. We want to connect and create more opportunities for this community!`}
            className=" whitespace-pre-line"
          />
        </div>
      </div>
      <div className={`flex mb-40 ${isMobile ? `flex-col` : ``}`}>
        <div
          className={`flex-[60%] flex flex-col justify-center ${
            isMobile ? `p-4` : `px-20`
          }`}
        >
          <Text
            size="big"
            title="OUR DEDICATION"
            className="self-center mb-4"
          />
          <Text
            size="medium"
            title={`Titan Innovation aims to provide you with a smooth way to conduct your business of buying and selling heavy construction equipment.\n\nWe are dedicated to creating an informative, seamless, and convenient way for you to browse all our vendors under one platform.`}
            className=" whitespace-pre-line"
          />
        </div>
        <div
          className={`flex-[40%] p-20 rounded-2xl ${
            isMobile ? `` : ``
          }`}
        >
          <img
            src={"using-ar-smartphones-scan-qr-codes-vector-background.png"}
            alt=""
            className={`object-cover rounded-xl ${
              isMobile ? `w-full h-full` : ` h-full `
            }`}
          />
        </div>
      </div>
      <div className={`flex flex-col mb-40 ${isMobile ? `p-4` : `p-10`}`}>
        <Text size="2-extra-big" title="OUR VALUES" className="self-center mb-10" />
        <div className={`flex gap-4 ${isMobile ? `flex-col` : ``}`}>
          <div
            className={`flex flex-1 flex-col p-10 bg-white rounded-2xl ${
              isMobile ? `` : ``
            }`}
          >
            <Text size="big" title="WE SERVE" className="mb-10" />
            <Text
              size="medium"
              title="Emphasizing on your needs as the highest priority and constantly over-delivering above your expectations."
              className="mb-10"
            />
          </div>
          <div
            className={`flex flex-1 flex-col p-10 bg-white rounded-2xl ${
              isMobile ? `` : ``
            }`}
          >
            <Text size="big" title="WE COMMIT" className="mb-10" />
            <Text
              size="medium"
              title="Your problems are our problems. Our goal is to take precious time off your hands sourcing for equipment, so you can fully focus on driving value in other aspects of the business."
              className="mb-10"
            />
          </div>
          <div
            className={`flex flex-1 flex-col p-10 bg-white rounded-2xl ${
              isMobile ? `` : ``
            }`}
          >
            <Text size="big" title="WE CARE" className="mb-10" />
            <Text
              size="medium"
              title="Say goodbye to late quotes, delayed response and slow actions. We care greatly about operating with urgency. Speed and excellence is the value you will receive when collaborating with us."
              className="mb-10"
            />
          </div>
        </div>
      </div>
      <PorpularHeavyMachineryContainer />
      <FAQsContainer />
    </main>
  );
}
