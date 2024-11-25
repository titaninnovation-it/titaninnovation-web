"use client";

import Text from "@/components/Shared/Text";
import FAQsContainer from "../app-components/FAQsContainer";
import useIsMobile from "@/libs/useIsMobile";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

export default function Page() {
  const isMobile = useIsMobile();
  const tabList = [
    { id: 0, name: "General" },
    {
      id: 1,
      name: "Buying",
    },
    {
      id: 2,
      name: "Renting",
    },
    {
      id: 3,
      name: "Selling",
    },
  ];
  const [selectedTabId, setSelectedTabId] = useState<number>(0);
  const selectedTab = tabList.find((z) => z.id == selectedTabId);
  return (
    <main className={`flex flex-col bg-[#FAF2EA]`}>
      <div
        className={`flex bg-[#003366] items-center justify-center ${
          isMobile ? `p-4` : `p-20`
        }`}
      >
        <Text
          title={`FAQ`}
          size="2-extra-big"
          className={`self-center text-white`}
        />
      </div>
      <div className="flex justify-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabList.map((data) => (
          <button
            className="w-full p-4"
            key={data.id}
            onClick={() => setSelectedTabId(data.id)}
          >
            <Text
              size="medium"
              title={data.name}
              className={`whitespace-nowrap ${
                selectedTab == data ? `border-b-2 border-black` : ``
              }`}
              style={{
                color: selectedTab == data ? Colors.primary : "black",
                borderColor: selectedTab == data ? Colors.primary : ``,
              }}
            />
          </button>
        ))}
      </div>
      <FAQsContainer />
    </main>
  );
}
