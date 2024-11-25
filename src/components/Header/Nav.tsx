"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import useIsMobile from "@/libs/useIsMobile";
import Text from "../Shared/Text";
import ButtonIcon from "../Shared/ButtonIcon";
import CustomIcon from "../Shared/CustomIcon";
import SubMenuBuy from "./SubMenuBuy";
import SubMenu from "./SubMenu";
import { ListingType } from "@/orval/type.schemas";

interface NavProps {
  visible: boolean;
  onClose(): void;
}

export type TNavItem = {
  title: string;
  path: string;
  subMenuComponents?: ReactNode;
};

export type TMenuItemWithSubMenuProps = {
  item: TNavItem;
};

export default function Nav(props: NavProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const navItems: TNavItem[] = [
    {
      title: "Buy",
      path: "",
      subMenuComponents: (
        <>
          <SubMenuBuy
            onClose={() => {
              setSelectedSubMenu(null);
              props.onClose();
            }}
          />
        </>
      ),
    },
    {
      title: "Sell",
      path: "/form-sell",
    },
    {
      title: "Rent",
      path: "",
      subMenuComponents: (
        <>
          <SubMenu
            menus={[
              {
                name: "I want to rent a machine",
                path: `/buy-rent?listingType=${ListingType.Rent}`,
              },
              {
                name: "I want to rent mine machine",
                path: "/form-rent",
              },
            ]}
            onClose={() => {
              setSelectedSubMenu(null);
              props.onClose();
            }}
          />
        </>
      ),
    },
    {
      title: "Services",
      path: "",
      subMenuComponents: (
        <>
          <SubMenu
            menus={[{ name: "Insurance", path: "/insurance" }]}
            onClose={() => {
              setSelectedSubMenu(null);
              props.onClose();
            }}
          />
        </>
      ),
    },
    {
      title: "Our Partners",
      path: "/partners",
    },
    {
      title: "About Us",
      path: "/about-us",
    },
    {
      title: "FAQ",
      path: "/faq",
    },
    {
      title: "More",
      path: "",
      subMenuComponents: (
        <>
          <SubMenu
            menus={[
              { name: "Contact Us", path: "/contact-us" },
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "Terms & conditions", path: "/terms-and-conditions" },
            ]}
            onClose={() => {
              setSelectedSubMenu(null);
              props.onClose();
            }}
          />
        </>
      ),
    },
  ];

  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);
  const handlePush = (path: string) => {
    if (isMobile) {
      props.onClose();
    }
    router.push(path);
  };

  return (
    <>
      {!isMobile || props.visible ? (
        <div
          className={`flex w-full inset-x-0 top-0 z-20 overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            isMobile ? `flex-col fixed h-screen pb-[3rem] bg-white` : `flex-row`
          }`}
        >
          {isMobile && (
            <ButtonIcon
              icon={
                <CustomIcon
                  name="material-symbols:close"
                  size={25}
                  color={"#000000"}
                />
              }
              className="p-5 ml-auto"
              onClick={() => {
                props.onClose();
              }}
            />
          )}
          <img
            src={`/titan_innovation_logo.png`}
            alt=""
            className={`${isMobile ? `mx-8` : ``}`}
            style={{
              width: 125,
              height: 50,
              objectFit: "contain",
            }}
            onClick={() => {
              if (isMobile) {
                props.onClose();
              }
              router.push("/");
            }}
          />
          {navItems.map((item) => {
            return (
              <div key={item.path} className={`flex flex-col`}>
                <button
                  onClick={() => {
                    if (item.subMenuComponents) {
                      if (item.title != selectedSubMenu) {
                        setSelectedSubMenu(item.title);
                      } else {
                        setSelectedSubMenu(null);
                      }
                    } else {
                      handlePush(item.path);
                    }
                  }}
                  className={`flex w-full p-4 px-8 cursor-pointer justify-center items-center`}
                >
                  <div className="flex flex-row w-full">
                    <Text
                      title={item.title}
                      size="medium"
                      className={`cursor-pointer`}
                    />
                  </div>
                  {item.subMenuComponents && (
                    <CustomIcon
                      name="teenyicons:down-solid"
                      className="ml-2"
                      size={15}
                      color={"#000000"}
                    />
                  )}
                </button>
                {selectedSubMenu == item.title && item.subMenuComponents ? (
                  item.subMenuComponents
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
