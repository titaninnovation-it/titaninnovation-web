"use client";

export default function Page() {
    return(
        <>
        </>
    )
}

// import Button from "@/components/Shared/Button";
// import DropdownMenu from "@/components/Shared/DropdownMenu";
// import Text from "@/components/Shared/Text";
// import TextInput from "@/components/Shared/TextInput";
// import useIsMobile from "@/libs/useIsMobile";
// import {
//   CreateCollaboratorRequestCommand,
//   FilterDto,
//   RequestDtoDataResponseDto,
// } from "@/orval/type.schemas";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Page() {
//   const router = useRouter();
//   const isMobile = useIsMobile();
//   const useGetFilterQuery = useQuery({
//     queryKey: ["filter"],
//     queryFn: async () => {
//       return .get(`/api/Filter`);
//     },
//   });
//   const filter = (useGetFilterQuery.data?.data.data as FilterDto) ?? null;
//   const [form, setForm] = useState<CreateCollaboratorRequestCommand>({
//     requestType: 0,
//     requestorName: "",
//     companyName: "",
//     companyRegistrationNo: "",
//     requestorPhoneNumber: "",
//     requestorEmail: "",
//     location: 0,
//     remarks: "",
//   });

//   const requestCollaboratorMutation = useMutation({
//     mutationFn: async (data: CreateCollaboratorRequestCommand) => {
//       return .post(`/api/Request/Collaborator`, data);
//     },
//   });

//   const handleSubmit = async () => {
//     await requestCollaboratorMutation.mutate(form, {
//       onSuccess: async (response) => {
//         const data = response.data as RequestDtoDataResponseDto;
//         if (data.isSuccess) {
//           window.alert("submitted");
//           router.replace("/");
//         } else {
//           window.alert(data.errMessage);
//         }
//       },
//       onError: (e) => {
//         window.alert(e.message);
//       },
//     });
//   };
//   return (
//     <>
//       {filter && (
//         <main className={`flex flex-col`}>
//           <div
//             className={`flex flex-1 justify-center items-center ${
//               isMobile ? `py-4` : `py-20`
//             }`}
//           >
//             <div
//               className={`flex flex-col p-10 rounded-lg bg-[#CACACA] ${
//                 isMobile ? `w-[90%]` : `w-[35%]`
//               }`}
//             >
//               <Text
//                 title={`Collaborate with us now\n\nLeave your contact details below and we will get back to you`}
//                 size="2-extra-big"
//                 className="mb-6 text-center whitespace-pre-line"
//               />
//               <div className={`flex flex-col gap-6`}>
//                 <TextInput
//                   title="Company REG"
//                   placeholder=""
//                   value={form.companyRegistrationNo ?? ""}
//                   onChange={(e) => {
//                     setForm((prevState) => ({
//                       ...prevState,
//                       companyRegistrationNo: e.target.value,
//                     }));
//                   }}
//                 />
//                 <TextInput
//                   title="Company Name"
//                   placeholder="Enter company name"
//                   value={form.companyName ?? ""}
//                   onChange={(e) => {
//                     setForm((prevState) => ({
//                       ...prevState,
//                       companyName: e.target.value,
//                     }));
//                   }}
//                 />
//                 <TextInput
//                   title="Name"
//                   placeholder="Enter your name"
//                   value={form.requestorName ?? ""}
//                   onChange={(e) => {
//                     setForm((prevState) => ({
//                       ...prevState,
//                       requestorName: e.target.value,
//                     }));
//                   }}
//                 />
//                 <TextInput
//                   title="Phone Number"
//                   placeholder="+60"
//                   value={form.requestorPhoneNumber ?? ""}
//                   onChange={(e) => {
//                     setForm((prevState) => ({
//                       ...prevState,
//                       requestorPhoneNumber: e.target.value,
//                     }));
//                   }}
//                 />
//                 <TextInput
//                   title="Email"
//                   placeholder="Enter your email"
//                   value={form.requestorEmail ?? ""}
//                   onChange={(e) => {
//                     setForm((prevState) => ({
//                       ...prevState,
//                       requestorEmail: e.target.value,
//                     }));
//                   }}
//                 />
//                 <TextInput
//                   title="Your message"
//                   placeholder="Write your message here"
//                   multiple
//                   value={form.remarks ?? ""}
//                   onChange={(e) => {
//                     setForm((prevState) => ({
//                       ...prevState,
//                       remarks: e.target.value,
//                     }));
//                   }}
//                 />
//                 <Button
//                   title="Submit"
//                   className={`p-4 mt-10 bg-black text-white`}
//                   isLoading={requestCollaboratorMutation.isPending}
//                   onClick={handleSubmit}
//                 />
//               </div>
//             </div>
//           </div>
//         </main>
//       )}
//     </>
//   );
// }
