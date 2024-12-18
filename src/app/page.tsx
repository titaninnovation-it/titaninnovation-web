"use client";

import AbountUsContainer from "./app-components/AboutUsContainer";
import BannerCarousell from "./app-components/BannerCarousell";
import HeavyEquipmentsContainer from "./app-components/HeavyEquipmentsContainer";
import DownloadAppContainer from "./app-components/DownloadAppContainer";
import FAQsContainer from "./app-components/FAQsContainer";
import HowAndStepContainer from "./app-components/HowAndStepContainer";
import MainContainer from "./app-components/MainContainer";
import PorpularHeavyMachineryContainer from "./app-components/PorpularHeavyMachineryContainer";
import SubscribeNewsletterContainer from "./app-components/SubscribeNewsletterContainer";
import WhyUs from "./app-components/WhyUs";
import OurDistributors from "./app-components/OurDistributors";
import { useAuthStore } from "@/libs/zustand/authStore";
import { PaddingHeaderHeight } from "@/components/Header";

export default function Home() {
  const authStore = useAuthStore();
  return (
    <main className={`flex flex-col bg-[#FAF2EA] ${PaddingHeaderHeight}`}>
      <BannerCarousell />
      <MainContainer />
      <div
        className="flex flex-col bg-[#]"
        style={{
          backgroundImage: `url('/bg-pattern01.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <OurDistributors />
        {/* <WhyUs /> */}
        <HowAndStepContainer type="buy" />
      </div>

      <PorpularHeavyMachineryContainer />
      <div
        className="flex flex-col bg-white"
        style={{
          backgroundImage: `url('/Group-OurStory.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {authStore.profile && (
          <HeavyEquipmentsContainer title="My Browsing History" type={"buy"} />
        )}
        <AbountUsContainer />
      </div>
      <DownloadAppContainer />
      {/* <SubscribeNewsletterContainer /> */}
      <FAQsContainer />
    </main>
  );
}
