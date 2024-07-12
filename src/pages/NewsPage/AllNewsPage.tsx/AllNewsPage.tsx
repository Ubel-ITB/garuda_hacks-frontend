import { IPost } from "../../../lib/types/Post";
import useFetch from "../../../lib/CustomHooks/useFetch";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import NewsCard from "../../../components/NewsPage/NewsCard";
import { IPostCategory } from "../../../lib/types/PostCategory";
import Category from "../../../components/universal/Category";
import SvgTopRight from "../../HomePage/SvgTopRight";

const AllNewsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const {
    response: posts,
    error,
    loading,
    refetch,
  } = useFetch<IPost[]>({
    url: category ? `/posts/categories/${category}` : "/posts",
  });
  const {
    response: categories,
    error: error2,
    loading: loading2,
  } = useFetch<IPostCategory[]>({
    url: "/posts/categories",
  });

  const handleClickFilter = (categoryId: string) => {
    refetch("/posts/categories/" + categoryId);
    navigate(`/news/all-news?category=${categoryId}`);
  };

  return (
    <div className="relative flex w-full flex-row">
      <SvgTopRight />

      <div className="mx-auto mb-10 mt-[100px] flex w-full max-w-[1200px] flex-col bg-white px-4">
        {loading && <p>Loading...</p>}
        {loading2 && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {error2 && <p>Error: {error2}</p>}
        {posts && categories && (
          <>
            <div className="w-full items-center justify-center">
              <div className="py-12">
                <h1 className="text-center text-5xl font-bold tracking-wide text-blue-700">
                  All News
                </h1>
                <h2 className="py-2 text-center text-slate-700">
                  Find news by filter
                </h2>
              </div>

              <h2>Categories</h2>
              <div className="flex w-full flex-wrap gap-1 py-2">
                {categories.map((el) => (
                  <button
                    onClick={() => handleClickFilter(el._id)}
                    key={el._id}
                  >
                    <Category category={el.name} />
                  </button>
                ))}
              </div>
            </div>
            <div className="grid h-fit w-full grow grid-cols-1 gap-10 p-2 sm:grid-cols-2 lg:grid-cols-3">
              {posts?.map((post) => (
                <NavLink
                  to={"/news/" + post._id}
                  key={post._id}
                  className="h-[360px]"
                >
                  <NewsCard
                    imgUrl={post.imgUrl}
                    title={post.title}
                    authorProfilePicUrl={post.authorProfilePictureUrl as string}
                    categoryName={post.categoryName as string}
                    authorName={post.authorName as string}
                  />
                </NavLink>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllNewsPage;
