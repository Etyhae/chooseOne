import { chooseImage } from "@/counter/imageSlice";
import { useAppDispatch } from "@/hooks";
import React, { useCallback } from "react";

interface Image {
  image_url?: string;
  color_dominant: number[];
}

interface CardProps {
  image: Image;
  onClick: () => void;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({ image, onClick, disabled }) => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    onClick();
    dispatch(chooseImage(image));
  }, [onClick, dispatch, image]);

  return (
    <div className="h-full w-full bg-center bg-cover bg-no-repeat lg:px-8 flex justify-center items-center relative py-8" style={{ backgroundImage: `url(${image?.image_url})` }}>
      <div className="backdrop-blur-md w-full h-full absolute"></div>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={`h-full z-10 w-[36rem] hover:scale-105 duration-200 transition-all bg-contain bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url(${image?.image_url})`,
          backgroundColor: `transparent`,
        }}
      ></button>
    </div>
  );
};

export default Card;
