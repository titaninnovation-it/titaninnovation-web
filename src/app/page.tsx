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

export default function Home() {
  const authStore = useAuthStore();
  return (
    <main className={`flex flex-col bg-[#FAF2EA]`}>
      <BannerCarousell />
      <MainContainer />
      <OurDistributors />
      {/* <WhyUs /> */}
      <HowAndStepContainer type="buy" />
      <PorpularHeavyMachineryContainer />
      {authStore.profile && (
        <HeavyEquipmentsContainer title="My Browsing History" type={"buy"} />
      )}
      <AbountUsContainer />
      <DownloadAppContainer />
      {/* <SubscribeNewsletterContainer /> */}
      <FAQsContainer />
    </main>
  );
}
