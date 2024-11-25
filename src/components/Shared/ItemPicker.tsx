"use client";

import { useMemo, useState } from "react";
import Text from "./Text";
import { Roboto } from "next/font/google";
const inter = Roboto({ weight: "300", subsets: ["latin"] });

interface ItemPickerProps {
  className?: string;
  isRequired: boolean;
  selectedValue: string;
  title?: string;
  options: { id: string; name: string }[];
  onSelect(value: string): void;
}

export default function ItemPicker(props: ItemPickerProps) {
  const [isPick, setIsPick] = useState<boolean>(false);
  const [SearchPhrase, setSearchPhrase] = useState<string>("");
  const listToShow = useMemo(() => {
    let list = props.options;
    if (SearchPhrase.length > 0) {
      list = list.filter((x) =>
        x.name.toLowerCase().trim().includes(SearchPhrase.toLowerCase())
      );
    }
    return list;
  }, [SearchPhrase]);
  return (
    <div className={`flex flex-col w-full ${props.className}`}>
      <Text
        size="small"
        className="mb-2"
        title={`${props.isRequired ? "*" : ""}${props.title}`}
      />
      {!isPick ? (
        <button
          onClick={() => {
            setIsPick(true);
          }}
          className="items-center w-full justify-center px-4 py-2 shadow-lg rounded-lg border-[#D9D9D9] hover:bg-[#D9D9D9] bg-[#F2F2F2]"
        >
          <Text size="small" title={`${props.selectedValue}`} />
        </button>
      ) : (
        <div className="flex relative rounded shadow-sm">
          <input
            autoFocus={true}
            id={"machineType"}
            type={"text"}
            className={`p-2 w-full rounded-lg border border-[#D9D9D9] hover:border-[#4196FF] ${inter.className}`}
            placeholder={"Search..."}
            value={SearchPhrase}
            onChange={(e) => {
              setSearchPhrase(e.target.value);
            }}
          />
        </div>
      )}
      <div className={`relative`}>
        {isPick && (
          <div
            className="flex flex-col w-full h-40 bg-[#F2F2F2] rounded-lg shadow-lg overflow-y-auto absolute z-10"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {listToShow.map((data) => (
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
