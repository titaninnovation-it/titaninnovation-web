"use client";

import Text from "@/components/Shared/Text";
import { useRouter } from "next/navigation";
import useIsMobile from "@/libs/useIsMobile";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  DistributorSummaryDto,
  GetApiDistributorParams,
} from "@/orval/type.schemas";
import { AxiosLibs } from "@/libs/axios-client";
import FAQsContainer from "../app-components/FAQsContainer";

export default function PartnersScreen() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const localDistributorInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["localDistributor"],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiDistributorParams = {
        PageSize: 5,
        PageNumber: pageParam,
        IsInternationalDistributor: false,
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

  const localDistributors: DistributorSummaryDto[] =
    localDistributorInfiniteQuery.data?.pages.flatMap((page) => {
      return page.items;
    }) ?? [];

  const internationalDistributorInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["internationalDistributor"],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiDistributorParams = {
        PageSize: 5,
        PageNumber: pageParam,
        IsInternationalDistributor: true,
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

  const internationalDistributors: DistributorSummaryDto[] =
    internationalDistributorInfiniteQuery.data?.pages.flatMap((page) => {
      return page.items;
    }) ?? [];
  return (
    <main className={`flex flex-col`}>
      <div
        className={`flex bg-[#003366] items-center justify-center p-10 py-40`}
      >
        <Text
          title={`Our Business Partners`}
          size="2-extra-big"
          className="text-center whitespace-pre-line text-white"
        />
      </div>
      <>
        <div className="flex flex-col p-4">
          <Text
            size="2-extra-big"
            title={`Local Distributor`}
            className="mb-4"
          />
        </div>
        <div
          className={`flex w-full mb-20 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            isMobile ? `` : ``
          }`}
        >
          {localDistributors.map((data) => (
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
          {localDistributorInfiniteQuery.hasNextPage && (
            <button
              className="ml-10 border-white border-2 self-center px-4 bg-white"
              onClick={() => localDistributorInfiniteQuery.fetchNextPage()}
            >
              <Text size="medium" title="View More" className="" />
            </button>
          )}
        </div>
      </>
      <>
        <div className="flex flex-col p-4">
          <Text
            size="2-extra-big"
            title={`International Distributor`}
            className="mb-4"
          />
        </div>
        <div
          className={`flex w-full mb-20 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            isMobile ? `` : ``
          }`}
        >
          {internationalDistributors.map((data) => (
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
          {internationalDistributorInfiniteQuery.hasNextPage && (
            <button
              className="ml-10 border-white border-2 self-center px-4 bg-white"
              onClick={() =>
                internationalDistributorInfiniteQuery.fetchNextPage()
              }
            >
              <Text size="medium" title="View More" className="" />
            </button>
          )}
        </div>
      </>
      <FAQsContainer />
    </main>
  );
}
