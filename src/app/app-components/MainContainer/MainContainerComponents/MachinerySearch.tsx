import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { FilterDto, ListingType } from "@/orval/type.schemas";
import { AxiosLibs } from "@/libs/axios-client";
import CustomIcon from "@/components/Shared/CustomIcon";

export default function MachinerySearch() {
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
    <div className={`flex flex-col ${isMobile ? `w-full` : `w-8/12`}`}>
      <Text
        size={"2-extra-big"}
        title="Looking For A Machinery?"
        className="mb-4"
      />
      <button
        onClick={() => {
          router.push(`/buy-rent?listingType=${ListingType.Sell}`);
        }}
        className="flex align-center items-center bg-[#F7F7F7] rounded-lg p-2 mb-4 gap-2"
      >
        <CustomIcon
          name="material-symbols-light:search"
          size={30}
          color={"#939393"}
        />
        <Text size="medium" title="Search..." />
      </button>
      <div className="flex w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {machineTypes.map((data) => (
          <button
            key={data.id}
            className="flex flex-col p-2 whitespace-nowrap items-center justify-end"
            onClick={() => {
              router.push(`/buy-rent?machineTypeIds=${data.id}`);
            }}
          >
            <Image
              src={data.typeIconUrl ?? ""}
              alt=""
              width={40}
              height={40}
              objectFit="contain"
              className="mb-2"
            />
            <Text size="small" title={`${data.name}`} />
          </button>
        ))}
      </div>
      <div className="flex w-full mb-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {machineMakes.map((data) => (
          <button
            key={data.id}
            className="flex flex-col p-2 whitespace-nowrap items-center justify-end"
            onClick={() => {
              router.push(`/buy-rent?machineMakeIds=${data.id}`);
            }}
          >
            <img
              src={data.logoImageUrl ?? ``}
              alt=""
              className="mb-2 w-50 h-50 object-contain"
            />
            <Text size="small" title={`${data.name}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
