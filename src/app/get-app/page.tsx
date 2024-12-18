"use client";

import { PaddingHeaderHeight } from "@/components/Header";
import DownloadAppContainer from "../app-components/DownloadAppContainer";

export default function GetApp() {
  return (
    <main className={`flex bg-[#003366] ${PaddingHeaderHeight}`}>
      <DownloadAppContainer />
    </main>
  );
}
