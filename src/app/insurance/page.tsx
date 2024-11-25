"use client";

import Button from "@/components/Shared/Button";
import DropdownMenu from "@/components/Shared/DropdownMenu";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import useIsMobile from "@/libs/useIsMobile";
import HowAndStepContainer from "../app-components/HowAndStepContainer";
import FAQsContainer from "../app-components/FAQsContainer";
import OurInsurancePartnersContainer from "./insurance-components/OurInsurancePartnersContainer";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateInsuranceRequestCommand,
  FilterDto,
  InsuranceType,
  RequestDtoDataResponseDto,
  StatesAndTerritoriesOfMalaysia,
} from "@/orval/type.schemas";
import Checkbox from "@/components/Shared/Checkbox";
import { useRouter } from "next/navigation";
import { AxiosLibs } from "@/libs/axios-client";
import { useAuthStore } from "@/libs/zustand/authStore";
import ItemPicker from "@/components/Shared/ItemPicker";
import { Colors } from "@/constants/Colors";

const statesAndTerritoriesOfMalaysiaList = Object.values(
  StatesAndTerritoriesOfMalaysia
).map((z) => ({
  id: z,
  name: z,
}));

export default function Page() {
  const authStore = useAuthStore();
  const router = useRouter();
  const tabs = [
    { id: 0, name: `Insurance Enquiry` },
    { id: 1, name: `Heavy Equipment All Risk Insurance` },
  ];
  const [selectedTabId, setSelectedTabId] = useState<number>(0);
  const insuranceTypes = [
    {
      id: InsuranceType.ContractorAllRiskInsurance,
      name: "Contractor All Risk Insurance",
    },
    {
      id: InsuranceType.EquipmentAllRiskInsurance,
      name: "",
    },
    { id: InsuranceType.PerformanceBond, name: "Performance Bond" },
    { id: InsuranceType.WorkmanCompensation, name: "Workman Compensation" },
    { id: InsuranceType.Others, name: "Others" },
  ];
  const isMobile = useIsMobile();
  const useGetFilterQuery = useQuery({
    queryKey: ["filter"],
    queryFn: async () => {
      return AxiosLibs.axiosClient.get(`/api/Filter`);
    },
  });
  const filter = (useGetFilterQuery.data?.data.data as FilterDto) ?? null;
  const [form, setForm] = useState<CreateInsuranceRequestCommand>({
    requestorName: ``,
    requestorPhoneNumber: ``,
    requestorEmail: ``,
    insuranceType: InsuranceType.ContractorAllRiskInsurance as InsuranceType,
    machineType: undefined,
    machineMake: undefined,
    modelName: undefined,
    registrationCard: false,
    sumInsured: "",
    registrationNo: "",
    location: StatesAndTerritoriesOfMalaysia.Selangor,
  });

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      requestorName: authStore.profile?.companyName ?? ``,
      requestorPhoneNumber: authStore.profile?.phoneNumber ?? ``,
      requestorEmail: authStore.profile?.email ?? ``,
    }));
  }, [authStore.profile]);

  const requestInsuranceMutation = useMutation({
    mutationFn: async (data: CreateInsuranceRequestCommand) => {
      return AxiosLibs.axiosClient.post(`/api/Request/Insurance`, data);
    },
  });

  const handleSubmit = async () => {
    await requestInsuranceMutation.mutate(form, {
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
    <>
      {filter && (
        <main className={`flex flex-col`}>
          <div
            className={`flex bg-[#003366] items-center justify-center p-10 py-40`}
          >
            <Text
              title={`Get Your Machine \nInsured 🚜💨`}
              size="2-extra-big"
              className="text-center whitespace-pre-line text-white"
            />
          </div>
          <div
            className={`flex flex-1 justify-center items-center ${
              isMobile ? `py-4` : `py-20 top-20`
            }`}
          >
            <div
              className={`flex flex-col p-10 rounded-lg shadow-lg ${
                isMobile ? `w-[90%]` : `w-[45%]`
              }`}
            >
              <div className="flex flex-row mb-10">
                {tabs.map((data) => (
                  <button
                    className="mr-4"
                    style={{
                      borderBottomWidth: selectedTabId == data.id ? 2 : 0,
                      borderColor:
                        selectedTabId == data.id ? Colors.primary : ``,
                    }}
                    key={data.id}
                    onClick={() => {
                      setForm((prevState) => ({
                        ...prevState,
                        insuranceType:
                          data.id == 0
                            ? undefined
                            : InsuranceType.HeavyEquipmentAllRiskInsurance,
                      }));

                      setSelectedTabId(data.id);
                    }}
                  >
                    <Text
                      size="medium"
                      title={data.name}
                      style={{
                        color: data.id == selectedTabId ? Colors.primary : ``,
                      }}
                    />
                  </button>
                ))}
              </div>
              <div className={`flex flex-col gap-6`}>
                {selectedTabId == 0 && (
                  <ItemPicker
                    isRequired={!form.insuranceType}
                    title="Type"
                    selectedValue={
                      insuranceTypes.find((z) => z.id == form.insuranceType)
                        ?.name ?? `Select`
                    }
                    options={insuranceTypes}
                    onSelect={(id) => {
                      setForm((prevState) => ({
                        ...prevState,
                        insuranceType: id as InsuranceType,
                      }));
                    }}
                  />
                )}
                {form.insuranceType ==
                  InsuranceType.HeavyEquipmentAllRiskInsurance && (
                  <>
                    <TextInput
                      title="Type"
                      placeholder="Enter your type"
                      value={form.machineType ?? ""}
                      onChange={(e) => {
                        setForm((prevState) => ({
                          ...prevState,
                          machineType: e.target.value,
                        }));
                      }}
                    />
                    <TextInput
                      title="Brand"
                      placeholder="Enter your brand"
                      value={form.machineMake ?? ""}
                      onChange={(e) => {
                        setForm((prevState) => ({
                          ...prevState,
                          machineMake: e.target.value,
                        }));
                      }}
                    />
                    <TextInput
                      title="Model"
                      placeholder="Enter your model"
                      value={form.machineMake ?? ""}
                      onChange={(e) => {
                        setForm((prevState) => ({
                          ...prevState,
                          modelName: e.target.value,
                        }));
                      }}
                    />
                    <TextInput
                      title="Sum Insured"
                      placeholder="0"
                      value={form.sumInsured ?? ""}
                      onChange={(e) => {
                        setForm((prevState) => ({
                          ...prevState,
                          sumInsured: e.target.value,
                        }));
                      }}
                    />
                    <TextInput
                      title="Registration No"
                      placeholder=""
                      value={form.registrationNo ?? ""}
                      onChange={(e) => {
                        setForm((prevState) => ({
                          ...prevState,
                          registrationNo: e.target.value,
                        }));
                      }}
                    />
                    <Checkbox
                      title={"Registration Card"}
                      checked={form.registrationCard}
                      onChange={(e) => {
                        setForm((prevState) => ({
                          ...prevState,
                          registrationCard: e.target.checked,
                        }));
                      }}
                      containerStyle={`mb-2 mt-2`}
                    />
                    <ItemPicker
                      isRequired={!form.location}
                      title="Location"
                      selectedValue={
                        statesAndTerritoriesOfMalaysiaList.find(
                          (z) => z.id == form.location
                        )?.name ?? `Select`
                      }
                      options={statesAndTerritoriesOfMalaysiaList}
                      onSelect={(id) => {
                        setForm((prevState) => ({
                          ...prevState,
                          location: id as StatesAndTerritoriesOfMalaysia,
                        }));
                      }}
                    />
                  </>
                )}
                <TextInput
                  title="Your name/ Company name"
                  placeholder=""
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
                  placeholder="+60"
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
              </div>
              <Button
                title="Submit"
                isLoading={requestInsuranceMutation.isPending}
                className={`p-4 mt-10 bg-black text-white`}
                disabled={requestInsuranceMutation.isPending}
                style={{
                  backgroundColor: Colors.primary,
                }}
                onClick={handleSubmit}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <OurInsurancePartnersContainer />
            <HowAndStepContainer type="insurance" />
            <FAQsContainer />
          </div>
        </main>
      )}
    </>
  );
}
