import React, { ReactNode, useEffect, useRef, useState } from "react";
import Text from "./Text";
import CustomIcon from "./CustomIcon";

interface DropdownMenuProps {
  label?: string;
  placeholderText?: string;
  icon?: ReactNode;
  datas: {
    text: string;
    index: number;
  }[];
  containerStyle?: string;
  onPress(index: number): void;
}
const DropdownMenu = (props: DropdownMenuProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex flex-col ${props.containerStyle} w-full`}>
      {props.label && <Text title={props.label} size="small" />}
      <div
        className={`relative w-full ${
          props.label && `mt-2`
        }`}
        ref={dropdownRef}
      >
        <button
          onClick={toggleDropdown}
          className="flex w-full items-center justify-center px-4 py-2 shadow rounded-lg bg-white border-[#D9D9D9] hover:bg-[#D9D9D9]"
        >
          {props.icon && props.icon}
          {props.placeholderText && (
            <Text size="small" title={props.placeholderText} />
          )}
          <CustomIcon name="mingcute:right-line" size={25} color={"#000000"} />
        </button>
        {isOpen && (
          <div
            className="flex flex-col absolute bg-white rounded-lg shadow  z-10 right-0  overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {props.datas.map((data) => (
              <button
                key={data.index}
                className="px-4 py-2 hover:bg-[#D9D9D9]"
                role="menuitem"
                onClick={() => {
                  props.onPress(data.index);
                  setIsOpen(false);
                }}
              >
                <Text size="small" title={data.text} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
