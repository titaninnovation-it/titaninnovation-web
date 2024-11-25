import useIsMobile from "@/libs/useIsMobile";
import Text from "../Text";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import { PostApiRequestSellRentMutationBody } from "@/orval/type";
import { useAuthStore } from "@/libs/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosLibs } from "@/libs/axios-client";
import Checkbox from "../Checkbox";
import ItemPicker from "../ItemPicker";
import {
  RequestDtoDataResponseDto,
  StatesAndTerritoriesOfMalaysia,
} from "@/orval/type.schemas";
import Button from "../Button";
import { Colors } from "@/constants/Colors";
import { useRouter } from "next/navigation";

interface FormSellRentProps {
  isRent: boolean;
}

const statesAndTerritoriesOfMalaysiaList = Object.values(
  StatesAndTerritoriesOfMalaysia
).map((z) => ({
  id: z,
  name: z,
}));

export default function FormSellRent(props: FormSellRentProps) {
  const router = useRouter();
  const authStore = useAuthStore();
  const requestSellRentMutation = useMutation({
    mutationFn: async (data: PostApiRequestSellRentMutationBody) => {
      return AxiosLibs.axiosClient.post(`/api/Request/SellRent`, data);
    },
  });
  const isMobile = useIsMobile();
  const [form, setForm] = useState<PostApiRequestSellRentMutationBody>({
    hourMeter: 0,
    isRent: props.isRent,
    location: null as any,
    machineMake: "",
    machineType: "",
    modelNo: "",
    regCard: false,
  });
  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      requestorEmail: authStore.profile?.email ?? ``,
      requestorName: authStore.profile?.companyName ?? ``,
      requestorPhoneNumber: authStore.profile?.phoneNumber ?? ``,
    }));
  }, [authStore.profile]);

  const handleSubmitRequest = async () => {
    await requestSellRentMutation.mutate(form, {
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
    });
  };

  return (
    <div
      className={`flex flex-col p-10 rounded-lg shadow-lg ${
        isMobile ? `w-[90%]` : `w-[45%]`
      }`}
    >
      <Text
        title={`Fill up to get a quote!`}
        size="2-extra-big"
        className="mb-6 text-center whitespace-pre-line"
      />
      <div className={`flex flex-col gap-6`}>
        <TextInput
          title="Type"
          placeholder=""
          value={`${form.machineType}`}
          onChange={(e) => {
            setForm((prevState) => ({
              ...prevState,
              machineType: e.target.value,
            }));
          }}
        />
        <TextInput
          title="Brand"
          placeholder=""
          value={`${form.machineMake}`}
          onChange={(e) => {
            setForm((prevState) => ({
              ...prevState,
              machineMake: e.target.value,
            }));
          }}
        />
        <TextInput
          title="Model"
          placeholder=""
          value={`${form.modelNo}`}
          onChange={(e) => {
            setForm((prevState) => ({
              ...prevState,
              modelNo: e.target.value,
            }));
          }}
        />
        <TextInput
          title="Hour meter"
          placeholder=""
          value={`${form.hourMeter}`}
          onChange={(e) => {
            setForm((prevState) => ({
              ...prevState,
              hourMeter: e.target.value as unknown as number,
            }));
          }}
        />
        <Checkbox
          title={"Registration Card"}
          checked={form.regCard}
          onChange={(e) => {
            setForm((prevState) => ({
              ...prevState,
              regCard: e.target.checked,
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
          disabled={requestSellRentMutation.isPending}
          title="Submit Request"
          className={`p-4 mt-10 bg-black text-white`}
          style={{
            backgroundColor: Colors.primary,
          }}
          onClick={handleSubmitRequest}
        />
      </div>
    </div>
  );
}
