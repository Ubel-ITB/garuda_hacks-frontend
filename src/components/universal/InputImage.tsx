import React, { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import { FaRegImage } from "react-icons/fa";

interface InputImageProps {
  name?: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  file?: File | null;
}

const InputImage: React.FC<InputImageProps> = ({
  name = "file",
  className,
  onChange,
  file,
}) => {
  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        name={name}
        id={name}
        className="hidden"
        onChange={onChange}
        accept="image/*"
      />
      <label
        htmlFor={name}
        className={twMerge(
          "flex h-64 w-full cursor-pointer items-center justify-center border-2 border-dashed border-blue-400 bg-white p-2 text-gray-700 hover:bg-gray-50",
          className,
        )}
      >
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Selected"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <FaRegImage size={50} />
            <span>Choose an image</span>
          </div>
        )}
      </label>
    </div>
  );
};

export default InputImage;