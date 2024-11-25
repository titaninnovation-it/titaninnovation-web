"use client";

import Text from "@/components/Shared/Text";
import SearchbarCollaborators from "./collaborators-components/SearchbarCollaborators";
import useIsMobile from "@/libs/useIsMobile";
import Paging from "@/components/Shared/Paging";

const list = [
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
  {
    title: "Advertising title",
    description:
      "Lorem ipsum dolar sit amet consectetur. Porta sitsed malesuada quis non ultrices magna aliquam.Amet sed sed egesta ultricies urna so...",
  },
];

export default function Page() {
  const isMobile = useIsMobile();
  return (
    <main className={`flex flex-col`}>
      <div
        className={`flex flex-col flex-1 items-center ${
          isMobile ? `p-4` : `w-6/12 self-center`
        }`}
      >
        <Text size="2-extra-big" title="Collaborators" className="p-10" />
        <SearchbarCollaborators />
      </div>
      <div className="flex flex-1 flex-col p-6 items-center">
        <div className="flex flex-row">
          {[
            "All",
            "Building Materials",
            "Parts & Components Suppliers",
            "Logistics & Transportation",
          ].map((data) => (
            <button className="mr-4" key={data} onClick={() => {}}>
              <Text
                size="medium"
                title={data}
                className={`${data == "All" ? `border-b-2 border-black` : ``}`}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-10/12 self-center">
        <div
          className={`grid gap-4 p-4 ${
            isMobile ? `grid-cols-1 ` : `grid-cols-2`
          }`}
        >
          {list.map((data, index) => (
            <div key={index} className="flex shadow p-2 gap-2">
              <div
                className={`rounded-lg bg-[#555555] ${
                  isMobile ? `w-[3rem] h-[3rem]` : `w-[5rem] h-[5rem]`
                }`}
              />
              <div className="flex flex-col flex-1 justify-center">
                <Text size="medium" title={data.title} />
                <Text size="small" title={data.description} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Paging initialPage={1} total={3} onPageChange={(page) => {}} />
    </main>
  );
}
