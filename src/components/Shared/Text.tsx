import { Poppins } from "next/font/google";

interface TextProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size: "2-extra-big" | "extra-big" | "big" | "medium" | "small";
}

const inter = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function Text(props: TextProps) {
  return (
    <label
      className={`${props.size == "2-extra-big" && ` text-2xl`} ${
        props.size == "extra-big" && `text-xl`
      }  ${props.size == "big" && `text-lg`} ${
        props.size == "medium" && `text-base`
      } ${props.size == "small" && `text-sm`} ${inter.className} ${
        props.className
      }`}
      style={props.style}
    >
      {props.title}
    </label>
  );
}
