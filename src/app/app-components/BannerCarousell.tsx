"use client";

import "swiper/scss";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";

import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Controller, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import Image from "next/image";
import useIsMobile from "@/libs/useIsMobile";
import ButtonIcon from "@/components/Shared/ButtonIcon";
import CustomIcon from "@/components/Shared/CustomIcon";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  AdvertisementDto,
  GetApiAdvertisementParams,
} from "@/orval/type.schemas";
import { useRouter } from "next/navigation";
import { AxiosLibs } from "@/libs/axios-client";

const BannerCarousell = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [swiperControll, setSwiperControll] = useState<SwiperProps | any>(null);
  const [swiperControllSecond, setSwiperControllSecond] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const advertismentInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["/api/Advertisement"],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiAdvertisementParams = {
        PageSize: 5,
        PageNumber: pageParam,
        IsSystemAdvertisement: true,
      };
      const { data } = await AxiosLibs.axiosClient.get(`/api/Advertisement`, {
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

  const advertisments: AdvertisementDto[] =
    advertismentInfiniteQuery.data?.pages.flatMap((page) => {
      return page.items;
    }) ?? [];

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <>
      {advertisments.length > 0 ? (
        <div className="flex">
          <div
            className={`absolute flex flex-1 z-10 w-full ${
              isMobile ? `h-[20vh]` : `h-[60vh]`
            }`}
          >
            <div className="flex-1 flex justify-end items-center">
              <ButtonIcon
                icon={
                  <CustomIcon
                    name="icons8:left-round"
                    size={isMobile ? 25 : 40}
                    color={"#000000"}
                  />
                }
                onClick={() => {
                  swiperControll.slidePrev();
                }}
              />
            </div>
            <div
              className={`flex w-[80vw] items-end justify-center ${
                isMobile ? `pb-[1rem]` : `pb-[6rem]`
              }`}
              onClick={() => {
                router.push(advertisments[activeIndex].urlToRedirectTo ?? "");
              }}
            >
              <div className="flex gap-2">
                {advertisments.map((data, index) => (
                  <div
                    key={index}
                    className={`h-[0.6rem] rounded-full ${
                      index == activeIndex
                        ? `w-[2rem] bg-[#FDCF33]`
                        : `w-[0.6rem] bg-black bg-opacity-50`
                    }`}
                    onClick={() => swiperControll.slideTo(index)}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1 flex justify-start items-center">
              <ButtonIcon
                icon={
                  <CustomIcon
                    name="icons8:right-round"
                    size={isMobile ? 25 : 40}
                    color={"#000000"}
                  />
                }
                onClick={() => {
                  swiperControll.slideNext();
                }}
              />
            </div>
          </div>
          <Swiper
            slidesPerView={1}
            onSwiper={(swiper) => setSwiperControll(swiper)}
            onSlideChange={() => setActiveIndex(swiperControll.activeIndex)}
            modules={[Controller, Autoplay]}
            controller={{ control: swiperControllSecond }}
            autoplay={{
              delay: 6000, // Delay between slides in milliseconds
              // disableOnInteraction: false, // Autoplay will not be disabled after user interactions
            }}
          >
            {advertisments.map((data) => (
              <SwiperSlide key={data.id}>
                <div
                  className={`relative w-[100vw] ${
                    isMobile ? `h-[20vh]` : `h-[60vh]`
                  }`}
                >
                  <Image
                    src={data.thumbnailUrl ?? ""}
                    objectFit="cover"
                    alt=""
                    fill
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="h-40" />
      )}
    </>
  );
};

export default BannerCarousell;
