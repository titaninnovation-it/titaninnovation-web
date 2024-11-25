"use client";

import useIsMobile from "@/libs/useIsMobile";
import DownloadAppContainer from "../app-components/DownloadAppContainer";

export default function GetApp() {
  const isMobile = useIsMobile();
  return (
    <main className={`flex bg-[#003366]`}>
      <DownloadAppContainer />
    </main>
  );
}
