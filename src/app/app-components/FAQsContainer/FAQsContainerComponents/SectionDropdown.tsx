"use client";

import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import { useState } from "react";

export default function SectionDropdown() {
  const isMobile = useIsMobile();
  const [activeIndexs, setActiveIndexs] = useState<number[]>([]);
  const list = [
    {
      title: "Who is Titan Innovation?",
      description:
        "Titan Innovation is Malaysia's leading trading platform for construction and heavy equipment. Fully digital with everything under one platform, we provide you with an easy, trustworthy, and cost- efficient way to buy, sell, or rent heavy construction equipment. We also provide after sales services such as insurance for your machinery.",
    },
    {
      title: "Why choose us?",
      description: "",
    },
    {
      title: "What are your operation hours?",
      description: `Inspection service: \nMonday – Sat (9:00am – 6:00pm).\n\nCustomer service:\n Monday – Sunday (9:00am – 6:00pm).`,
    },
    {
      title: "Why should i buy from Titan Innovation?",
      description: "",
    },
    {
      title: "What is full inspection report?",
      description: "",
    },
    {
      title: "Why should i sell with Titan Innovation?",
      description: "",
    },
  ];
  
  const handleToggle = (i: number) => {
    if (activeIndexs.find((z) => z == i) != undefined) {
      setActiveIndexs(activeIndexs.filter((z) => z != i));
    } else {
      setActiveIndexs((prevState) => [...prevState, i]);
    }
  };
  return (
    <div className="flex flex-[60%] flex-col">
      {list.map((data, index) => (
        <div
          key={data.title}
          className="flex flex-col gap-2 p-4 bg-white rounded-2xl mb-10"
        >
          <button className="flex" onClick={() => handleToggle(index)}>
            <Text title={data.title} size="medium" />
            <CustomIcon
              name={activeIndexs.find((z)=>z == index)!=undefined?"ic:baseline-minus":"ic:baseline-plus"}
              size={25}
              color={"#000000"}
              className="ml-auto"
            />
          </button>
          {activeIndexs.find((z) => z == index) != undefined ? (
            <Text title={data.description} size="small" />
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}
