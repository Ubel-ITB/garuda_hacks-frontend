import FeatureBox from "../../components/HomePage/FeatureBox";

const FeaturesSection = () => {
  return (
    <section className="mx-auto flex h-fit w-full max-w-[900px] flex-col items-center justify-center px-4 py-20">
      <h2 className="text-3xl font-bold tracking-wide text-blue-700">
        Main Features
      </h2>
      <div className="flex w-full flex-wrap justify-center gap-4 py-6">
        <FeatureBox>Report Location</FeatureBox>
        <FeatureBox>Know Progress on Location</FeatureBox>
        <FeatureBox>Share problems in social media</FeatureBox>
        <FeatureBox>Check news based on category</FeatureBox>
        <FeatureBox>News coming only from your area</FeatureBox>
      </div>
    </section>
  );
};

export default FeaturesSection;
