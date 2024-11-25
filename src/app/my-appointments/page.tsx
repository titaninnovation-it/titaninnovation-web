"use client";

import ItemPickerLabel from "@/components/Shared/ItemPickerLabel";
import Text from "@/components/Shared/Text";
import { Colors } from "@/constants/Colors";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import { getAppointmentStatusColor, getListingTypeColor } from "@/libs/utils";
import {
  AppointmentDto,
  AppointmentStatus,
  AppointmentType,
  GetApiAppointmentParams,
} from "@/orval/type.schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import IconMapPin from "@/svg/MapPin.svg";
import IconCalendarBlank from "@/svg/CalendarBlank.svg";
import IconClock from "@/svg/Clock.svg";
import dayjs from "dayjs";
import Button from "@/components/Shared/Button";
import { useRouter } from "next/navigation";

const appointmentStatuses = [
  {
    id: AppointmentStatus.Scheduled,
    name: "Scheduled",
  },
  {
    id: AppointmentStatus.Completed,
    name: "Completed",
  },
  {
    id: AppointmentStatus.Cancelled,
    name: "Cancelled",
  },
];

const appointmentTypes = [
  { id: AppointmentType.MachineDelivery, name: "Machine Delivery" },
  { id: AppointmentType.MachineInspection, name: "Machine Inspection" },
  { id: AppointmentType.SignBuyerAgreement, name: "Sign Buyer Agreement" },
  { id: AppointmentType.SignRentingAgreement, name: "Sign Renting Agreement" },
  {
    id: AppointmentType.SignRentingOutAgreement,
    name: "Sign Renting Out Agreement",
  },
  { id: AppointmentType.SignSellerAgreement, name: "Sign Seller Agreement" },
  {
    id: AppointmentType.ViewFullInspectionReport,
    name: "View Full Inspection Report",
  },
];

export default function Page() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [selectedAppointmentStatus, setSelectedAppointmentStatus] =
    useState<AppointmentStatus>(AppointmentStatus.Default);
  const [selectedAppointmentType, setSelectedAppointmentType] =
    useState<AppointmentType>(AppointmentType.Default);
  const appointmentsInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [
      "appointments",
      selectedAppointmentStatus,
      selectedAppointmentType,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiAppointmentParams = {
        PageSize: 10,
        PageNumber: pageParam,
        AppointmentStatus: selectedAppointmentStatus,
        AppointmentType: selectedAppointmentType,
      };
      const { data } = await AxiosLibs.axiosClient.get(`/api/Appointment`, {
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

  const appointments: AppointmentDto[] =
    appointmentsInfiniteQuery.data?.pages.flatMap((page) => {
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
            title={`My Appointment`}
            size="2-extra-big"
            className="text-center whitespace-pre-line text-black"
          />
        </div>
        <div className="flex mb-2 flex-wrap gap-4 p-4">
          <ItemPickerLabel
            title="Status"
            options={appointmentStatuses}
            selectedValue={
              appointmentStatuses.find((z) => z.id == selectedAppointmentStatus)
                ?.name ?? "All"
            }
            onSelect={(id) => {
              if (id == "All") {
                setSelectedAppointmentStatus(AppointmentStatus.Default);
              } else {
                setSelectedAppointmentStatus(id as AppointmentStatus);
              }
            }}
          />
          <ItemPickerLabel
            title="Type"
            options={appointmentTypes}
            selectedValue={
              appointmentTypes.find((z) => z.id == selectedAppointmentType)
                ?.name ?? "All"
            }
            onSelect={(id) => {
              if (id == "All") {
                setSelectedAppointmentType(AppointmentType.Default);
              } else {
                setSelectedAppointmentType(id as AppointmentType);
              }
            }}
          />
        </div>
        <div className={`grid grid-cols-1 p-4`}>
          {appointments.map((data) => (
            <div
              key={data.id}
              className="bg-white"
              style={{
                display: "flex",
                flex: "0 0 auto",
                margin: 10,
              }}
              onClick={() => {
                router.push(`/my-appointments/${data.id}`);
              }}
            >
              <div className={`flex-1`}>
                <img
                  src={
                    data.request?.buyRentRequestDetail?.listing?.thumbnailUrl ??
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
                          data.request?.buyRentRequestDetail?.listing
                            ?.listingType
                        ),
                      }}
                    >
                      <Text
                        size="small"
                        title={`${data.request?.buyRentRequestDetail?.listing?.listingType}`}
                        className="text-white"
                      />
                    </div>
                    <div className="px-2 self-start rounded-full">
                      <Text
                        size="small"
                        title={`${data.appointmentStatus}`}
                        style={{
                          color: getAppointmentStatusColor(
                            data.appointmentStatus
                          ),
                        }}
                      />
                    </div>
                  </div>
                  <Text size="small" title={`${data.appointmentType}`} />
                  <Text
                    size="small"
                    title={`${data.request?.buyRentRequestDetail?.listing?.name}`}
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
                        title={`${dayjs(data.appointmentDateTime).format(
                          "DD MMM YYYY"
                        )}`}
                      />
                    </>
                    <>
                      <IconClock color={Colors.black} width={25} height={25} />
                      <Text
                        size="small"
                        className="m-1"
                        title={`${dayjs(data.appointmentDateTime).format(
                          "HH:MM a"
                        )}`}
                      />
                    </>
                    <>
                      <IconMapPin color={Colors.black} width={25} height={25} />
                      <Text
                        size="small"
                        className="m-1"
                        title={`${data.address?.street} ${data.address?.street2}`}
                      />
                    </>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {appointmentsInfiniteQuery.hasNextPage && (
          <Button
            title="Load More"
            style={{
              backgroundColor: Colors.primary,
            }}
            onClick={() => {
              appointmentsInfiniteQuery.fetchNextPage();
            }}
            className="self-center p-4"
          />
        )}
      </main>
    </>
  );
}
