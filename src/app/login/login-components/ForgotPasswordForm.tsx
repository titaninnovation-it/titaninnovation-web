import Button from "@/components/Shared/Button";
import ButtonIcon from "@/components/Shared/ButtonIcon";
import CustomIcon from "@/components/Shared/CustomIcon";
import Text from "@/components/Shared/Text";
import TextInput from "@/components/Shared/TextInput";
import { Colors } from "@/constants/Colors";
import useIsMobile from "@/libs/useIsMobile";
import { useState } from "react";

interface ForgotPasswordFormProps {
  isLoading: boolean;
  onSubmit(email: string): void;
  onBack(): void;
}

export default function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState<string>("");
  return (
    <div
      className={`flex flex-col p-10 rounded-lg ${
        isMobile ? `w-[90%]` : `w-[35%]`
      }`}
    >
      <div className={`flex mb-10 items-center`}>
        <ButtonIcon
          icon={
            <CustomIcon
              name="mingcute:left-line"
              size={isMobile ? 25 : 40}
              color={"#000"}
            />
          }
          onClick={() => {
            props.onBack();
          }}
          className="mr-2"
        />
        <Text title={`Forgot password?`} size="2-extra-big" />
      </div>
      <Text
        title={`Please enter your email to continue`}
        size="medium"
        className="mb-10"
      />
      <TextInput
        title="Email"
        placeholder="Example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type={"tel"}
        className="mb-2"
      />
      <Button
        isLoading={props.isLoading}
        disabled={props.isLoading || email.trim().length == 0}
        title="Next"
        style={{
          backgroundColor:
            email.trim().length == 0 ? Colors.darkGray : Colors.primary,
        }}
        className="p-4 mt-6 text-white"
        onClick={() => props.onSubmit(email)}
      />
    </div>
  );
}
