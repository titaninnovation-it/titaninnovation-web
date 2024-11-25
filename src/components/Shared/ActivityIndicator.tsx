import CustomIcon from "./CustomIcon";

interface ActivityIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean | undefined;
}

export default function ActivityIndicator(props: ActivityIndicatorProps) {
  return (
    <>
      {props.visible && (
        // <div
        //   className={`absolute w-5 h-5 border-b-2 border-white rounded-full spin animate-spin ${props.className}`}
        // />
        <CustomIcon
          name="line-md:loading-twotone-loop"
          size={20}
          color="#FFFFFF"
          className="ml-2"
        />
      )}
    </>
  );
}
