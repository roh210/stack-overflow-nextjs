import Image from "next/image";
import React from "react";

interface CardIconsProps {
  alt: string;
  imgSrc: string;
  width: number;
  height: number;
  iconDescription: string;
}

const CardIcons = ({
  alt,
  imgSrc,
  width,
  height,
  iconDescription,
}: CardIconsProps) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Image
        alt={alt}
        src={imgSrc}
        width={width}
        height={height}
        className=""
      />
      <p className="small-regular text-dark-400 dark:text-light-700">
        {iconDescription}
      </p>
    </div>
  );
};

export default CardIcons;
