"use client";

import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import HowAndStepContainer from "../app-components/HowAndStepContainer";
import FAQsContainer from "../app-components/FAQsContainer";
import LetUsSellContainer from "./form-rent-components/LetUsSellContainer";
import FormSellRent from "@/components/Shared/Form/FormSellRent";

export default function Page() {
  const isMobile = useIsMobile();
  return (
    <main className={`flex flex-col`}>
      <div
        className={`flex bg-[#003366] items-center justify-center p-10 py-40`}
      >
        <Text
          title={`Rent Out Your Machine \n\nGet a better price for your machinery with Titan Innovation`}
          size="2-extra-big"
          className="text-center whitespace-pre-line text-white"
        />
      </div>
      <div
        className={`flex flex-1 justify-center items-center ${
          isMobile ? `py-4` : `py-20`
        }`}
      >
        <FormSellRent isRent={true} />
      </div>
      <div className="flex flex-col">
        <HowAndStepContainer type={"rent"} />
        <FAQsContainer />
        <LetUsSellContainer />
      </div>
    </main>
  );
}
