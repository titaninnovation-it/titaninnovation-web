"use client";

import Button from "@/components/Shared/Button";
import ListingCard from "@/components/Shared/Card/ListingCard";
import Text from "@/components/Shared/Text";
import { Colors } from "@/constants/Colors";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import {
  DistributorSummaryDto,
  GetApiListingParams,
} from "@/orval/type.schemas";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Page({
  params,
}: {
  params: { distributorId: string };
}) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const useGetDistributorDetailQuery = useQuery({
    queryKey: ["distributorDetail"],
    queryFn: async () => {
      return AxiosLibs.axiosClient.get(
        `/api/Distributor/${params.distributorId}`
      );
    },
  });
  const detail: DistributorSummaryDto | null =
    useGetDistributorDetailQuery.data?.data ?? null;

  const listingsInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["/api/Listing", params.distributorId],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiListingParams = {
        PageSize: 5,
        PageNumber: pageParam,
        DistributorProfileId: params.distributorId as string,
        ListingCondition: "New",
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
    <>
      <main className={`flex flex-col`}>
        <div className={`flex bg-[#003366] items-center  p-10 py-40`}>
          <img
            src={detail?.companyLogoImageUrl ?? ``}
            alt=""
            style={{
              width: 100,
              height: 100,
              borderRadius: 1000,
              marginRight: 20,
            }}
          />
          <div className="flex flex-col gap-2">
            <Text
              title={`${detail?.companyName}`}
              size="big"
              className="whitespace-pre-line text-white"
            />
            <Text
              title={`${detail?.companyDescription}`}
              size="medium"
              className="whitespace-pre-line text-white"
            />
          </div>
        </div>
        <div
          className={`grid  ${
            isMobile ? `grid-cols-2 ` : `grid-cols-3 gap-4 p-4`
          }`}
        >
          {listings.map((data) => (
            <ListingCard
              key={data.id}
              data={data}
              containerStyle=""
              onClick={() => {
                router.push(`/buy-rent/${data.id}`);
              }}
            />
          ))}
        </div>
        {listingsInfiniteQuery.hasNextPage && (
          <Button
            title="Load More"
            style={{
              backgroundColor: Colors.primary,
            }}
            onClick={() => {
              listingsInfiniteQuery.fetchNextPage();
            }}
            className="self-center p-4"
          />
        )}
      </main>
    </>
  );
}
