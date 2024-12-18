"use client";

import useIsMobile from "@/libs/useIsMobile";
import AnyQuestionsText from "./FAQsContainerComponents/AnyQuestionsText";
import SectionDropdown from "./FAQsContainerComponents/SectionDropdown";
import { usePathname } from "next/navigation";

export default function FAQsContainer() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isHide = ["/faq"].some((path) => pathname.includes(path));
  return (
    <div
      className={`flex bg-[#FAA71B] ${isMobile?`p-4`:`p-20`}`}
      style={{
        backgroundImage: `url('/Artboard 3@3x-8 1.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={`flex bg-white shadow-lg rounded-2xl ${isMobile ? `flex-col` : `flex-row p-10 w-full`}`}>
        {!isHide && <AnyQuestionsText />}
        <SectionDropdown />
      </div>
    </div>
  );
}
