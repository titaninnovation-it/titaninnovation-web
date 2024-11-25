"use client";

import useIsMobile from "@/libs/useIsMobile";
import CompanyInfo from "./CompanyInfo";
import FooterSectionDropdown from "./FooterSectionDropdown";
import SocialAndDownloadApp from "./SocialAndDownloadApp";
import Text from "../Shared/Text";
import { ListingType } from "@/orval/type.schemas";

export type TFooterSectionDropdown = {
  title: string;
  path: string;
  subMenus: { name: string; path: string }[];
};

export default function Footer() {
  const isMobile = useIsMobile();
  const list: TFooterSectionDropdown[] = [
    {
      title: "Machinery",
      path: "",
      subMenus: [
        { name: "Buy", path: "/buy-rent" },
        { name: "Sell", path: "/form-sell" },
        { name: "Rent", path: `/buy-rent?listingType=${ListingType.Rent}` },
      ],
    },
    {
      title: "About Us",
      path: "",
      subMenus: [
        { name: "About Us", path: "/about-us" },
        { name: "FAQ", path: "/faq" },
      ],
    },
    {
      title: "More",
      path: "",
      subMenus: [
        { name: "Insurance", path: "/insurance" },
        { name: "Contact Us", path: "/contact-us" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & conditions", path: "/terms-and-conditions" },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      <div className={`flex gap-4 ${isMobile ? `flex-col p-4` : `p-20 pb-0`}`}>
        <CompanyInfo />
        {list.map((data) => (
          <FooterSectionDropdown key={data.title} data={data} />
        ))}
        <SocialAndDownloadApp />
      </div>
      <Text
        title="All rights reserved@titaninnovation.com.my"
        size="small"
        className="p-4 text-center"
      />
    </div>
  );
}
