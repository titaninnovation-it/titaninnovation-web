"use client";

import React from "react";
import MachinerySearch from "./MainContainerComponents/MachinerySearch";
import SellRentSection from "./MainContainerComponents/SellRentSection";
import useIsMobile from "@/libs/useIsMobile";

export default function MainContainer() {
  const isMobile = useIsMobile();
  return (
    <>
      <div
        className={`flex p-8 bg-white ${
          isMobile
            ? `flex-col-reverse`
            : `w-10/12 rounded-3xl self-center bottom-[5rem] z-10 relative shadow-2xl`
        }`}
      >
        <MachinerySearch />
        <SellRentSection />
      </div>
    </>
  );
}
