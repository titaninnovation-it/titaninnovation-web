"use client";

import Button from "@/components/Shared/Button";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import ProfileImageTextInputFile from "@/components/Shared/ProfileImageTextInputFile";
import { AxiosLibs } from "@/libs/axios-client";
import useIsMobile from "@/libs/useIsMobile";
import { useAuthStore } from "@/libs/zustand/authStore";
import {
  PostApiUserSasUrlForUploadMutationBody,
  PutApiUserProfileMutationBody,
} from "@/orval/type";
import { ResponseDto, SasUploadMediaDto } from "@/orval/type.schemas";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";

export default function Page() {
  const authStore = useAuthStore();
  const isMobile = useIsMobile();
  const [form, setForm] = useState<PutApiUserProfileMutationBody | null>(null);
  const updateProfileMutation = useMutation({
    mutationFn: async (data: PutApiUserProfileMutationBody) => {
      return AxiosLibs.axiosClient.put(`/api/User/profile`, data);
    },
  });
  const sasUrlForUploadMutation = useMutation({
    mutationFn: async (data: PostApiUserSasUrlForUploadMutationBody) => {
      return AxiosLibs.axiosClient.post(`/api/User/SasUrlForUpload`, data);
    },
  });

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      companyName: authStore.profile?.companyName ?? "",
      picFullName: authStore.profile?.picFullName ?? "",
      phoneNumber: authStore.profile?.phoneNumber ?? "",
      userId: authStore.profile?.userId ?? "",
    }));
  }, [authStore.profile]);

  const handleSave = async () => {
    if (form) {
      await updateProfileMutation.mutate(form, {
        onSuccess: async (response) => {
          const data = response.data as ResponseDto;
          if (data.isSuccess) {
            window.alert("Saved");
            authStore.getProfile();
          } else {
            window.alert(data.errMessage);
          }
        },
        onError: (e) => {
          window.alert(e.message);
        },
      });
    }
  };
  return (
    <main className={`flex flex-col bg-[#FAF3EA]`}>
      {form && (
        <div
          className={`flex flex-1 justify-center items-center ${
            isMobile ? `py-4` : `py-20`
          }`}
        >
          <div className={`flex flex-col ${isMobile ? `w-[90%]` : `w-[45%]`}`}>
            <Text
              title={`My Account`}
              size="2-extra-big"
              className="mb-6 text-center whitespace-pre-line"
            />
            <div className={`flex flex-col gap-6`}>
              <ProfileImageTextInputFile
                image={authStore.profile?.profilePictureUrl ?? ""}
                onChoose={async (file) => {
                  await sasUrlForUploadMutation.mutate(
                    { fileName: file.name },
                    {
                      onSuccess: async (response) => {
                        const data = response.data as SasUploadMediaDto;
                        const sasUrlResponse = await fetch(
                          data.sasUrlForUploadMedia ?? "",
                          {
                            method: "PUT",
                            body: file,
                            headers: {
                              "x-ms-blob-type": "BlockBlob",
                              "Content-Type": file.type ?? "image/jpeg",
                            },
                          }
                        );
                        if (sasUrlResponse.ok) {
                          await updateProfileMutation.mutate(
                            {
                              userId: authStore.profile?.userId,
                              profilePictureUrl: `${data.fileUrlPrefix}/${file.name}`,
                            },
                            {
                              onSuccess: async (response) => {
                                const data = response.data as ResponseDto;
                                if (data.isSuccess) {
                                  window.alert("Profile Image Updated");
                                  authStore.getProfile();
                                } else {
                                  window.alert(data.errMessage);
                                }
                              },
                              onError: (e) => {
                                window.alert(e.message);
                              },
                            }
                          );
                        }
                      },
                      onError: (e) => {
                        window.alert(e.message);
                      },
                    }
                  );
                }}
              />
              <TextInput
                title="Company Name"
                value={form.companyName ?? ""}
                onChange={(e) => {
                  setForm((prevState) => ({
                    ...prevState,
                    companyName: e.target.value,
                  }));
                }}
                placeholder="Enter name"
              />
              <TextInput
                title="Fullname"
                value={form.picFullName ?? ""}
                onChange={(e) => {
                  setForm((prevState) => ({
                    ...prevState,
                    FirstName: e.target.value,
                  }));
                }}
                placeholder="Enter name"
              />
              <TextInput
                title="Phone Number"
                value={form.phoneNumber ?? ""}
                placeholder="+60"
                onChange={(e) => {
                  setForm((prevState) => ({
                    ...prevState,
                    phoneNumber: e.target.value,
                  }));
                }}
              />
              <TextInput
                disabled={true}
                value={authStore.profile?.email ?? ""}
                title="Email"
                placeholder="Enter your email"
              />
              <Button
                onClick={handleSave}
                title="Save"
                className={`p-4 mt-10 text-white`}
                style={{
                  backgroundColor: Colors.primary,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
