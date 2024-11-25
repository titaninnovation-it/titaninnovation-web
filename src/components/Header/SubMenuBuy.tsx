"use client";

import useIsMobile from "@/libs/useIsMobile";
import Text from "../Shared/Text";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FilterDto, MachineTypeDto } from "@/orval/type.schemas";
import { AxiosLibs } from "@/libs/axios-client";

interface SubMenuBuyButtonProps {
  onClose(): void;
}

export default function SubMenuBuy(props: SubMenuBuyButtonProps) {
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

  const machineTypes: MachineTypeDto[] = filter?.machineTypes ?? [];
  return (
    <div
      className={`${
        !isMobile && `flex flex-col absolute bg-white top-20 rounded-lg shadow`
      }`}
    >
      <button
        className="text-start p-8 pt-2 pb-2"
        onClick={() => {
          router.push(`/buy-rent`);
          props.onClose();
        }}
      >
        <Text
          title={"View All"}
          size="medium"
          className={`cursor-pointer text-blue-500`}
        />
      </button>
      <div className="grid gap-5 grid-cols-2 mb-4">
        {machineTypes.map((data) => (
          <button
            key={data.name}
            onClick={() => {
              router.push(`/buy-rent?machineTypeIds=${data.id}`);
              props.onClose();
            }}
            className="text-start p-8 pb-0 pt-0"
          >
            <Text
              title={`${data.name}`}
              size="small"
              className={`cursor-pointer`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
