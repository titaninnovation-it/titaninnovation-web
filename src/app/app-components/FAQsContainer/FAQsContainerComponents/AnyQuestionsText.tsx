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
        className="text-start"
        onClick={() => {
          router.push("/faq");
        }}
      >
        <Text
          title={"More FAQs"}
          size="medium"
          className={`cursor-pointer text-blue-500`}
        />
      </button>
    </div>
  );
}
