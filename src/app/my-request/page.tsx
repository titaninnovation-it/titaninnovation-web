"use client";

import Button from "@/components/Shared/Button";
import ItemPickerLabel from "@/components/Shared/ItemPickerLabel";
import Text from "@/components/Shared/Text";
import { Colors } from "@/constants/Colors";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import {
  getAppointmentStatusColor,
  getRequestDateText,
  getRequestStatusColor,
  getRequestTypeColor,
} from "@/libs/utils";
import {
  GetApiRequestParams,
  RequestDto,
  RequestStatus,
  RequestType,
} from "@/orval/type.schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const requestTypes = [
  { id: RequestType.Buy, name: "Buy" },
  { id: RequestType.Sell, name: "Sell" },
  { id: RequestType.Rent, name: "Rent" },
  { id: RequestType.RentOut, name: "Rent Out" },
  { id: RequestType.Insurance, name: "Insurance" },
  { id: RequestType.Enquiry, name: "Enquiry" },
];

const requestStatuses = [
  { id: RequestStatus.Pending, name: "Pending" },
  { id: RequestStatus.Appointment, name: "Appointment" },
  { id: RequestStatus.PendingPayment, name: "Pending Payment" },
  {
    id: RequestStatus.PendingDelivery,
    name: "Pending Delivery",
  },
  {
    id: RequestStatus.Completed,
    name: "Completed",
  },
  {
    id: RequestStatus.Incomplete,
    name: "Incomplete",
  },
];

export default function Page() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [selectedRequestType, setSelectedRequestType] = useState<RequestType>(
    RequestType.Default
  );
  const [selectedRequestStatus, setSelectedRequestStatus] =
    useState<RequestStatus>(RequestStatus.Default);
  const requestInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["request", selectedRequestType, selectedRequestStatus],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiRequestParams = {
        PageSize: 10,
        PageNumber: pageParam,
        RequestType: selectedRequestType,
        RequestStatus: selectedRequestStatus,
      };
      const { data } = await AxiosLibs.axiosClient.get(`/api/Request`, {
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

  const request: RequestDto[] =
    requestInfiniteQuery.data?.pages.flatMap((page) => {
      return page.items;
    }) ?? [];

  const getRequestItemName = (data: RequestDto) => {
    if (data.requestType == "Buy" || data.requestType == "Rent") {
      return `${data.buyRentRequestDetail?.listing?.name}`;
    } else if (data.requestType == "Sell" || data.requestType == "RentOut") {
      return `${data.sellRentRequestDetail?.machineMake}|${data.sellRentRequestDetail?.machineType}|${data.sellRentRequestDetail?.modelNo}`;
    } else if (data.requestType == "Enquiry") {
      return data.enquiryDetail?.enquiryRemarks;
    } else if (data.requestType == "Insurance") {
      return data.insuranceRequestDetail?.insuranceType;
    } else {
      return ``;
    }
  };

  const getRequestImage = (data: RequestDto) => {
    if (data.requestType == "Buy" || data.requestType == "Rent") {
      return `${data.buyRentRequestDetail?.listing?.thumbnailUrl}`;
    } else if (data.requestType == "Sell" || data.requestType == "RentOut") {
      return `/image_90_layerstyle.png`;
    } else if (data.requestType == "Enquiry") {
      return `/image_89_layerstyle.png`;
    } else if (data.requestType == "Insurance") {
      return `/image_67_layerstyle.png`;
    } else {
      return ``;
    }
  };

  return (
    <>
      <div
        className={`flex items-center justify-center p-20`}
        style={{
          backgroundColor: Colors.primary,
        }}
      >
        <Text
          title={`My Request`}
          size="2-extra-big"
          className="text-center whitespace-pre-line text-black"
        />
      </div>
      <div className="flex mb-2 flex-wrap gap-4 p-4">
        <ItemPickerLabel
          title="Type"
          options={requestTypes}
          selectedValue={
            requestTypes.find((z) => z.id == selectedRequestType)?.name ?? "All"
          }
          onSelect={(id) => {
            if (id == "All") {
              setSelectedRequestType(RequestType.Default);
            } else {
              setSelectedRequestType(id as RequestType);
            }
          }}
        />
        <ItemPickerLabel
          title="Status"
          options={requestStatuses}
          selectedValue={
            requestStatuses.find((z) => z.id == selectedRequestStatus)?.name ??
            "All"
          }
          onSelect={(id) => {
            if (id == "All") {
              setSelectedRequestStatus(RequestStatus.Default);
            } else {
              setSelectedRequestStatus(id as RequestStatus);
            }
          }}
        />
      </div>
      <div className={`grid grid-cols-1 p-4`}>
        {request.map((data) => (
          <div
            key={data.id}
            className="bg-white"
            style={{
              display: "flex",
              flex: "0 0 auto",
              margin: 10,
            }}
            onClick={() => {
              router.push(`/my-request/${data.id}`);
            }}
          >
            <div className={`flex-1`}>
              <img
                src={getRequestImage(data)}
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
                      backgroundColor: getRequestTypeColor(data.requestType),
                    }}
                  >
                    <Text
                      size="small"
                      title={`${data.requestType}`}
                      className="text-white"
                    />
                  </div>
                  <div className="px-2 self-start rounded-full">
                    <Text
                      size="small"
                      title={`${data.requestStatus}`}
                      style={{
                        color: getRequestStatusColor(data.requestStatus),
                      }}
                    />
                  </div>
                </div>
                <Text size="small" title={`${getRequestItemName(data)}`} />
                <Text
                  size="small"
                  title={`${getRequestDateText(data.requestStatus)} ${dayjs(
                    data.updatedAt
                  ).format("DD MMM YYYY, HH:MM")}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {requestInfiniteQuery.hasNextPage && (
        <Button
          title="Load More"
          style={{
            backgroundColor: Colors.primary,
          }}
          onClick={() => {
            requestInfiniteQuery.fetchNextPage();
          }}
          className="self-center p-4"
        />
      )}
    </>
  );
}
