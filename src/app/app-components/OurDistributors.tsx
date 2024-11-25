"use client";

import Text from "@/components/Shared/Text";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import {
  DistributorSummaryDto,
  GetApiDistributorParams,
} from "@/orval/type.schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
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
      <div className="flex flex-col p-4">
        <Text
          size="2-extra-big"
          title={`Our Business Partners`}
          className="self-center mb-4"
        />
      </div>
      <div
        className={`flex w-full mb-20 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
          isMobile ? `` : `justify-center`
        }`}
      >
        {distributors.map((data) => (
          <div
            key={data.id}
            className="ml-5 shadow-lg"
            onClick={() => {
              router.push(`/distributor-detail/${data.id}`);
            }}
          >
            <img
              src={`${data.companyLogoImageUrl}`}
              alt=""
              className={`mr-2`}
              style={{
                width: 50,
                height: 50,
                objectFit: "contain",
                borderRadius: 1000,
              }}
            />
          </div>
        ))}
        <button
          className="ml-10 border-white border-2 self-center px-4 bg-white"
          onClick={() => {
            router.push("/partners");
          }}
        >
          <Text size="medium" title="View More" className="" />
        </button>
      </div>
    </>
  );
}
