"use client";

import Text from "@/components/Shared/Text";
import { Colors } from "@/constants/Colors";
import useIsMobile from "@/libs/useIsMobile";
import { useMemo, useState } from "react";
import IconMagnifyingGlass from "@/svg/MagnifyingGlass.svg";
import IconCalendarBlank from "@/svg/CalendarBlank.svg";
import IconCurrencyCircleDollar from "@/svg/CurrencyCircleDollar.svg";
import IconTruck from "@/svg/Truck.svg";

interface StepsSwitcherProps {
  type: "buy" | "sell" | "rent" | "insurance";
}

export default function StepsSwitcher(props: StepsSwitcherProps) {
  const isMobile = useIsMobile();
  const list = [
    "How to Buy?",
    "How to Sell?",
    "How to Rent?",
    "How to Insure?",
  ];
  const [selected, setSelected] = useState<string>(() => {
    if (props.type == "buy") {
      return list[0];
    } else if (props.type == "sell") {
      return list[1];
    } else if (props.type == "rent") {
      return list[2];
    } else {
      return list[3];
    }
  });
  const buySteps = [
    {
      title: "Find your machineries",
      description: "Search for a machinery of your choice on our platform",
      path: null,
      icon: <IconMagnifyingGlass color={Colors.black} width={30} height={30} />,
    },
    {
      title: "Set an appointment",
      description: "Search for a machinery of your choice on our platform",
      path: null,
      icon: <IconCalendarBlank color={Colors.black} width={30} height={30} />,
    },
    {
      title: "Finalize payment",
      description: "Contact our dedicated RBA to book a viewing",
      path: null,
      icon: (
        <IconCurrencyCircleDollar color={Colors.black} width={30} height={30} />
      ),
    },
    {
      title: "Delivery",
      description: "Machinery will be delivered to your location",
      path: null,
      icon: <IconTruck color={Colors.black} width={35} height={35} />,
    },
  ];
  const sellSteps = [
    {
      title: "Book an appointment",
      description: "Fill the required details at form above",
      path: null,
      icon: <IconMagnifyingGlass color={Colors.black} width={30} height={30} />,
    },
    {
      title: "Inspection",
      description:
        "Our engineer will perform full inspection of your machine at your location",
      path: null,
      icon: <IconCalendarBlank color={Colors.black} width={30} height={30} />,
    },
    {
      title: "Sell your machinery",
      description:
        "Interested buyers will reach out to you when you list on our platform",
      path: null,
      icon: (
        <IconCurrencyCircleDollar color={Colors.black} width={30} height={30} />
      ),
    },
    {
      title: "Receive payment",
      description:
        "Titan Innovation will ensure that payment are secured before delivery",
      path: null,
      icon: (
        <IconCurrencyCircleDollar color={Colors.black} width={30} height={30} />
      ),
    },
  ];
  const rentSteps = [
    {
      title: "Book an appointment",
      description: "Fill the required details at form above",
      path: null,
      icon: <IconMagnifyingGlass color={Colors.black} width={30} height={30} />,
    },
    {
      title: "Inspection",
      description:
        "Our engineer will perform full inspection of your machine at your location",
      path: null,
      icon: <IconMagnifyingGlass color={Colors.black} width={30} height={30} />,
    },
    {
      title: "Rent your machinery",
      description:
        "Interested buyers will reach out to you when you list on our platform",
      path: null,
      icon: <IconMagnifyingGlass color={Colors.black} width={30} height={30} />,
    },
    {
      title: "Receive payment",
      description:
        "Titan Innovation will ensure that payment are secured before delivery",
      path: null,
      icon: <IconMagnifyingGlass color={Colors.black} width={30} height={30} />,
    },
  ];
  const insuranceSteps = [
    {
      title: "Get an Instant Quotation",
      description:
        "Tell us about your Machine, and we will work on generating instant quotations from various insurance providers, tailored to your details.",
      path: null,
      icon: <IconMagnifyingGlass color={Colors.black} width={30} height={30} />,
    },
    {
      title: "Choose an insurance Provider",
      description:
        "Compare quotations easily from our wide selection of insurers",
      path: null,
      icon: <IconMagnifyingGlass color={Colors.black} width={30} height={30} />,
    },
    {
      title: "Send Enquiry",
      description:
        "Our dedicated professional insurance agent wil contact you soon",
      path: null,
      icon: <IconMagnifyingGlass color={Colors.black} width={30} height={30} />,
    },
  ];
  const currentSteps = useMemo(() => {
    if (selected == "How to Buy?") {
      return buySteps;
    } else if (selected == "How to Sell?") {
      return sellSteps;
    } else if (selected == "How to Rent?") {
      return rentSteps;
    } else {
      return insuranceSteps;
    }
  }, [buySteps, insuranceSteps, rentSteps, selected, sellSteps]);
  const getTitle = () => {
    if (selected == "How to Buy?") {
      return `Buy Your Machinery\nIn 4 Easy Steps`;
    } else if (selected == "How to Sell?") {
      return `Sell Your Machinery\nIn 4 Easy Steps`;
    } else if (selected == "How to Rent?") {
      return `Rent Your Machinery\nIn 4 Easy Steps`;
    } else {
      return `Insure Your Machinery\nIn 3 Easy Steps`;
    }
  };
  return (
    <div className="flex flex-1 flex-col p-6">
      <div className="flex flex-row">
        {list.map((data) => (
          <button
            className="mr-4"
            style={{
              borderBottomWidth: selected == data ? 2 : 0,
              borderColor: selected == data ? Colors.primary : ``,
            }}
            key={data}
            onClick={() => setSelected(data)}
          >
            <Text
              size="medium"
              title={data}
              style={{
                color: data == selected ? Colors.primary : ``,
              }}
            />
          </button>
        ))}
      </div>
      <Text
        size={`2-extra-big`}
        title={getTitle()}
        className={`my-10 whitespace-pre-line`}
      />
      {currentSteps.map((data, index) => (
        <div key={data.title} className={`flex flex-row`}>
          <div className={`flex flex-col ${isMobile ? `flex-[10%]` : ``}`}>
            <div
              className={`flex rounded-lg bg-[#FEE4C5] items-center justify-center ${
                isMobile ? `w-[3rem] h-[3rem]` : `w-[3rem] h-[3rem]`
              }`}
            >
              {data.icon}
            </div>
            {currentSteps.length - 1 != index && (
              <div className={`w-[0.1rem] h-[4rem] bg-[#C9C9C9] self-center`} />
            )}
          </div>
          <div className={`flex flex-col ml-4 ${isMobile ? `flex-[90%]` : ``}`}>
            <Text title={data.title} size={isMobile ? "medium" : "extra-big"} />
            <Text title={data.description} size="small" />
            {/* {data.path == "" && (
              <Text
                title={"Check out now >"}
                size="small"
                className="text-blue-500"
              />
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
}
