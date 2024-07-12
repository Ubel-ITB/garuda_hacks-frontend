const FeatureBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[70%] sm:w-[45%] md:w-[30%]">
      <div className="flex aspect-square h-auto w-full items-center justify-center border-2 border-blue-400 p-4 text-center">
        {children}
      </div>
    </div>
  );
};

export default FeatureBox;
