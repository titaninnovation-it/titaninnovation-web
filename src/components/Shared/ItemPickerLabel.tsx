"use client";

import { useState } from "react";
import Text from "./Text";
import IconCaretCircleRight from "@/svg/CaretCircleRight.svg";

interface ItemPickerLabelProps {
  className?: string;
  selectedValue: string;
  title?: string;
  options: { id: string; name: string }[];
  onSelect(value: string): void;
}

export default function ItemPickerLabel(props: ItemPickerLabelProps) {
  const [isPick, setIsPick] = useState<boolean>(false);
  return (
    <div className={`flex flex-col ${props.className}`}>
      <button
        onClick={() => {
          setIsPick(true);
        }}
        className="flex items-center w-full p-4 shadow-lg rounded-lg bg-[#F2F2F2]"
      >
        <div className="flex flex-col mr-4">
          <Text
            size="small"
            title={`${props.title}`}
            className="text-[#003366]"
          />
          <Text
            size="small"
            title={`${props.selectedValue}`}
            className="text-left"
          />
        </div>
        <div className="flex flex-col ml-auto">
          <IconCaretCircleRight color={"#003366"} width={30} height={30} />
        </div>
      </button>
      <div className={`relative`}>
        {isPick && (
          <div
            className="flex flex-col w-full h-40 bg-[#F2F2F2] rounded-lg shadow-lg overflow-y-auto absolute z-10"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {[{ id: "All", name: "All" }, ...props.options].map((data) => (
              <button
                key={data.id}
                className="px-4 py-2 hover:bg-[#F2F2F2]"
                role="menuitem"
                onClick={() => {
                  props.onSelect(data.id);
                  setIsPick(false);
                }}
              >
                <Text size="small" title={data.name ?? ``} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
