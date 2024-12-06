import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { FilterDto, ListingType } from "@/orval/type.schemas";
import { AxiosLibs } from "@/libs/axios-client";
import CustomIcon from "@/components/Shared/CustomIcon";
import IconMagnifyingGlass from "@/svg/MagnifyingGlass.svg";
import { Colors } from "@/constants/Colors";
import ButtonIcon from "@/components/Shared/ButtonIcon";
import { useRef } from "react";

export default function MachinerySearch() {
  const machineTypesScrollContainerRef = useRef<HTMLDivElement>(null);
  const machineMakesScrollContainerRef = useRef<HTMLDivElement>(null);
  const handleScrollRightMachineTypes = () => {
    if (machineTypesScrollContainerRef.current) {
      const container = machineTypesScrollContainerRef.current;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - 10) {
        // Loop back to the start
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll right
        container.scrollBy({ left: 200, behavior: "smooth" });
      }
    }
  };
  const handleScrollRightMachineMakes = () => {
    if (machineMakesScrollContainerRef.current) {
      const container = machineMakesScrollContainerRef.current;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - 10) {
        // Loop back to the start
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll right
        container.scrollBy({ left: 200, behavior: "smooth" });
      }
    }
  };
  const router = useRouter();
  const isMobile = useIsMobile();

  const useGetFilterQuery = useQuery({
    queryKey: ["filter"],
    queryFn: async () => {
      return AxiosLibs.axiosClient.get(`/api/Filter`);
    },
  });
  const filter: FilterDto | undefined =
    useGetFilterQuery.data?.data.data ?? undefined;

  const machineTypes = filter?.machineTypes ?? [];
  const machineMakes = filter?.machineMakes ?? [];

  return (
    <div className={`flex flex-col ${isMobile ? `w-full mt-10` : `w-8/12`}`}>
      <Text
        size={"2-extra-big"}
        title="Looking For A Machinery?"
        className="mb-4"
      />
      <button
        onClick={() => {
          router.push(`/buy-rent?listingType=${ListingType.Sell}`);
        }}
        className={`flex align-center bg-[#F7F7F7]  mb-4 gap-4 items-center ${
          isMobile ? "w-full p-2" : " w-11/12 items-center rounded-lg p-4 "
        }`}
      >
        <CustomIcon
          name="iconamoon:search-thin"
          size={isMobile ? 25 : 30}
          color={"#99999B"}
        />
        <Text
          size="medium"
          title={
            isMobile ? "Search...." : "Search your machinery name / brand..."
          }
          className="whitespace-nowrap"
        />
      </button>
      <div className="flex mb-10">
        <div
          ref={machineTypesScrollContainerRef}
          className="flex w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-10 "
        >
          {machineTypes.map((data) => (
            <button
              key={data.id}
              className="flex flex-col whitespace-nowrap items-center gap-2"
              onClick={() => {
                router.push(`/buy-rent?machineTypeIds=${data.id}`);
              }}
            >
              <img
                src={data.typeIconUrl ?? ""}
                alt=""
                className="w-16 h-16 object-contain"
              />
              <Text size="small" title={`${data.name}`} />
            </button>
          ))}
        </div>
        {!isMobile && (
          <ButtonIcon
            icon={
              <CustomIcon
                name="icon-park-solid:right-c"
                size={25}
                color={Colors.black}
                className="mx-4"
              />
            }
            onClick={handleScrollRightMachineTypes}
          />
        )}
      </div>
      <div className="flex mb-10">
        <div
          ref={machineMakesScrollContainerRef}
          className="flex w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-10 "
        >
          {machineMakes.map((data) => (
            <button
              key={data.id}
              className="flex flex-col whitespace-nowrap items-center gap-2"
              onClick={() => {
                router.push(`/buy-rent?machineMakeIds=${data.id}`);
              }}
            >
              <div className="relative w-[60px] h-[60px] bg-[#F9F9F9] border-1 p-8 rounded-lg">
                <Image
                  src={data.logoImageUrl ?? ``}
                  alt=""
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <Text size="small" title={`${data.name}`} />
            </button>
          ))}
        </div>
        {!isMobile && (
          <ButtonIcon
            icon={
              <CustomIcon
                name="icon-park-solid:right-c"
                size={25}
                color={Colors.black}
                className="mx-4"
              />
            }
            onClick={handleScrollRightMachineMakes}
          />
        )}
      </div>
    </div>
  );
}
