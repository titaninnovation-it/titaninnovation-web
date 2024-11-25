import ActivityIndicator from "./ActivityIndicator";
import Text from "./Text";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  isLoading?: boolean;
  textStyle?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`flex rounded items-center justify-center shadow ${
        props.disabled
          ? "opacity-50 cursor-not-allowed"
          : "opacity-100 cursor-pointer hover:opacity-90"
      } ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.iconLeft}
      <Text size={"medium"} title={props.title} className={props.textStyle} />
      {props.iconRight}
      <ActivityIndicator visible={props.isLoading} />
    </button>
  );
}
