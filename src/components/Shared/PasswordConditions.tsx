import IconCheckCircle from "@/svg/CheckCircle.svg";
import Text from "./Text";
import CustomIcon from "./CustomIcon";

interface PasswordConditionsProps {
  password: string;
}

export default function PasswordConditions(props: PasswordConditionsProps) {
  const conditions = [
    { id: 0, text: "min 8 characters", hasValid: /.{8,}/.test(props.password) },
    {
      id: 1,
      text: "at least 1 number",
      hasValid: /[0-9]/.test(props.password),
    },
    {
      id: 2,
      text: "at least 1 special character (example:@#$!&)",
      hasValid: /[!@#$%^&*(),.?":{}|<>]/.test(props.password),
    },
    {
      id: 3,
      text: "at least 1 uppercase letter (A-Z)",
      hasValid: /[A-Z]/.test(props.password),
    },
  ];

  return (
    <>
      <Text
        size="small"
        title="Your Password must contain at least"
        className="mb-2"
      />
      {conditions.map((data) => (
        <>
          <div key={data.id} className="flex gap-2 items-center">
            <>
              {data.hasValid ? (
                <IconCheckCircle color={"#008000"} width={30} height={30} />
              ) : (
                <CustomIcon
                  name="material-symbols-light:circle-outline"
                  size={15}
                  color={"#000000"}
                />
              )}
            </>
            <Text title={data.text} className="" size="small" />
          </div>
        </>
      ))}
    </>
  );
}
