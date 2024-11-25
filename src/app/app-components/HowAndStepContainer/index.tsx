import StepsSwitcher from "./HowAndStepContainerComponents/StepsSwitcher";
import StepImage from "./HowAndStepContainerComponents/StepImage";
import useIsMobile from "@/libs/useIsMobile";

interface HowAndStepContainerProps {
  type: "buy" | "sell" | "rent"|"insurance";
}

export default function HowAndStepContainer(props: HowAndStepContainerProps) {
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex flex-1 mb-20 ${
        isMobile ? `flex-col` : `flex-row-reverse w-[80%] self-center`
      }`}
    >
      <StepImage />
      <StepsSwitcher type={props.type}/>
    </div>
  );
}
