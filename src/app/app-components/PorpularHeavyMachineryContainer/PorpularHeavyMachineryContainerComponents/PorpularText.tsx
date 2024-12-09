import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";

export default function PorpularText() {
  const isMobile = useIsMobile();
  const specials = [
    "175-Point Inspection",
    "Fixed Price, No Hidden Fees",
    "1-Year Warranty",
    "5-Day Money-back Guarantee",
  ];
  return (
    <div className="flex flex-col">
      <div className="flex flex-col self-center items-center mb-4">
      <Text size="big" title="Top view product" className="text-white mb-2"/>
        <Text size="2-extra-big" title="Our Latest Machines" className="text-white"/>
      </div>
      <div className="flex flex-wrap bg-[#18355A] p-4 self-center mb-4">
        {specials.map((data) => (
          <div key={data} className="flex justify-center items-center">
            <CustomIcon
              name="lets-icons:check-fill"
              size={isMobile ? 15 : 30}
              color={"#F3D5A6"}
              className="mr-2 ml-4"
            />
            <Text
              key={data}
              size="small"
              title={data}
              className={"text-[#F3D5A6]"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
