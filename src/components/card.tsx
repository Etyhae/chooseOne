import { chooseImage } from "@/counter/imageSlice";
import { useAppDispatch } from "@/hooks";
import Image from "next/image";
import React, { useCallback, useState } from "react";

interface Image {
  image_url: string;
  color_dominant: number[];
}

interface CardProps {
  image: Image;
  onClick?: () => void;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({ image, onClick, disabled }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = useCallback(() => {
    onClick && onClick();
    dispatch(chooseImage(image));
  }, [onClick, dispatch, image]);

  return (
    <div className="h-full w-full bg-center bg-cover bg-no-repeat lg:px-8 flex justify-center items-center relative py-8" style={{ backgroundImage: `url(${image?.image_url})` }}>
      <div className="backdrop-blur-md w-full h-full absolute"></div>
      <button
        disabled={disabled || isLoading}
        onClick={handleClick}
        className={`relative h-full z-10 w-[95%] hover:scale-105 duration-200 transition-all bg-contain bg-center bg-no-repeat`}
        style={{
          backgroundColor: `transparent`,
        }}
      >
        {image && (
          <Image
            src={image.image_url}
            fill
            alt="pick"
            placeholder="empty"
            onLoad={() => {
              setIsLoading(false);
            }}
            style={{
              objectFit: "contain",
              opacity: isLoading ? "0" : "1",
            }}
          />
        )}
      </button>
      {isLoading ? <div className="loader z-10"></div> : ""}
    </div>
  );
};

export default Card;
