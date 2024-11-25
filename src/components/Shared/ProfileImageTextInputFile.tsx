import Image from "next/image";
import Text from "./Text";
import CustomIcon from "./CustomIcon";

interface ProfileImageTextInputFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  image: string | null;
  onChoose(file: any): void;
}

export default function ProfileImageTextInputFile(
  props: ProfileImageTextInputFileProps
) {
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      props.onChoose(file);
    }
  };
  return (
    <>
      <input
        id={"file"}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      <div className={`flex flex-col self-center`}>
        <div className="flex mb-2">
          {props.required && (
            <Text size="small" title={"*"} className="text-[#FF4D4E]" />
          )}
          <Text size="small" title={props.title} />
        </div>
        <div className="flex">
          {!props.image && (
            <label
              htmlFor="file"
              className={
                "flex flex-col bg-white justify-center items-center p-6 px-10 w-fit rounded-lg border border-[#D9D9D9] hover:border-[#4196FF] mr-4"
              }
            >
              <CustomIcon
                name={"material-symbols-light:upload"}
                size={60}
                color={"#000000"}
              />
              <Text size="small" title="Change Profile" />
            </label>
          )}
          {props.image && (
            <label htmlFor="file" className="flex flex-col items-center">
              <Image
                src={props.image}
                alt={"profileImage"}
                width={150}
                height={150}
                className="rounded-full mb-2"
                onClick={handleImageChange}
                id={"file"}
              />
              <Text
                size="small"
                title={`Change Profile`}
                className="underline text-[#1977F2]"
              />
            </label>
          )}
        </div>
      </div>
    </>
  );
}
