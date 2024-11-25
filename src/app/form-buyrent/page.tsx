"use client";

import Button from "@/components/Shared/Button";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import { Colors } from "@/constants/Colors";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import { useAuthStore } from "@/libs/zustand/authStore";
import { PostApiRequestBuyRentMutationBody } from "@/orval/type";
import { InterestType, RequestDtoDataResponseDto } from "@/orval/type.schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const authStore = useAuthStore();
  const isMobile = useIsMobile();
  const requestBuyRentMutation = useMutation({
    mutationFn: async (data: PostApiRequestBuyRentMutationBody) => {
      return AxiosLibs.axiosClient.post(`/api/Request/BuyRent`, data);
    },
  });
  const [listingId, setListingId] = useState<string | null>(null);
  const [isRent, setIsRent] = useState<string | null>(null);
  const [form, setForm] = useState<PostApiRequestBuyRentMutationBody>({
    interestType: InterestType.BookMachine,
  });

  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    const queryListingId = params.get("listingId");
    const queryisRent = params.get("isRent");
    setListingId(queryListingId);
    setIsRent(queryisRent);
  }, []);

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      requestorName: authStore.profile?.companyName ?? "",
      requestorPhoneNumber: authStore.profile?.phoneNumber ?? "",
      requestorEmail: authStore.profile?.email ?? "",
    }));
  }, [authStore.profile]);

  const handleSubmitRequest = async () => {
    await requestBuyRentMutation.mutate(
      {
        ...form,
        listingId: listingId as string,
        isRent: isRent == "true" ? true : false,
      },
      {
        onSuccess: async (response) => {
          const data = response.data as RequestDtoDataResponseDto;
          if (data.isSuccess) {
            window.alert(
              "Thanks for showing interest, we will have a designated salesperson contact you soon"
            );
            router.back();
          } else {
            window.alert(data.errMessage);
          }
        },
        onError: (e) => {
          window.alert(e.message);
        },
      }
    );
  };
  return (
    <main className={`flex flex-col`}>
      <div
        className={`flex bg-[#003366] items-center justify-center p-10 py-40`}
      >
        <Text
          title={`Fill your contact info`}
          size="2-extra-big"
          className="text-center whitespace-pre-line text-white"
        />
      </div>
      <div
        className={`flex flex-1 justify-center items-center ${
          isMobile ? `py-4` : `py-20`
        }`}
      >
        <div
          className={`flex flex-col p-10 rounded-lg shadow-lg ${
            isMobile ? `w-[90%]` : `w-[45%]`
          }`}
        >
          <Text
            title={`Fill your contact info`}
            size="2-extra-big"
            className="mb-6 text-center whitespace-pre-line"
          />
          <div className={`flex flex-col gap-6`}>
            <TextInput
              title="Name / Company Name"
              placeholder="Enter your name or company name"
              value={`${form.requestorName}`}
              onChange={(e) => {
                setForm((prevState) => ({
                  ...prevState,
                  requestorName: e.target.value,
                }));
              }}
            />
            <TextInput
              title="Phone Number"
              placeholder="011345XXXXX"
              value={`${form.requestorPhoneNumber}`}
              onChange={(e) => {
                setForm((prevState) => ({
                  ...prevState,
                  requestorPhoneNumber: e.target.value,
                }));
              }}
            />
            <TextInput
              title="Email"
              placeholder="Enter your email"
              value={`${form.requestorEmail}`}
              onChange={(e) => {
                setForm((prevState) => ({
                  ...prevState,
                  requestorEmail: e.target.value,
                }));
              }}
            />
            <Button
              disabled={requestBuyRentMutation.isPending}
              title="Submit Request"
              className={`p-4 mt-10 bg-black text-white`}
              style={{
                backgroundColor: Colors.primary,
              }}
              onClick={handleSubmitRequest}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
