"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CustomIcon from "../Shared/CustomIcon";
import Text from "../Shared/Text";
import { UserProfileDto } from "@/orval/type.schemas";
import useIsMobile from "@/libs/useIsMobile";
import { useAuthStore } from "@/libs/zustand/authStore";
interface ProfileMenuProps {
  userProfile: UserProfileDto;
}

export default function ProfileMenu(props: ProfileMenuProps) {
  const authStore = useAuthStore();
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    const confirmed = window.confirm("Sign out?");
    if (confirmed) {
      authStore.logOut();
    }
  };

  const menu = [
    { id: 0, name: "My Account", iconName: "", path: "/my-account" },
    { id: 1, name: "Change Password", iconName: "", path: "/change-password" },
    { id: 2, name: "Favourite", iconName: "", path: "/my-favourite" },
    { id: 3, name: "My Appointments", iconName: "", path: "/my-appointments" },
    { id: 4, name: "My Requests", iconName: "", path: "/my-request" },
    { id: 5, name: "My Purchase", iconName: "", path: "/my-purchase" },
    {
      id: 6,
      name: "Logout",
      iconName: "material-symbols-light:logout",
      path: "",
    },
  ];

  const handleOpen = (bool: boolean) => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !bool
      ) {
        setIsOpen(false);
      }
    };

    if (bool) {
      setIsOpen(!isOpen);
    } else {
      // document.addEventListener("mousedown", handleClickOutside);
      // return () => {
      //   document.removeEventListener("mousedown", handleClickOutside);
      // };
    }
  };
  useEffect(() => {
    handleOpen(false);
  }, [handleOpen]);
  return (
    <>
      <button
        className="flex items-center justify-center"
        onClick={() => handleOpen(true)}
      >
        <img
          src={`${props.userProfile.profilePictureUrl}`}
          alt=""
          style={{
            width: isMobile ? 20 : 30,
            height: isMobile ? 20 : 30,
            objectFit: "contain",
            marginRight: 5,
            borderRadius: 1000,
          }}
        />
        <Text
          title={`Hi, ${props.userProfile.picFullName}`}
          size="medium"
          className="cursor-pointer mr-2 whitespace-nowrap"
        />
        <CustomIcon name="teenyicons:down-solid" size={15} color={"#000000"} />
      </button>
      {isOpen && (
        <div
          className="flex flex-col absolute inset-x-0 z-30 bg-white top-14 ml-auto rounded-lg shadow w-fit "
          ref={dropdownRef}
        >
          {menu.map((data) => (
            <button
              key={data.name}
              className="flex p-3 hover:bg-[#E4EAF3]"
              onClick={() => {
                setIsOpen(false);
                if (data.id == 6) {
                  handleSignOut();
                } else {
                  router.push(data.path);
                }
              }}
            >
              <Text className="ml-4" size="small" title={data.name} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
