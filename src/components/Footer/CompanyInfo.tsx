import useIsMobile from "@/libs/useIsMobile";
import Text from "../Shared/Text";

export default function CompanyInfo() {
  const isMobile = useIsMobile();
  return (
    <div className={`flex flex-1 flex-col mb-10`}>
      <img
        src={`/titan_innovation_logo.png`}
        alt=""
        className={`${isMobile ? `mx-8` : ``}`}
        style={{
          width: 125,
          height: 50,
          objectFit: "contain",
          marginBottom:10
        }}
      />
      <Text
        title="Buy, Sell or Rent your machinery with Ease"
        size={`small`}
        className="mb-4"
      />
      <Text
        title="No. 34-2, Jalan Puteri 4/8, Bandar Puteri Puchong 47100 Puchong,Selangor"
        size={`small`}
        className="mb-2"
      />
      <Text title="+6019-3557588" size={`small`} className="mb-2" />
    </div>
  );
}
