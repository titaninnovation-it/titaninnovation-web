"use client";

import ItemPickerLabel from "@/components/Shared/ItemPickerLabel";
import Text from "@/components/Shared/Text";
import { Colors } from "@/constants/Colors";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import { getAppointmentStatusColor, getListingTypeColor } from "@/libs/utils";
import {
  AppointmentStatus,
  AppointmentType,
  GetApiPurchaseParams,
  PurchaseDto,
} from "@/orval/type.schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
import IconMapPin from "@/svg/MapPin.svg";
import IconCalendarBlank from "@/svg/CalendarBlank.svg";
import IconClock from "@/svg/Clock.svg";
import dayjs from "dayjs";
import Button from "@/components/Shared/Button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const purchaseInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["purchase"],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiPurchaseParams = {
        PageSize: 10,
        PageNumber: pageParam,
      };
      const { data } = await AxiosLibs.axiosClient.get(`/api/Purchase`, {
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

  const purchases: PurchaseDto[] =
    purchaseInfiniteQuery.data?.pages.flatMap((page) => {
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
            title={`My Purchase`}
            size="2-extra-big"
            className="text-center whitespace-pre-line text-black"
          />
        </div>

        <div className={`grid grid-cols-1 p-4`}>
          {purchases.map((data) => (
            <div
              key={data.id}
              className="bg-white"
              style={{
                display: "flex",
                flex: "0 0 auto",
                margin: 10,
              }}
              onClick={() => {
                router.push(`/buy-rent/${data.listingId}`);
              }}
            >
              <div className={`flex-1`}>
                <img
                  src={
                    data?.listing?.thumbnailUrl ??
                    ``
                  }
                  className={`w-full object-cover  ${
                    isMobile ? `h-full` : `h-60 `
                  }`}
                  alt=""
                />
              </div>
              <div className={`flex-1 p-4`}>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap w-full gap-2">
                    <div
                      className="px-2 self-start rounded-full"
                      style={{
                        backgroundColor: getListingTypeColor(
                          data?.listing
                            ?.listingType
                        ),
                      }}
                    >
                      <Text
                        size="small"
                        title={`${data?.listing?.listingType}`}
                        className="text-white"
                      />
                    </div>
                  </div>
                  <Text
                    size="small"
                    title={`${data?.listing?.name}`}
                  />
                  <div className="flex flex-wrap">
                    <>
                      <IconCalendarBlank
                        color={Colors.black}
                        width={40}
                        height={40}
                      />
                      <Text
                        size="small"
                        className="m-1"
                        title={`Purchased at ${dayjs(data.createdAt).format(
                          "DD MMM YYYY, HH:MM"
                        )}`}
                      />
                    </>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {purchaseInfiniteQuery.hasNextPage && (
          <Button
            title="Load More"
            style={{
              backgroundColor: Colors.primary,
            }}
            onClick={() => {
              purchaseInfiniteQuery.fetchNextPage();
            }}
            className="self-center p-4"
          />
        )}
      </main>
    </>
  );
}