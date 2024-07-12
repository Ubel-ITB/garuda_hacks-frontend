import NewsPageSection1 from "./NewsPageSection1";
import NewsPageSection2 from "./NewsPageSection2";
import NewsPageSection3 from "./NewsPageSection3";

const NewsPage = () => {
  return (
    <div className="min-h-full w-full grow pb-20">
      <NewsPageSection1 />
      <NewsPageSection2 />
      <NewsPageSection3 />
    </div>
  );
};

export default NewsPage;
