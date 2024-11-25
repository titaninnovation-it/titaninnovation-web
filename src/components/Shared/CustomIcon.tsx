import { Icon } from "@iconify/react";

interface CustomIconProps {
  name: string;
  size: number;
  color: string;
  className?: string | undefined;
}

export default function CustomIcon(props: CustomIconProps) {
  return (
    <Icon
      icon={props.name}
      width={props.size}
      height={props.size}
      color={props.color}
      className={props.className}
    />
  );
}
