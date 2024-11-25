interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
}

export default function ButtonIcon(props: ButtonIconProps) {
  return (
    <button
      className={`${props.className}`}
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}
