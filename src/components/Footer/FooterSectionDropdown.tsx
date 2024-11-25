"use client";

import useIsMobile from "@/libs/useIsMobile";
import Text from "../Shared/Text";
import { TFooterSectionDropdown } from ".";
import { useState } from "react";
import CustomIcon from "../Shared/CustomIcon";
import { useRouter } from "next/navigation";

interface FooterSectionDropdownProps {
  data: TFooterSectionDropdown;
}

export default function FooterSectionDropdown(
  props: FooterSectionDropdownProps
) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isToggle, setIsToggle] = useState<boolean>();
  return (
    <>
      <div className={`flex flex-1 flex-col ${!isMobile && ``}`}>
        <button
          className={`flex text-start mb-4`}
          onClick={() => setIsToggle(!isToggle)}
          disabled={!isMobile}
        >
          <Text
            title={props.data.title}
            size="big"
            className={`cursor-pointer`}
          />
          {isMobile && (
            <CustomIcon
              name={isToggle ? "ic:baseline-minus" : "ic:baseline-plus"}
              size={25}
              color={"#000000"}
              className="ml-auto"
            />
          )}
        </button>
        {!isMobile || isToggle ? (
          <>
            {props.data.subMenus.map((data) => (
              <button
                key={data.name}
                className={`text-start mb-2`}
                onClick={() => {
                  router.push(data.path);
                }}
              >
                <Text
                  title={data.name}
                  size="small"
                  className={`cursor-pointer`}
                />
              </button>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
