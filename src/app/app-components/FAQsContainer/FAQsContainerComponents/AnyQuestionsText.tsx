import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import { useRouter } from "next/navigation";

export default function AnyQuestionsText() {
  const router = useRouter();
  const isMobile = useIsMobile();
  return (
    <div className={`flex flex-1 flex-col ${isMobile ? `p-4` : `p-14`}`}>
      <Text
        title={`Any questions?\nWe got you.`}
        size={"2-extra-big"}
        className="whitespace-pre-line mb-4"
      />
      <button
        className="flex text-start gap-2 items-center"
        onClick={() => {
          router.push("/faq");
        }}
      >
        <Text
          title={"More FAQs"}
          size="medium"
          className={`cursor-pointer text-[#1977F2]`}
        />
        <CustomIcon
          name="icon-park-outline:right-c"
          size={isMobile ? 20 : 20}
          color={"#1977F2"}
        />
      </button>
    </div>
  );
}
