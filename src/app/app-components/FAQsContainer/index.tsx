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
    <div className={`flex ${isMobile ? `flex-col` : `flex-row p-10`}`}>
      {!isHide && <AnyQuestionsText />}
      <SectionDropdown />
    </div>
  );
}
