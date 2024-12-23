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
import Image from "next/image";
import { HeaderHeight } from ".";
import { Colors } from "@/constants/Colors";
import { usePathname } from "next/navigation";

interface NavProps {
  visible: boolean;
  onClose(): void;
}

export type TNavItem = {
  id: number;
  title: string;
  path: string;
  subMenuComponents?: ReactNode;
};

export type TMenuItemWithSubMenuProps = {
  item: TNavItem;
};

export default function Nav(props: NavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const navItems: TNavItem[] = [
    {
      id: 0,
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
      id: 1,
      title: "Sell",
      path: "/form-sell",
    },
    {
      id: 2,
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
      id: 3,
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
      id: 4,
      title: "Our Partners",
      path: "/partners",
    },
    {
      id: 5,
      title: "About Us",
      path: "/about-us",
    },
    {
      id: 6,
      title: "FAQ",
      path: "/faq",
    },
    {
      id: 7,
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

  // const getBorderColor = (item: TNavItem) => {
  //   if (item.id == 0 && ["/buy-rent"].includes(pathname)) {
  //     return Colors.primary;
  //   } 
  //   else if(item.id == 1  && [`form-sell`].includes(pathname)){
  //     return Colors.primary
  //   }
  //   else if(item.id == 2 && [`listingType=Rent`]){
  //     return Colors.primary
  //   }
  //   else {
  //     return Colors.white;
  //   }
  // };

  return (
    <>
      {!isMobile || props.visible ? (
        <div
          className={`flex w-full inset-x-0 top-0 z-20 overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            isMobile
              ? `flex-col fixed h-screen pb-[3rem] bg-white`
              : `items-center flex-row`
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
          <div
            className={`relative ${
              isMobile ? `mx-4 w-[130px] h-[100px]` : `w-[120px] h-[7vh]`
            }`}
            onClick={() => {
              if (isMobile) {
                props.onClose();
              }
              router.push("/");
            }}
          >
            <Image
              src={`/titan_innovation_logo.png`}
              objectFit="contain"
              alt=""
              fill
            />
          </div>
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
                  className={`flex ${HeaderHeight} w-full px-4 cursor-pointer justify-center items-center`}
                  style={{}
                    // isMobile
                    //   ? {}
                    //   : {
                    //       borderColor: getBorderColor(item),
                    //       borderBottomWidth: 4,
                    //     }
                  }
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
