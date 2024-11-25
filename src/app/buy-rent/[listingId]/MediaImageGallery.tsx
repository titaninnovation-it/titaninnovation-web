import Text from "@/components/Shared/Text";
import useIsMobile from "@/libs/useIsMobile";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useRef, useState } from "react";
import CustomIcon from "@/components/Shared/CustomIcon";
import ButtonIcon from "@/components/Shared/ButtonIcon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ListingMediaDto } from "@/orval/type.schemas";

interface MediaImageGalleryProps {
  medias: ListingMediaDto[];
}

export default function MediaImageGallery(props: MediaImageGalleryProps) {
  const sliderRef = useRef<any>(null);
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleMouseDown = (e: any) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(false);
  };

  const handleMouseMove = (e: any) => {
    if (dragStartRef.current) {
      const dragDistance = Math.sqrt(
        Math.pow(e.clientX - dragStartRef.current.x, 2) +
          Math.pow(e.clientY - dragStartRef.current.y, 2)
      );
      if (dragDistance > 5) {
        setIsDragging(true);
      }
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      setVisible(true);
    }
    dragStartRef.current = null;
  };

  const handlePrevOrNext = (action: "prev" | "next") => {
    let index = currentImageIndex;
    if (action == "prev") {
      index = index - 1;
    } else if (action == "next") {
      index = index + 1;
    }
    if (index + 1 > props.medias.length || index < 0) {
    } else {
      const newImageToShow = props.medias[index];
      setCurrentImageIndex(index);
      // setImageCategoryType(newImageToShow.category as any);
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col mb-4 ${
          isMobile ? `p-4` : `w-6/12 self-center`
        }`}
      >
        <div className="relative flex-col mb-4">
          <Text
            title={`${currentImageIndex + 1}/${props.medias.length.toString()}`}
            size="medium"
            className="text-white absolute z-10 right-4 bottom-4"
          />
          <Slider
            ref={sliderRef}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            afterChange={(index) => {
              if (!visible) {
                // when image zoomable component is not visible
                setCurrentImageIndex(index);
              }
            }}
          >
            {props.medias.map((data, index) => (
              <img
                key={data.id}
                src={data.mediaUrl ?? ``}
                alt=""
                className={`object-contain rounded-xl ${
                  isMobile ? `w-[15rem] h-[15rem]` : ` h-[25rem] `
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              />
            ))}
          </Slider>
        </div>
        {/* <div className="flex gap-2">
          {exteriorImages.length > 0 && (
            <div
              className="relative flex flex-1"
              onClick={() =>}
            >
              <img
                src={exteriorImages[0].image}
                alt=""
                className={`object-cover rounded-xl ${
                  isMobile ? "h-[6rem]" : "h-[10rem]"
                }`}
              />
              <Text
                title={`Exterior (${exteriorImages.length})`}
                size="small"
                className="text-white absolute self-end text-center  p-2 px-4"
              />
            </div>
          )}
          {interiorImages.length > 0 && (
            <div
              className="relative flex flex-1"
              onClick={() =>}
            >
              <img
                src={interiorImages[0].image}
                alt=""
                className={`object-cover rounded-xl ${
                  isMobile ? "h-[6rem]" : "h-[10rem]"
                }`}
              />
              <Text
                title={`Interior (${interiorImages.length})`}
                size="small"
                className="text-white absolute self-end text-center p-2 px-4"
              />
            </div>
          )}
          {imperfectionsImages.length > 0 && (
            <div
              className="relative flex flex-1"
              onClick={() =>}
            >
              <img
                src={imperfectionsImages[0].image}
                alt=""
                className={`object-cover rounded-xl ${
                  isMobile ? "h-[6rem]" : "h-[10rem]"
                }`}
              />
              <Text
                title={`Imperfection (${imperfectionsImages.length})`}
                size="small"
                className="text-white absolute self-end text-center  p-2 px-4"
              />
            </div>
          )}
        </div> */}
      </div>
      {visible && (
        <div className={`fixed flex flex-col inset-0 bg-black z-50`}>
          <button
            className="flex p-4 pb-0 ml-auto"
            onClick={() => {
              setVisible(false);
            }}
          >
            <CustomIcon
              name="material-symbols:close"
              size={isMobile ? 20 : 24}
              color={"#FFFFFF"}
            />
          </button>
          {/* <div
            className={`flex justify-center border-[#696C71] border-b-1 mb-4`}
          >
            <button
              className={`p-4 ${
                imageCategoryType == "exterior"
                  ? `border-[#FDCF33] border-b-2`
                  : ``
              }`}
              onClick={() => handleImageCategory("exterior")}
            >
              <Text
                title={`Exterior (${exteriorImages.length})`}
                size="small"
                className={`${
                  imageCategoryType == "exterior"
                    ? `text-[#FDCF33]`
                    : `text-white`
                }`}
              />
            </button>
            <button
              className={`p-4 ${
                imageCategoryType == "interior"
                  ? `border-[#FDCF33] border-b-2`
                  : ``
              }`}
              onClick={() => handleImageCategory("interior")}
            >
              <Text
                title={`Interior (${interiorImages.length})`}
                size="small"
                className={`${
                  imageCategoryType == "interior"
                    ? `text-[#FDCF33]`
                    : `text-white`
                }`}
              />
            </button>
            <button
              className={`p-4 ${
                imageCategoryType == "imperfections"
                  ? `border-[#FDCF33] border-b-2`
                  : ``
              }`}
              onClick={() => handleImageCategory("imperfections")}
            >
              <Text
                title={`Imperfections (${imperfectionsImages.length})`}
                size="small"
                className={`${
                  imageCategoryType == "imperfections"
                    ? `text-[#FDCF33]`
                    : `text-white`
                }`}
              />
            </button>
          </div> */}
          <div>
            <Zoom>
              <img
                src={props.medias[currentImageIndex].mediaUrl ?? ``}
                alt=""
                className={`object-contain w-full ${
                  isMobile ? "h-[35vh]" : "h-[55vh]"
                }`}
              />
            </Zoom>
          </div>
          <div className="flex justify-center items-center">
            <ButtonIcon
              icon={
                <CustomIcon
                  name="icon-park-solid:left-c"
                  size={isMobile ? 25 : 40}
                  color={"#FFFFFF"}
                />
              }
              onClick={() => {
                handlePrevOrNext("prev");
              }}
              className="p-4 mr-auto"
            />
            <Text
              title={`${currentImageIndex + 1}/${props.medias.length}`}
              size="medium"
              className="text-white"
            />
            <ButtonIcon
              icon={
                <CustomIcon
                  name="icon-park-solid:right-c"
                  size={isMobile ? 25 : 40}
                  color={"#FFFFFF"}
                />
              }
              onClick={() => {
                handlePrevOrNext("next");
              }}
              className="p-4 ml-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}
