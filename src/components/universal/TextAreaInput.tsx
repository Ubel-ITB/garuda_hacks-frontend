import React, { useState } from "react";

interface TextAreaInputProps {
  label?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  onChange?: (value: string) => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  placeholder = "Enter your text here...",
  rows = 5,
  cols = 40,
  onChange,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="mb-2 block text-sm font-bold text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className="focus:shadow-outline w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextAreaInput;
