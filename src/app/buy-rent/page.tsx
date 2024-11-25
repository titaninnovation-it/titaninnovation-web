"use client";

import useIsMobile from "@/libs/useIsMobile";
import BannerCarousell from "../app-components/BannerCarousell";
import Text from "@/components/Shared/Text";
import CustomIcon from "@/components/Shared/CustomIcon";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ListingCard from "@/components/Shared/Card/ListingCard";
//import Paging from "@/components/Shared/Paging";
import FAQsContainer from "../app-components/FAQsContainer";
//import NotifyContainer from "./buy-rent-components/NotifyContainer";
import { useRouter } from "next/navigation";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  FilterDto,
  GetApiListingParams,
  ListingCondition,
  ListingType,
} from "@/orval/type.schemas";
import Button from "@/components/Shared/Button";
import { Colors } from "@/constants/Colors";
import { AxiosLibs } from "@/libs/axios-client";
import TextInput from "@/components/Shared/TextInput";
import ItemPickerLabel from "@/components/Shared/ItemPickerLabel";

export default function Page() {
  const router = useRouter();
  const divRef = useRef<any>(null);
  const [width, setWidth] = useState(0);
  const isMobile = useIsMobile();
  const list = ["Conditions", "Type", "Brand"];
  const [filters, setFilters] = useState<string[]>([]);
  const [tempFilters, setTempFilters] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [selectedListingType, setSelectedListingType] = useState<ListingType>(
    ListingType.Sell
  );
  const [selectedCondition, setSelectedCondition] = useState<ListingCondition>(
    ListingCondition.Default
  );
  const [selectedMachineTypeIds, setSelectedMachineTypeIds] = useState<
    string[] | undefined
  >(undefined);

  const [selectedMachineMakeIds, setSelectedMachineMakeIds] = useState<
    string[] | undefined
  >(undefined);

  const tabs = [
    { id: ListingType.Sell, name: `Buy` },
    { id: ListingType.Rent, name: `Rent` },
  ];

  const conditions = [
    { name: "Used", id: ListingCondition.Used },
    { name: "New", id: ListingCondition.New },
  ];

  const useGetFilterQuery = useQuery({
    queryKey: ["filter"],
    queryFn: async () => {
      return AxiosLibs.axiosClient.get(`/api/Filter`);
    },
  });
  const filter: FilterDto | undefined =
    useGetFilterQuery.data?.data.data ?? undefined;
  const brands = [
    "Hyundai",
    "Kobelco",
    "jCB",
    "Liebherr",
    "Hitachi",
    "Volvo",
    "Kamatsu",
    "Caterpillar",
    "BMW",
    "Honda",
    "Perodua",
  ];
  const listingsInfiniteQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [
      "listings",
      searchPhrase,
      selectedListingType,
      selectedCondition,
      selectedMachineMakeIds,
      selectedMachineTypeIds,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const query: GetApiListingParams = {
        PageSize: 9,
        PageNumber: pageParam,
        ListingType: selectedListingType,
        ListingCondition: selectedCondition,
        SearchPhrase: searchPhrase,
        MachineTypeIds: (selectedMachineTypeIds &&
        selectedMachineTypeIds.length > 0
          ? selectedMachineTypeIds[0]
          : undefined) as undefined,
        MachineMakeIds: (selectedMachineMakeIds &&
        selectedMachineMakeIds.length > 0
          ? selectedMachineMakeIds[0]
          : undefined) as undefined,
      };
      const { data } = await AxiosLibs.axiosClient.get(`/api/Listing`, {
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
  const listings =
    listingsInfiniteQuery.data?.pages.flatMap((page) => {
      return page.items;
    }) ?? [];

  useEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
    }
  }, [visible, setVisible]);

  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    const queryMachineTypeIds = params.get("machineTypeIds");
    const queryMachineMakeIds = params.get("machineMakeIds");
    const queryListingType = params.get("listingType");
    if (typeof queryMachineTypeIds == "string") {
      setSelectedMachineTypeIds([queryMachineTypeIds]);
    }
    if (typeof queryMachineMakeIds == "string") {
      setSelectedMachineMakeIds([queryMachineMakeIds as string]);
    }
    if (typeof queryListingType == "string") {
      setSelectedListingType(queryListingType as ListingType);
    }
  }, []);

  return (
    <main className={`flex flex-col`}>
      <BannerCarousell />
      <div
        className={`flex bg-[#FFFFFF] gap-2 mb-10  flex-col ${
          isMobile
            ? `w-full p-4`
            : ` p-8 w-10/12 rounded-lg self-center bottom-[5rem] z-10 relative shadow`
        }`}
      >
        <div className={`flex relative w-full`} ref={divRef}>
          <TextInput
            iconLeft={
              <CustomIcon
                name="material-symbols-light:search"
                size={20}
                color={"#939393"}
                className="absolute left-3 top-3"
              />
            }
            iconRight={
              <>
                {searchPhrase.length > 0 && (
                  <button
                    onClick={() => setSearchPhrase("")}
                    className="absolute right-4 top-3"
                  >
                    <CustomIcon
                      name={"material-symbols:close"}
                      size={20}
                      color={"#939393"}
                    />
                  </button>
                )}
              </>
            }
            disabled
            placeholder="Search..."
            onChange={(e) => {
              setSearchPhrase(e.target.value);
            }}
            value={searchPhrase}
            className="w-full"
          />
        </div>
        <div className="flex mb-2 flex-wrap gap-4">
          <ItemPickerLabel
            title="Condition"
            options={conditions}
            selectedValue={
              conditions.find((z) => z.id == selectedCondition)?.name ?? "All"
            }
            onSelect={(id) => {
              if (id == "All") {
                setSelectedCondition(ListingCondition.Default);
              } else {
                setSelectedCondition(id as ListingCondition);
              }
            }}
          />
          <ItemPickerLabel
            title="Type"
            options={
              filter?.machineTypes?.map((z) => ({
                id: z.id ?? "",
                name: z.name ?? "",
                icon: z.typeIconUrl ?? undefined,
              })) ?? []
            }
            selectedValue={
              selectedMachineTypeIds && selectedMachineTypeIds.length > 0
                ? (filter?.machineTypes?.find(
                    (z) => z.id == selectedMachineTypeIds[0]
                  )?.name as string)
                : "All"
            }
            onSelect={(id) => {
              if (id == "All") {
                setSelectedMachineTypeIds(undefined);
              } else {
                setSelectedMachineTypeIds([id]);
              }
            }}
          />
          <ItemPickerLabel
            title="Brands"
            options={
              filter?.machineMakes?.map((z) => ({
                id: z.id ?? "",
                name: z.name ?? "",
                icon: z.logoImageUrl ?? undefined,
              })) ?? []
            }
            selectedValue={
              selectedMachineMakeIds && selectedMachineMakeIds.length > 0
                ? (filter?.machineMakes?.find(
                    (z) => z.id == selectedMachineMakeIds[0]
                  )?.name as string)
                : "All"
            }
            onSelect={(id) => {
              if (id == "All") {
                setSelectedMachineMakeIds(undefined);
              } else {
                setSelectedMachineMakeIds([id]);
              }
            }}
          />
          {/* {["Type", "Brand", "Filters"].map((data) => (
            <button
              key={data}
              className="flex flex-1 p-2 whitespace-nowrap border-1 border-[#C1C1C1] mr-2 justify-center items-center rounded"
              onClick={() => setVisible(true)}
            >
              <Text size="small" title={data} />
              {!isMobile && (
                <CustomIcon
                  name="icon-park-solid:right-c"
                  size={20}
                  color={"#939393"}
                  className="ml-auto"
                />
              )}
            </button>
          ))} */}
        </div>
        <div className="flex flex-row mx-10 self-center">
          {tabs.map((data) => (
            <button
              className="mr-4"
              style={{
                borderBottomWidth: selectedListingType == data.id ? 2 : 0,
                borderColor:
                  selectedListingType == data.id ? Colors.primary : ``,
              }}
              key={data.id}
              onClick={() => {
                setSelectedListingType(data.id);
              }}
            >
              <Text
                size="medium"
                title={data.name}
                style={{
                  color: data.id == selectedListingType ? Colors.primary : ``,
                }}
              />
            </button>
          ))}
        </div>
        {filters.length > 0 && (
          <div className="flex w-full mb-2 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <button
              className="flex p-2 rounded-full justify-center items-center shadown border-2 mr-2"
              onClick={() => {
                setTempFilters([]);
                setFilters([]);
              }}
            >
              <CustomIcon
                name="system-uicons:reset"
                size={15}
                color={"#000000"}
              />
              <Text title="Reset" size="small" className="text-blue-500 ml-2" />
            </button>
            {filters.map((data) => (
              <button
                key={data}
                className="p-1 flex justify-center border-2 w-fit rounded-full items-center mr-2"
                onClick={() => {
                  if (filters.find((z) => z == data) != undefined) {
                    setFilters((prevState) =>
                      prevState.filter((z) => z != data)
                    );
                    setTempFilters((prevState) =>
                      prevState.filter((z) => z != data)
                    );
                  } else {
                    setFilters((prevState) => [...prevState, data]);
                    setTempFilters((prevState) => [...prevState, data]);
                  }
                }}
              >
                <Text title={data} size="small" />
                <CustomIcon
                  name="material-symbols:close"
                  size={15}
                  color={"#000000"}
                  className="ml-auto"
                />
              </button>
            ))}
          </div>
        )}
        <div
          className={`grid  ${
            isMobile ? `grid-cols-2 ` : `grid-cols-3 gap-4 p-4`
          }`}
        >
          {listings.map((data) => (
            <ListingCard
              key={data.id}
              data={data}
              containerStyle=""
              onClick={() => {
                router.push(`/buy-rent/${data.id}`);
              }}
            />
          ))}
        </div>
        {/* <Paging initialPage={1} total={3} onPageChange={(page) => {}} /> */}
        {listingsInfiniteQuery.hasNextPage && (
          <Button
            title="Load More"
            style={{
              backgroundColor: Colors.primary,
            }}
            onClick={() => {
              listingsInfiniteQuery.fetchNextPage();
            }}
            className="self-center p-4"
          />
        )}
      </div>
      <FAQsContainer />
      {/* <NotifyContainer /> */}
      {visible && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex z-50`}>
          {!isMobile && <div className="flex flex-[70%]" />}
          <div className="flex flex-[40%] flex-col bg-white">
            <button
              className="p-4 flex justify-center border-b-2"
              onClick={() => setVisible(false)}
            >
              <Text title="All Filters" size="medium" />
              <CustomIcon
                name="material-symbols:close"
                size={isMobile ? 20 : 24}
                color={"#000000"}
                className="ml-auto"
              />
            </button>
            <div className="flex flex-row flex-1">
              <div className="flex flex-col flex-[30%] border-r-1">
                {list.map((data) => (
                  <button
                    key={data}
                    className="p-2 flex justify-center border-b-1"
                    onClick={() => {}}
                  >
                    <Text title={data} size="small" />
                  </button>
                ))}
              </div>
              <div className="flex flex-col flex-[70%]">
                <div
                  className={`grid gap-4 p-4 ${
                    isMobile ? `grid-cols-2 ` : `grid-cols-3`
                  }`}
                >
                  {brands.map((brand, index) => (
                    <button
                      key={index}
                      className="flex flex-col border-2 items-center p-2 rounded-lg"
                      onClick={() => {
                        if (tempFilters.find((z) => z == brand) != undefined) {
                          setTempFilters((prevState) =>
                            prevState.filter((z) => z != brand)
                          );
                        } else {
                          setTempFilters((prevState) => [...prevState, brand]);
                        }
                      }}
                    >
                      <Image
                        src={`/audi.png`}
                        alt=""
                        width={30}
                        height={30}
                        objectFit="contain"
                      />
                      <Text size="small" title={brand} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex p-2 flex-col border-t-1 gap-2">
              <div
                className="flex overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                style={{ width: `${width}px` }}
              >
                {tempFilters.map((data) => (
                  <button
                    key={data}
                    className="p-1 flex justify-center border-2 rounded-full items-center mr-2"
                    onClick={() => {
                      if (tempFilters.find((z) => z == data) != undefined) {
                        setTempFilters((prevState) =>
                          prevState.filter((z) => z != data)
                        );
                      } else {
                        setTempFilters((prevState) => [...prevState, data]);
                      }
                    }}
                  >
                    <Text title={data} size="small" />
                    <CustomIcon
                      name="material-symbols:close"
                      size={15}
                      color={"#000000"}
                      className="ml-auto"
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-2" ref={divRef}>
                <button
                  className="flex-1 p-2 justify-center bg-[#E6EBF2] rounded-lg"
                  onClick={() => {
                    setTempFilters([]);
                    setFilters([]);
                    setVisible(false);
                  }}
                >
                  <Text title="Reset" size="medium" />
                </button>
                <button
                  className="flex-1 p-2 justify-center bg-[#173559] rounded-lg"
                  onClick={() => {
                    setFilters(tempFilters);
                    setVisible(false);
                  }}
                >
                  <Text
                    title="Apply"
                    size="medium"
                    className="text-[#FDCF33]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
