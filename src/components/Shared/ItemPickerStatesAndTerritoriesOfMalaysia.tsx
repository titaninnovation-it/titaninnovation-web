"use client";

import { useMemo, useState } from "react";

import Text from "./Text";
import { Roboto } from "next/font/google";
import { StatesAndTerritoriesOfMalaysia } from "@/orval/type.schemas";
const inter = Roboto({ weight: "300", subsets: ["latin"] });

interface ItemPickerStatesAndTerritoriesOfMalaysiaProps {
  className?: string;
  isRequired: boolean;
  selectedValue: StatesAndTerritoriesOfMalaysia;
  title: string;
  onSelect(value: StatesAndTerritoriesOfMalaysia): void;
}

const statesAndTerritoriesOfMalaysia = Object.values(
  StatesAndTerritoriesOfMalaysia
).map((z) => ({ id: z, name: z })) as { id: string; name: string }[];

export default function ItemPickerStatesAndTerritoriesOfMalaysia(
  props: ItemPickerStatesAndTerritoriesOfMalaysiaProps
) {
  const [isPick, setIsPick] = useState<boolean>(false);
  const [SearchPhrase, setSearchPhrase] = useState<string>("");
  const listToShow = useMemo(() => {
    let list = statesAndTerritoriesOfMalaysia;
    if (SearchPhrase.length > 0) {
      list = list.filter((x) =>
        x.id.toLowerCase().trim().includes(SearchPhrase.toLowerCase())
      );
    }
    return list;
  }, [SearchPhrase]);
  return (
    <div className={`flex flex-col ${props.className}`}>
      <div className="flex mb-2">
        {props.isRequired && (
          <Text size="small" title={"*"} className="text-[#FF4D4E]" />
        )}
        <Text size="small" title={props.title} />
      </div>
      {!isPick ? (
        <button
          onClick={() => {
            setIsPick(true);
          }}
          className="items-center justify-center px-4 py-2 shadow rounded-lg border-[#D9D9D9] hover:bg-[#D9D9D9] bg-white"
        >
          <Text size="small" title={props.selectedValue ?? "Select"} />
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
      <div className={`relative w-full`}>
        {isPick && (
          <div
            className="flex flex-col bg-white rounded-lg shadow overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {listToShow.map((data) => (
              <button
                key={data.id}
                className="px-4 py-2 hover:bg-[#D9D9D9]"
                role="menuitem"
                onClick={() => {
                  props.onSelect(data.id as StatesAndTerritoriesOfMalaysia);
                  setIsPick(false);
                }}
              >
                <Text size="small" title={data.id ?? ``} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
