"use client";

import { useEffect, useState } from "react";
import ButtonIcon from "../Shared/ButtonIcon";
import CustomIcon from "../Shared/CustomIcon";
import Nav from "./Nav";
import useIsMobile from "@/libs/useIsMobile";
import Text from "../Shared/Text";
import { usePathname, useRouter } from "next/navigation";
import ProfileMenu from "./ProfileMenu";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/libs/zustand/authStore";

export default function Header() {
  const authStore = useAuthStore();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [visibleNav, setVisibleNav] = useState<boolean>(false);
  const pathName = usePathname();
  const isIndexPage = pathName[pathName.length - 1] === "/";
  return (
    <div
      className={`flex bg-white ${isMobile ? `p-5` : `p-4`}`}
      style={{
        backgroundColor: isIndexPage ? Colors.primary : Colors.white,
      }}
    >
      {isMobile && (
        <ButtonIcon
          icon={
            <CustomIcon
              name="material-symbols:menu"
              size={25}
              color={"#000000"}
            />
          }
          onClick={() => {
            setVisibleNav(true);
          }}
        />
      )}
      <Nav visible={visibleNav} onClose={() => setVisibleNav(false)} />
      <div className="flex ml-auto items-center">
        {authStore.profile ? (
          <ProfileMenu userProfile={authStore.profile} />
        ) : (
          <>
            <button
              className="flex w-full items-center mr-4"
              onClick={() => router.push("/get-app")}
            >
              <Text
                title="Get App"
                size="small"
                className=" whitespace-nowrap text-[#1656B1]"
              />
            </button>
            <button
              className="flex w-full items-center mr-4"
              onClick={() => router.push("/login")}
            >
              <Text title="Login" size="small" className=" whitespace-nowrap" />
            </button>
            <button
              className="flex w-full items-center border-1 h-fit px-4 p-1 rounded-lg border-black"
              onClick={() => router.push("/sign-up")}
            >
              <Text
                title="Sign Up"
                size="small"
                className=" whitespace-nowrap"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
