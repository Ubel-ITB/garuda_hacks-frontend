import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  className,
  type = "submit",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "reset" | "submit" | "button";
}) => {
  return (
    <button
      type={type}
      className={twMerge(
        `rounded-md bg-[#4a6cf7] px-6 py-2 text-white duration-100 ease-in hover:bg-[#4160dd]`,
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
