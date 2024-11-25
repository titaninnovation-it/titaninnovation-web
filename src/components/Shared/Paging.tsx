import CustomIcon from "./CustomIcon";
import Text from "./Text";

interface PagingProps extends React.HTMLAttributes<HTMLDivElement> {
  initialPage: number;
  total: number;
  onPageChange(page: number): void;
}

export default function Paging(props: PagingProps) {
  const data = Array.from({ length: props.total }, (_, index) => index + 1);

  return (
    <div
      className={`flex flex-row gap-2 justify-center self-center ${props.className}`}
    >
      <button>
        <CustomIcon name="icon-park-solid:left-c" size={20} color={"#000000"} />
      </button>
      {data.map((item, index) => (
        <button key={item} className="border-2 p-1 px-3">
          <Text size="small" title={(index + 1).toString()} />
        </button>
      ))}
      <button>
        <CustomIcon
          name="icon-park-solid:right-c"
          size={20}
          color={"#000000"}
        />
      </button>
    </div>
  );
}
