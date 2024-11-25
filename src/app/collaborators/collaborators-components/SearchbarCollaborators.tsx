"use client";

import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import useIsMobile from "@/libs/useIsMobile";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchbarCollaboratorsProps {
  containerStyles?: string;
}

export default function SearchbarCollaborators(
  props: SearchbarCollaboratorsProps
) {
  const router = useRouter();
  const divRef = useRef<any>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
    }
  }, []);
  const isMobile = useIsMobile();
  const [q, setQ] = useState<string>("");
  const list = [
    "Brick",
    "Sand"
  ];
  return (
    <div
      className={`flex relative w-full ${props.containerStyles}`}
      ref={divRef}
    >
      <TextInput
        iconLeft={
          <CustomIcon
            name="material-symbols-light:search"
            size={20}
            color={"#939393"}
            className="absolute left-3 top-3"
          />
        }
        iconRight={
          <>
            {q.length > 0 && (
              <button
                onClick={() => setQ("")}
                className="absolute right-4 top-3"
              >
                <CustomIcon
                  name={"material-symbols:close"}
                  size={20}
                  color={"#939393"}
                />
              </button>
            )}
          </>
        }
        placeholder="Search"
        onChange={(e) => setQ(e.target.value)}
        value={q}
        className="w-full"
      />
      {q.trim().length > 0 && (
        <div
          className={`flex flex-col cursor-pointer absolute z-10 bg-white top-12 rounded-lg shadow p-2 max-h-[30vh] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
          style={{ width: `${width}px` }}
        >
          {list.map((data, index) => (
            <button
              key={index}
              className="p-2 text-start"
              onClick={() => {
                router.push(`/buy-rent`);
              }}
            >
              <Text size="small" title={data} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
