"use client";

import Text from "@/components/Shared/Text";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import { getListingTypeColor } from "@/libs/utils";
import { AppointmentDto } from "@/orval/type.schemas";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import IconMeter from "@/svg/Meter.svg";
import IconMapPin from "@/svg/MapPin.svg";
import { Colors } from "@/constants/Colors";

export default function Page({
  params,
}: {
  params: { appointmentId: string };
}) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const appointmentDetailQuery = useQuery({
    queryKey: ["apppointmentDetail", params.appointmentId],
    queryFn: async () => {
      return AxiosLibs.axiosClient.get(
        `/api/appointment/${params.appointmentId}`
      );
    },
  });
  const details: AppointmentDto | undefined =
    appointmentDetailQuery.data?.data ?? undefined;

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
            title={`Appointment Detail`}
            size="2-extra-big"
            className="text-center whitespace-pre-line text-black"
          />
        </div>
        <div
          className={`flex gap-4 ${
            isMobile ? `flex-col p-2` : `flex-col w-9/12 self-center p-10`
          }`}
        >
          <Text
            size="medium"
            title={`Appointment Type: ${details?.appointmentType}`}
          />
          <Text
            size="medium"
            title={`Appointment Status: ${details?.appointmentStatus}`}
          />
          <Text
            size="medium"
            title={`Appointment Date: ${dayjs(
              details?.appointmentDateTime
            ).format("DD/MM/YYYY HH:MM a")}`}
          />
          <Text
            size="medium"
            title={`Business Affliate: ${details?.businessAffiliate?.username}`}
          />
          <Text
            size="medium"
            title={`Address: ${details?.address?.street} ${details?.address?.street2}`}
          />
          <Text size="medium" title={`Your Request Item`} />
          <div
            style={{
              display: "flex",
              flex: "0 0 auto",
              width: isMobile ? "95%" : 270,
              // height: 300,
              flexDirection: "column",
              margin: isMobile ? "2%" : "",
            }}
            onClick={() => {
              router.push(
                `/buy-rent/${details?.request?.buyRentRequestDetail?.listing?.id}`
              );
            }}
          >
            <div className={`flex-1`}>
              <img
                src={
                  details?.request?.buyRentRequestDetail?.listing
                    ?.thumbnailUrl ?? ``
                }
                className={`w-full object-cover rounded-t-2xl ${
                  isMobile ? `h-40` : `h-60 `
                }`}
                alt=""
              />
            </div>
            <div className="flex flex-col flex-1 bg-white rounded-b-2xl p-4 border-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap w-full gap-2">
                  <div
                    className="px-2 self-start rounded-full"
                    style={{
                      backgroundColor: getListingTypeColor(
                        details?.request?.buyRentRequestDetail?.listing
                          ?.listingType
                      ),
                    }}
                  >
                    <Text
                      size="small"
                      title={`${details?.request?.buyRentRequestDetail?.listing?.listingType}`}
                      className="text-white"
                    />
                  </div>
                  <div className="bg-[#FF7F50] px-2 self-start rounded-full">
                    <Text
                      size="small"
                      title={`${details?.request?.buyRentRequestDetail?.listing?.machine?.machineType?.name}`}
                      className="text-white"
                    />
                  </div>
                </div>
                <Text
                  size="small"
                  title={`${details?.request?.buyRentRequestDetail?.listing?.name}`}
                />
                <div className="flex items-center">
                  <>
                    <IconMeter color={Colors.black} width={25} height={25} />
                    <Text
                      size="small"
                      className="m-1"
                      title={`${details?.request?.buyRentRequestDetail?.listing?.listingDetail?.hourMeter}`}
                    />
                  </>
                  <>
                    <IconMapPin color={Colors.black} width={25} height={25} />
                    <Text
                      size="small"
                      title={`${details?.request?.buyRentRequestDetail?.listing?.location}`}
                    />
                  </>
                </div>
                <Text
                  size="medium"
                  title={`RM ${details?.request?.buyRentRequestDetail?.listing?.price}`}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
