"use client";

import useIsMobile from "@/libs/useIsMobile";
import Text from "../Shared/Text";
import { useRouter } from "next/navigation";

interface SubMenuButtonProps {
  menus: { name: string; path: string }[];
  onClose(): void;
}

export default function SubMenu(props: SubMenuButtonProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  return (
    <>
      <div
        className={`flex flex-col cursor-pointer ${
          !isMobile && `absolute bg-white top-20 rounded-lg shadow`
        }`}
      >
        {props.menus.map((data, index) => (
          <button
            key={data.name}
            className={`m-2 p-2 px-8 text-start border-[#E7E7E7] ${
              !isMobile && props.menus.length - 1 != index ? `border-b-2` : ``
            }`}
            onClick={() => {
              router.push(data.path)
              props.onClose();
            }}
          >
            <Text title={data.name} size="small" className={`cursor-pointer`} />
          </button>
        ))}
      </div>
    </>
  );
}
