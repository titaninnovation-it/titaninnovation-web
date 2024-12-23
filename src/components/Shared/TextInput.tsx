import { ReactNode, useState } from "react";
import Text from "./Text";
import { Open_Sans } from "next/font/google";
import CustomIcon from "./CustomIcon";
const inter = Open_Sans({ weight: "300", subsets: ["latin"] });

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  title?: string;
}

export default function TextInput(props: TextInputProps) {
  const [isSecureEntry, setIsSecureEntry] = useState(
    props.type == "password" ? true : false
  );
  return (
    <div className={`flex flex-col ${props.className}`}>
      {props.title && (
        <div className="flex mb-2">
          {props.required && (
            <Text size="small" title={"*"} className="text-[#FF4D4E] mr-1" />
          )}
          <Text size="small" title={props.title} />
        </div>
      )}
      <div className="flex relative rounded shadow-sm">
        {props.iconLeft}
        <input
          autoCapitalize={props.autoCapitalize}
          type={
            isSecureEntry
              ? "password"
              : props.type == "password"
              ? "text"
              : props.type
          }
          className={`w-full rounded-lg border bg-[#F2F2F2] hover:border-[#4196FF] p-2 ${
            props.iconLeft ? `px-10` : ``
          } ${inter.className}`}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        {props.iconRight}
        {props.type == "password" && (
          <button
            onClick={() => setIsSecureEntry(!isSecureEntry)}
            className="absolute right-4 top-2"
          >
            <CustomIcon
              name={isSecureEntry ? "mdi:eye" : "mdi:eye-off-outline"}
              size={20}
              color={"#939393"}
            />
          </button>
        )}
      </div>
    </div>
  );
}
