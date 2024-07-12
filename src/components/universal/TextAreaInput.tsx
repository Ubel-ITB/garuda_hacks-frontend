import React from "react";

const TextAreaInput = ({
  label,
  placeholder = "Enter your text here...",
  name,
  rows = 5,
  cols = 40,
  value,
  onChange,
}: {
  label?: string;
  placeholder?: string;
  name: string;
  rows?: number;
  cols?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-2 block text-sm font-bold text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className="focus:shadow-outline w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
        name={name}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
