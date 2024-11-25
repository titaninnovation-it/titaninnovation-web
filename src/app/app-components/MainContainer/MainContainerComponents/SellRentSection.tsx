import Button from "@/components/Shared/Button";
import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import { Colors } from "@/constants/Colors";
import useIsMobile from "@/libs/useIsMobile";
import { useRouter } from "next/navigation";

export default function SellRentSection() {
  const router = useRouter();
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex flex-col ${
        isMobile ? `w-full` : `w-5/12 border-l-2 px-6`
      }`}
    >
      <Text
        size={"2-extra-big"}
        title="Want to Sell / Rent Your Machinery?"
        className="mb-4"
      />
      <div className={`flex gap-4 ${isMobile ? `w-full` : `flex-col`}`}>
        <Button
          title="Sell Mine 1 "
          iconRight={
            <CustomIcon
              name="icon-park-solid:right-c"
              size={isMobile ? 20 : 25}
              color={Colors.white}
              className="ml-auto"
            />
          }
          iconLeft={
            <>
              <img
                src={`/image_90_layerstyle.png`}
                alt=""
                className={`mr-2`}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "contain",
                }}
              />
            </>
          }
          className={`w-full p-4 bg-[#003366]`}
          textStyle="text-white"
          onClick={() => {
            router.push("/form-sell");
          }}
        />
        <Button
          title="Rent Mine"
          iconRight={
            <CustomIcon
              name="icon-park-solid:right-c"
              size={isMobile ? 20 : 25}
              color={Colors.white}
              className="ml-auto"
            />
          }
          iconLeft={
            <>
              <img
                src={`/image_91_layerstyle.png`}
                alt=""
                className={`mr-2`}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "contain",
                }}
              />
            </>
          }
          className={`w-full p-4 bg-[#FAA71A]`}
          textStyle="text-white"
          onClick={() => {
            router.push("/form-rent");
          }}
        />
      </div>
    </div>
  );
}
