import NewsPageSection1 from "./NewsPageSection1";
import NewsPageSection2 from "./NewsPageSection2";

const NewsPage = () => {
  return (
    <div className="min-h-full w-full grow bg-red-400">
      <NewsPageSection1 />
      <NewsPageSection2 />
    </div>
  );
};

export default NewsPage;
