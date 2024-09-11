import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  placeholder: string;
  imgSrc: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  placeholder,
  imgSrc,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 ${otherClasses} ${iconPosition === "right" ? "flex-row-reverse" : "flex-row"}`}
    >
      <Image
        src={imgSrc}
        alt="search icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />

      <Input
        type="text"
        placeholder={placeholder}
        value=""
        className="paragraph-regular no-focus placeholder text-dark400_light500 border-none bg-transparent shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
