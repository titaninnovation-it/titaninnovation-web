"use client";

import Text from "@/components/Shared/Text";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import {
  DistributorSummaryDto,
  GetApiDistributorParams,
} from "@/orval/type.schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OurDistributors() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const distributorInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["/api/Distributor"],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiDistributorParams = {
        PageSize: 3,
        PageNumber: pageParam,
      };
      const { data } = await AxiosLibs.axiosClient.get(`/api/Distributor`, {
        params: query,
      });
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasNextPage =
        allPages.length != lastPage.totalPages && lastPage.totalPages != 0;
      return hasNextPage ? allPages.length + 1 : undefined;
    },
  });

  const distributors: DistributorSummaryDto[] =
    distributorInfiniteQuery.data?.pages.flatMap((page) => {
      return page.items;
    }) ?? [];
  return (
    <>
      <div className={`flex flex-col mb-10 ${isMobile ? `p-4` : ``}`}>
        <Text
          size="2-extra-big"
          title={`Our Business Partners`}
          className="self-center mb-4"
        />
      </div>
      <div
        className={`flex w-full mb-20 px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
          isMobile ? `` : `justify-center`
        }`}
      >
        {distributors.map((data) => (
          <div
            className="flex items-center justify-center"
            style={{ position: "relative", height: 80, width: 80 }}
            key={data.id}
            onClick={() => {
              router.push(`/distributor-detail/${data.id}`);
            }}
          >
            <Image
              src={`${data.companyLogoImageUrl}`}
              alt=""
              width={80}
              height={80}
              style={{ objectFit: "contain", borderRadius: 1000 }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
