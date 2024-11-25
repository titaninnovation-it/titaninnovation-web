"use client";
import ListingCard from "@/components/Shared/Card/ListingCard";
import Text from "@/components/Shared/Text";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import {
  BrowsingHistoryDto,
  GetApiBrowsingHistoryParams,
  ListingDto,
} from "@/orval/type.schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface HeavyEquipmentsContainerProps {
  type: "buy" | "rent";
  title: string;
}

export default function HeavyEquipmentsContainer(
  props: HeavyEquipmentsContainerProps
) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const browsingHistoryInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["/api/BrowsingHistory"],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiBrowsingHistoryParams = {
        PageSize: 3,
        PageNumber: pageParam,
      };
      const { data } = await AxiosLibs.axiosClient.get(`/api/BrowsingHistory`, {
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

  const browsingHistories: BrowsingHistoryDto[] =
    browsingHistoryInfiniteQuery.data?.pages.flatMap((page) => {
      return page.items;
    }) ?? [];
  return (
    <>
      <div className="flex flex-col p-4">
        <Text
          size="2-extra-big"
          title={props.title}
          className="self-center mb-4"
        />
      </div>
      <div
        className={`flex mb-20 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
          isMobile ? `` : `justify-center`
        }`}
      >
        {browsingHistories.map((data) => (
          <ListingCard
            key={data.id}
            data={data.listing as ListingDto}
            containerStyle="ml-5"
            onClick={() => {
              router.push(`/buy-rent/${data.id}`);
            }}
          />
        ))}
        <button
          className="ml-10 border-white border-2 self-center px-4 bg-white"
          onClick={() => {
            browsingHistoryInfiniteQuery.fetchNextPage();
          }}
        >
          <Text size="medium" title="View More" className="" />
        </button>
      </div>
    </>
  );
}
