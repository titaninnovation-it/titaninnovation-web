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
      title: "How do I get in touch with Titan Innovation?",
      description: `You can reach us through the following channels:\n

        Telephone:\n
          (+60) 03 – 8051 0988\n
          (+60) 19 – 355 7588\n
        Facebook:\n
        E-mail us:  admin@titaninnovation.com.my\n
        Visit our website: titaninnovation.com.my`,
    },
    {
      title: "What are your operation hours?",
      description: `Inspection service: \nMonday – Sat (9:00am – 6:00pm).\n\nCustomer service:\n Monday – Sunday (9:00am – 6:00pm).`,
    },
    {
      title: "Why should I buy from Titan Innovation?",
      description: "All machinery on Titan Innovation are fully inspected and verified by professional engineers to determine its realistic value. We ensure only the highest of quality and safety are available for you. ",
    },
    {
      title: "What is full inspection report?",
      description: "A full inspection report is a procedure that our professional engineers will take to check the components of your machine, from top to bottom.",
    },
    {
      title: "Why should I sell with Titan Innovation?",
      description: "You have the machinery and we have the expertise. By selling with Titan Innovation, you can leverage on our years of experience and market knowledge to understand the working conditions and internal /external condition of your machinery. ",
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
