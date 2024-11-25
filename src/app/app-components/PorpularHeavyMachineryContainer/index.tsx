import PorpularMachinerys from "./PorpularHeavyMachineryContainerComponents/PorpularMachinerys";
import PorpularText from "./PorpularHeavyMachineryContainerComponents/PorpularText";
import useIsMobile from "@/libs/useIsMobile";

export default function PorpularHeavyMachineryContainer() {
  const isMobile = useIsMobile();
  return (
    <div className={`flex-col bg-[#18355A] ${isMobile ? `p-4` : `p-20`}`}>
      <PorpularText />
      <PorpularMachinerys />
    </div>
  );
}
