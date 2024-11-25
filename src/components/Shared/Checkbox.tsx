import Text from "./Text";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  containerStyle?: string;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <div className={`flex ${props.containerStyle}`}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        className="form-checkbox h-4 w-4 rounded-lg"
      />
      <Text size="small" className="ml-2" title={props.title} />
    </div>
  );
}
