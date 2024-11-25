import Text from "../Text";
import useIsMobile from "@/libs/useIsMobile";
import { BrowsingHistoryDto, ListingDto } from "@/orval/type.schemas";
import IconMeter from "@/svg/Meter.svg";
import IconMapPin from "@/svg/MapPin.svg";
import { Colors } from "@/constants/Colors";
import { getListingTypeColor } from "@/libs/utils";
import HeartButton from "../HeartButton";
interface ListingCardProps {
  data: ListingDto;
  containerStyle?: string;
  onClick(): void;
}

export default function ListingCard(props: ListingCardProps) {
  const isMobile = useIsMobile();
  return (
    <div
      className={`${props.containerStyle}`}
      style={{
        display: "flex",
        flex: "0 0 auto",
        width: isMobile ? "95%" : 270,
        // height: 300,
        flexDirection: "column",
        margin: isMobile ? "2%" : "",
      }}
    >
      <div className={`flex-1`}>
        <img
          src={props.data.thumbnailUrl ?? ``}
          className={`w-full object-cover rounded-t-2xl ${
            isMobile ? `h-40` : `h-60 `
          }`}
          alt=""
          onClick={props.onClick}
        />
      </div>
      <div className="flex flex-col flex-1 bg-white rounded-b-2xl p-4 border-2">
        <HeartButton
          id={props.data.id ?? ""}
          isUserFavourite={props.data.isUserFavourite ?? false}
        />
        <div className="flex flex-col gap-2" onClick={props.onClick}>
          <div className="flex flex-wrap w-full gap-2">
            <div
              className="px-2 self-start rounded-full"
              style={{
                backgroundColor: getListingTypeColor(props.data.listingType),
              }}
            >
              <Text
                size="small"
                title={`${props.data.listingType}`}
                className="text-white"
              />
            </div>
            <div className="bg-[#FF7F50] px-2 self-start rounded-full">
              <Text
                size="small"
                title={`${props.data.machine?.machineType?.name}`}
                className="text-white"
              />
            </div>
          </div>
          <Text size="small" title={`${props.data.name}`} />
          <div className="flex items-center">
            <>
              <IconMeter color={Colors.black} width={25} height={25} />
              <Text
                size="small"
                className="m-1"
                title={`${props.data.listingDetail?.hourMeter}`}
              />
            </>
            <>
              <IconMapPin color={Colors.black} width={25} height={25} />
              <Text size="small" title={`${props.data.location}`} />
            </>
          </div>
          <Text size="medium" title={`RM ${props.data.price}`} />
        </div>
      </div>
    </div>
  );
}