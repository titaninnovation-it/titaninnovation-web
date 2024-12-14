import useIsMobile from "@/libs/useIsMobile";
import Text from "../Shared/Text";
import Image from "next/image";
import CustomIcon from "../Shared/CustomIcon";

export default function CompanyInfo() {
  const isMobile = useIsMobile();
  return (
    <div className={`flex flex-1 flex-col mb-10`}>
      <div
        className={`flex mb-4 ${isMobile ? `self-center` : ``}`}
        style={{
          position: "relative",
          height: isMobile ? 60 : 60,
          width: isMobile ? 140 : 120,
        }}
      >
        <Image
          src={`/titan_innovation_logo.png`}
          alt=""
          fill
          objectFit="contain"
        />
      </div>
      <Text
        title="Buy, Sell or Rent your machinery with Ease"
        size={`small`}
        className="mb-4 text-[#5E6282]"
      />
      <div className="flex gap-2 items-start justify-start mb-4">
        <CustomIcon
          name="heroicons:map-pin-20-solid"
          size={isMobile ? 25 : 45}
          color={"#000000"}
        />
        <Text
          title="No. 34-2, Jalan Puteri 4/8, Bandar Puteri Puchong 47100 Puchong,Selangor"
          size={`small`}
          className="text-[#5E6282]"
        />
      </div>
      <div className="flex gap-2 items-start justify-start">
        <CustomIcon
          name="ic:round-phone"
          size={isMobile ? 20 : 15}
          color={"#000000"}
        />
        <Text
          title="+6019-3557588"
          size={`small`}
          className="text-[#5E6282]"
        />
      </div>
    </div>
  );
}
