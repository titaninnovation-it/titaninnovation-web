import useIsMobile from "@/libs/useIsMobile";
import { Poppins } from "next/font/google";

interface TextProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size: "2-extra-big" | "extra-big" | "big" | "medium" | "small";
}

const inter = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const BoldInter = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export default function Text(props: TextProps) {
  const isMobile = useIsMobile();
  return (
    <label
      className={`${
        props.size == "2-extra-big"
          ? `${isMobile?`text-xl`:`text-4xl`} ${BoldInter.className}`
          : ``
      } 
      ${props.size == "extra-big" ? `text-xl ${inter.className} ` : ``}  ${
        props.size == "big" ? `text-lg ${inter.className} ` : ``
      } 
      ${props.size == "medium" ? `text-base ${inter.className} ` : ``} ${
        props.size == "small" ? `text-sm ${inter.className} ` : ``
      } ${props.className}`}
      style={props.style}
    >
      {props.title}
    </label>
  );
}
