"use client";

import Button from "@/components/Shared/Button";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import { Colors } from "@/constants/Colors";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import { useAuthStore } from "@/libs/zustand/authStore";
import {
  CreateEnquiryCommand,
  RequestDtoDataResponseDto,
} from "@/orval/type.schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const authStore = useAuthStore();
  const router = useRouter();
  const isMobile = useIsMobile();
  const requestEnquiryMutation = useMutation({
    mutationFn: async (data: CreateEnquiryCommand) => {
      return AxiosLibs.axiosClient.post(`/api/Request/Enquiry`, data);
    },
  });
  const [form, setForm] = useState<CreateEnquiryCommand>({
    requestorName: ``,
    requestorPhoneNumber: ``,
    requestorEmail: ``,
    enquiryRemarks: "",
  });

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      requestorName: authStore.profile?.companyName ?? ``,
      requestorPhoneNumber: authStore.profile?.phoneNumber ?? ``,
      requestorEmail: authStore.profile?.email ?? ``,
    }));
  }, [authStore.profile]);

  const handleSubmit = async () => {
    await requestEnquiryMutation.mutate(form, {
      onSuccess: async (response) => {
        const data = response.data as RequestDtoDataResponseDto;
        if (data.isSuccess) {
          window.alert("submitted");
          router.replace("/");
        } else {
          window.alert(data.errMessage);
        }
      },
      onError: (e) => {
        window.alert(e.message);
      },
    });
  };
  return (
    <main
      className={`flex flex-col`}
      style={{
        backgroundColor: Colors.lightGrayishOrange,
      }}
    >
      <div
        className={`flex flex-1 justify-center items-center ${
          isMobile ? `py-4` : `py-20`
        }`}
      >
        <div
          className={`flex flex-col p-10 rounded-lg bg-[#FFF] ${
            isMobile ? `w-[90%]` : `w-[35%]`
          }`}
        >
          <Text
            title={`Enquiry`}
            size="2-extra-big"
            className="mb-2 whitespace-pre-line"
          />
          <Text
            title={`Leave your message below and we will get back to you`}
            size="small"
            className="mb-6 whitespace-pre-line"
          />
          <div className={`flex flex-col gap-6`}>
            <TextInput
              title="Your name"
              placeholder="Enter your name"
              value={form.requestorName ?? ""}
              onChange={(e) => {
                setForm((prevState) => ({
                  ...prevState,
                  requestorName: e.target.value,
                }));
              }}
            />
            <TextInput
              title="Phone Number"
              placeholder="Enter phone number"
              value={form.requestorPhoneNumber ?? ""}
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
              value={form.requestorEmail ?? ""}
              onChange={(e) => {
                setForm((prevState) => ({
                  ...prevState,
                  requestorEmail: e.target.value,
                }));
              }}
            />
            <TextInput
              title="Your message"
              placeholder="Write your message here"
              multiple
              value={form.enquiryRemarks ?? ""}
              onChange={(e) => {
                setForm((prevState) => ({
                  ...prevState,
                  enquiryRemarks: e.target.value,
                }));
              }}
            />
            <Button
              title="Submit"
              className={`p-4 px-20 mt-10 self-center rounded-full text-white bg-[#FAA71A]`}
              onClick={handleSubmit}
              isLoading={requestEnquiryMutation.isPending}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
