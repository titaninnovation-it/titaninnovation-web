"use client";

import ListingCard from "@/components/Shared/Card/ListingCard";
import Text from "@/components/Shared/Text";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import { GetApiListingParams } from "@/orval/type.schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function PorpularMachinerys() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const listingsInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["PorpularMachinerys"],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiListingParams = {
        PageSize: 3,
        PageNumber: pageParam,
      };
      const { data } = await AxiosLibs.axiosClient.get(`/api/Listing`, {
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

  const listings =
    listingsInfiniteQuery.data?.pages.flatMap((page) => {
      return page.items;
    }) ?? [];
  return (
    <div
      className={`flex mb-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
        isMobile ? `` : `justify-center`
      }`}
    >
      {listings.map((data) => (
        <ListingCard
          key={data.id}
          data={data}
          containerStyle="ml-5"
          onClick={() => {
            router.push(`/buy-rent/${data.id}`);
          }}
        />
      ))}
      <button
        className="ml-10 border-white border-2 self-center px-4 bg-white"
        onClick={() => {
          router.push("/buy-rent");
        }}
      >
        <Text size="medium" title="View More" className="" />
      </button>
    </div>
  );
}
