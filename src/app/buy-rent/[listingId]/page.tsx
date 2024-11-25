"use client";

import FAQsContainer from "@/app/app-components/FAQsContainer";
import HeavyEquipmentsContainer from "@/app/app-components/HeavyEquipmentsContainer";
import HowAndStepContainer from "@/app/app-components/HowAndStepContainer";
import Button from "@/components/Shared/Button";
import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import MediaImageGallery from "./MediaImageGallery";
import { useQuery } from "@tanstack/react-query";
import { ListingDto } from "@/orval/type.schemas";
import { getListingTypeColor } from "@/libs/utils";
import { Colors } from "@/constants/Colors";
import { AxiosLibs } from "@/libs/axios-client";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { listingId: string } }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const listingsDetailQuery = useQuery({
    queryKey: ["listingDetail", params.listingId],
    queryFn: async () => {
      return AxiosLibs.axiosClient.get(`/api/Listing/${params.listingId}`);
    },
  });

  const listingsDetailData: ListingDto | undefined =
    listingsDetailQuery.data?.data ?? undefined;

  const documentMedia = listingsDetailData?.listingMedias?.find(
    (z) => z.type == "Document"
  );

  const getDocumentName = () => {
    if (listingsDetailData?.condition == "Used") {
      return `View General Inspection Report`;
    } else if (listingsDetailData?.condition == "New") {
      return `View Catalog`;
    }
  };

  return (
    <main className="flex flex-col">
      {listingsDetailData && (
        <>
          <MediaImageGallery
            medias={
              listingsDetailData?.listingMedias?.filter(
                (z) => z.type == "Image"
              ) ?? []
            }
          />
          <div
            className={`flex mb-10 ${
              isMobile ? `flex-col` : `flex-row w-9/12 self-center`
            }`}
          >
            <div className={`flex flex-1 flex-col ${isMobile ? `p-4` : ``}`}>
              <div className={`flex`}>
                <button className={`flex p-2 items-center gap-2`}>
                  <CustomIcon
                    name="icon-park-outline:like"
                    size={20}
                    color={"#000000"}
                  />
                  <Text size="small" title={`Favourite`} />
                </button>
                <button className={`flex p-2 items-center gap-2`}>
                  <CustomIcon
                    name="majesticons:share-line"
                    size={25}
                    color={"#1977F2"}
                  />
                  <Text
                    size="small"
                    title={`Share`}
                    className="text-[#1977F2]"
                  />
                </button>
              </div>
              <Text
                size="extra-big"
                title={`${listingsDetailData?.name}`}
                className="mb-2"
              />
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex flex-wrap w-full gap-2">
                  <div
                    className="px-2 self-start rounded-full"
                    style={{
                      backgroundColor: getListingTypeColor(
                        listingsDetailData?.listingType
                      ),
                    }}
                  >
                    <Text
                      size="small"
                      title={`${listingsDetailData?.listingType}`}
                      className="text-white"
                    />
                  </div>
                  <div className="bg-[#FF7F50] px-2 self-start rounded-full">
                    <Text
                      size="small"
                      title={`${listingsDetailData?.machine?.machineType?.name}`}
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-1 ${
                isMobile ? `flex-row items-center px-4` : `flex-col items-end`
              }`}
            >
              <Text
                size="2-extra-big"
                title={`RM ${listingsDetailData?.price}`}
                className={`${isMobile ? `` : `mb-4`}`}
              />
              <Button
                title="I'm interested with this"
                className={`text-white w-fit h-fit p-2 rounded-full ml-auto`}
                style={{
                  backgroundColor: Colors.primary,
                }}
                onClick={() => {
                  router.push(
                    `/form-buyrent?listingId=${listingsDetailData.id}&&isRent=${
                      listingsDetailData.listingType == "Sell" ? false : true
                    }`
                  );
                }}
              />
            </div>
          </div>
          <div
            className={`grid p-4 gap-4 ${
              isMobile ? `grid-cols-2` : `grid-cols-4 w-9/12 self-center`
            }`}
          >
            <div className="flex flex-col p-2 rounded bg-[#FAF2EA]">
              <Text size="medium" title={"Brand"} />
              <Text
                size="medium"
                title={`${listingsDetailData?.machine?.machineMake?.name}`}
              />
            </div>
            <div className="flex flex-col p-2 rounded bg-[#FAF2EA]">
              <Text size="medium" title={"Year"} />
              <Text
                size="medium"
                title={`${listingsDetailData?.listingDetail?.year}`}
              />
            </div>
            <div className="flex flex-col p-2 rounded bg-[#FAF2EA]">
              <Text size="medium" title={"Location"} />
              <Text size="medium" title={`${listingsDetailData?.location}`} />
            </div>
            <div className="flex flex-col p-2 rounded bg-[#FAF2EA]">
              <Text size="medium" title={"Hour Meter"} />
              <Text
                size="medium"
                title={`${listingsDetailData?.listingDetail?.hourMeter}`}
              />
            </div>
            <div className="flex flex-col p-2 rounded bg-[#FAF2EA]">
              <Text size="medium" title={"Reg Card"} />
              <Text
                size="medium"
                title={`${
                  listingsDetailData?.listingDetail?.regCard ? `Yes` : `No`
                }`}
              />
            </div>
            <div className="flex flex-col p-2 rounded bg-[#FAF2EA]">
              <Text size="medium" title={"Model"} />
              <Text
                size="medium"
                title={`${listingsDetailData?.machine?.machineDetail?.modelNo}`}
              />
            </div>
            <div className="flex flex-col p-2 rounded bg-[#FAF2EA]">
              <Text size="medium" title={"Chassis No"} />
              <Text
                size="medium"
                title={`${listingsDetailData?.listingDetail?.chasisNo}`}
              />
            </div>
            <div className="flex flex-col p-2 rounded bg-[#FAF2EA]">
              <Text size="medium" title={"Engine No"} />
              <Text
                size="medium"
                title={`${listingsDetailData?.listingDetail?.engineNo}`}
              />
            </div>
            <div className="flex flex-col p-2 rounded bg-[#FAF2EA]">
              <Text size="medium" title={"Condition"} />
              <Text size="medium" title={`${listingsDetailData?.condition}`} />
            </div>
          </div>
          <Button
            title={`${getDocumentName()}`}
            className={`text-[#1877F2] w-fit h-fit p-2 rounded-lg mb-20 ${
              isMobile ? `mx-4` : ` mx-40`
            }`}
            style={{
              backgroundColor: "#EBF0FA",
            }}
            onClick={() => {
              window.open(documentMedia?.mediaUrl ?? "");
            }}
          />
        </>
      )}
      <HowAndStepContainer type={"buy"} />
      <HeavyEquipmentsContainer title="Maybe You Like" type="buy" />
      <FAQsContainer />
    </main>
  );
}
