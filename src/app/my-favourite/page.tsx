"use client";

import Button from "@/components/Shared/Button";
import ListingCard from "@/components/Shared/Card/ListingCard";
import Text from "@/components/Shared/Text";
import { Colors } from "@/constants/Colors";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import {
  GetApiUserFavouriteParams,
  ListingDto,
  UserFavouriteDto,
} from "@/orval/type.schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Page() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const userFavouritesInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["userFavourites"],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiUserFavouriteParams = {
        PageSize: 10,
        PageNumber: pageParam,
      };
      const { data } = await AxiosLibs.axiosClient.get(`/api/UserFavourite`, {
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

  const userFavourites: UserFavouriteDto[] =
    userFavouritesInfiniteQuery.data?.pages.flatMap((page) => {
      return page.items;
    }) ?? [];
  return (
    <>
      <main className={`flex flex-col bg-[#FAF3EA]`}>
        <div
          className={`flex items-center justify-center p-20`}
          style={{
            backgroundColor: Colors.primary,
          }}
        >
          <Text
            title={`My Favourite List`}
            size="2-extra-big"
            className="text-center whitespace-pre-line text-black"
          />
        </div>
        <div
          className={`grid  ${
            isMobile ? `grid-cols-2 ` : `grid-cols-3 gap-4 p-4`
          }`}
        >
          {userFavourites.map((data) => (
            <ListingCard
              key={data.id}
              data={data.listing as ListingDto}
              containerStyle=""
              onClick={() => {
                router.push(`/buy-rent/${data.id}`);
              }}
            />
          ))}
        </div>
        {userFavouritesInfiniteQuery.hasNextPage && (
          <Button
            title="Load More"
            style={{
              backgroundColor: Colors.primary,
            }}
            onClick={() => {
              userFavouritesInfiniteQuery.fetchNextPage();
            }}
            className="self-center p-4"
          />
        )}
      </main>
    </>
  );
}
