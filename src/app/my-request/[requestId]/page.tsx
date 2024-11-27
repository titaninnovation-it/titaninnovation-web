"use client";

import Text from "@/components/Shared/Text";
import { Colors } from "@/constants/Colors";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import { getListingTypeColor } from "@/libs/utils";
import { RequestDto } from "@/orval/type.schemas";
import { useQuery } from "@tanstack/react-query";
import IconMeter from "@/svg/Meter.svg";
import IconMapPin from "@/svg/MapPin.svg";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function Page({ params }: { params: { requestId: string } }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const requestDetailQuery = useQuery({
    queryKey: ["requestDetail", params.requestId],
    queryFn: async () => {
      return AxiosLibs.axiosClient.get(`/api/request/${params.requestId}`);
    },
  });
  const details: RequestDto | undefined =
    requestDetailQuery.data?.data ?? undefined;
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
            title={`Request Detail`}
            size="2-extra-big"
            className="text-center whitespace-pre-line text-black"
          />
        </div>
        <div
          className={`flex gap-4 ${
            isMobile ? `flex-col p-2` : `flex-col w-9/12 self-center p-10`
          }`}
        >
          {details?.requestType == "Buy" || details?.requestType == "Rent" ? (
            <>
              <Text size="medium" title={`ID: ${details?.id}`} />
              <Text
                size="medium"
                title={`Request Type: ${details?.requestType}`}
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
                    `/buy-rent/${details?.buyRentRequestDetail?.listing?.id}`
                  );
                }}
              >
                <div className={`flex-1`}>
                  <img
                    src={
                      details?.buyRentRequestDetail?.listing?.thumbnailUrl ?? ``
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
                            details?.buyRentRequestDetail?.listing?.listingType
                          ),
                        }}
                      >
                        <Text
                          size="small"
                          title={`${details?.buyRentRequestDetail?.listing?.listingType}`}
                          className="text-white"
                        />
                      </div>
                      <div className="bg-[#FF7F50] px-2 self-start rounded-full">
                        <Text
                          size="small"
                          title={`${details?.buyRentRequestDetail?.listing?.machine?.machineType?.name}`}
                          className="text-white"
                        />
                      </div>
                    </div>
                    <Text
                      size="small"
                      title={`${details?.buyRentRequestDetail?.listing?.name}`}
                    />
                    <div className="flex items-center">
                      <>
                        <IconMeter
                          color={Colors.black}
                          width={25}
                          height={25}
                        />
                        <Text
                          size="small"
                          className="m-1"
                          title={`${details?.buyRentRequestDetail?.listing?.listingDetail?.hourMeter}`}
                        />
                      </>
                      <>
                        <IconMapPin
                          color={Colors.black}
                          width={25}
                          height={25}
                        />
                        <Text
                          size="small"
                          title={`${details?.buyRentRequestDetail?.listing?.location}`}
                        />
                      </>
                    </div>
                    <Text
                      size="medium"
                      title={`RM ${details?.buyRentRequestDetail?.listing?.price}`}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="flex flex-col gap-4">
            <Text
              title={`Request Status`}
              size="2-extra-big"
              className="text-center whitespace-pre-line text-black"
            />
            {details?.requestLogs?.map((data) => (
              <>
                <div className="flex flex-col bg-white p-2">
                  <Text
                    title={`${data.toStatus}`}
                    size="big"
                    className="whitespace-pre-line text-black"
                  />
                  <Text
                    title={`${data.remark}`}
                    size="big"
                    className="whitespace-pre-line text-black"
                  />
                  <Text
                    title={`${dayjs(data.createdAt).format(
                      "DD/MM/YYYY, HH:MM"
                    )}`}
                    size="big"
                    className="whitespace-pre-line text-black"
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
