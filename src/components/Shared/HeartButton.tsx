import IconHeart from "@/svg/Heart.svg";
import IconHeartOutline from "@/svg/HeartOutline.svg";
import { Colors } from "@/constants/Colors";
import { useMutation } from "@tanstack/react-query";
import { PostApiUserFavouriteMutationBody } from "@/orval/type";
import { AxiosLibs } from "@/libs/axios-client";
import { useState } from "react";
import { useAuthStore } from "@/libs/zustand/authStore";
import CustomIcon from "./CustomIcon";
import useIsMobile from "@/libs/useIsMobile";

interface HeartButtonProps {
  id: string;
  isUserFavourite: boolean;
}

export default function HeartButton(props: HeartButtonProps) {
  const isMobile = useIsMobile();
  const authStore = useAuthStore();
  const [isUserFavourite, setIsUserFavourite] = useState<boolean>(
    props.isUserFavourite
  );
  const likeMutation = useMutation({
    mutationFn: async (data: PostApiUserFavouriteMutationBody) => {
      return AxiosLibs.axiosClient.post(`/api/UserFavourite`, data);
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: async (data: { ListingId: string }) => {
      return AxiosLibs.axiosClient.delete(
        `/api/UserFavourite/Listing/${data.ListingId}`,
        {
          data: data,
        }
      );
    },
  });
  return (
    <>
      {authStore.profile && (
        <button
          className={`flex items-center justify-center absolute z-10 right-0 m-4`}
          onClick={async () => {
            setIsUserFavourite(!isUserFavourite);
            if (!isUserFavourite) {
              await likeMutation.mutate({
                listingId: props.id,
              });
            } else {
              await unlikeMutation.mutate({
                ListingId: props.id,
              });
            }
          }}
        >
          {isUserFavourite ? (
            <CustomIcon
              name="mdi:heart"
              size={isMobile ? 25 : 30}
              color={Colors.red}
            />
          ) : (
            <CustomIcon
              name="mdi:heart-outline"
              size={isMobile ? 25 : 30}
              color={Colors.white}
            />
          )}
        </button>
      )}
    </>
  );
}
