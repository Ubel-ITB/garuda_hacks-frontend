import { useEffect, useState } from "react";
import useFetch from "../../lib/CustomHooks/useFetch";
import { IPost } from "../../lib/types/Post";
import { NavLink } from "react-router-dom";
import NewsCard from "../../components/NewsPage/NewsCard";
import { IPostCategory } from "../../lib/types/PostCategory";

const NewsPageSection3 = () => {
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [filteredPosts2, setFilteredPosts2] = useState<IPost[]>([]);
  const {
    response: posts,
    error: postsError,
    loading: postsLoading,
  } = useFetch<IPost[]>({
    url: "/posts",
  });
  const {
    response: postCategories,
    error: categoriesError,
    loading: categoriesLoading,
  } = useFetch<IPostCategory[]>({
    url: "/posts/categories",
  });

  useEffect(() => {
    if (
      (postCategories?.length as number) > 0 &&
      (posts?.length as number) > 0
    ) {
      const categoryId = postCategories?.[0]?._id;
      const filtered = posts?.filter((post) => post.CategoryId === categoryId);
      setFilteredPosts(filtered || []);
    }
    if (
      (postCategories?.length as number) > 1 &&
      (posts?.length as number) > 1
    ) {
      const categoryId = postCategories?.[1]?._id;
      const filtered = posts?.filter((post) => post.CategoryId === categoryId);
      setFilteredPosts2(filtered || []);
    }
  }, [postCategories, posts]);

  return (
    <div className="mx-auto h-fit w-full max-w-[1200px] bg-white px-4">
      <div className="">
        <h4 className="mb-5 pl-2 text-3xl text-blue-800">By Category</h4>
      </div>
      {(postsLoading || categoriesLoading) && <p>Loading...</p>}
      {postsError && <p>Error fetching posts: {postsError}</p>}
      {categoriesError && <p>Error fetching categories: {categoriesError}</p>}
      {(postCategories?.length as number) > 0 && (
        <div className="mb-12">
          <h4 className="pl-2 text-xl text-blue-800">
            {filteredPosts[0]?.categoryName}
          </h4>
          <div className="grid h-fit w-full grid-cols-1 gap-10 p-2 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPosts.map((post) => (
              <NavLink
                to={"/news/" + post._id}
                key={post._id}
                className="h-[340px]"
              >
                <NewsCard
                  imgUrl={post.imgUrl}
                  title={post.title}
                  categoryName={post.categoryName as string}
                  isSmall
                />
              </NavLink>
            ))}
          </div>
          <NavLink
            to={"/news/all-news"}
            className="text-blue-300 duration-150 ease-in hover:text-blue-500"
          >
            View More -{">"}
          </NavLink>
        </div>
      )}
      {(postCategories?.length as number) > 1 && (
        <>
          <h4 className="pl-2 text-xl text-blue-800">
            {filteredPosts2[0]?.categoryName}
          </h4>
          <div className="grid h-fit w-full grid-cols-1 gap-10 p-2 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPosts2.map((post) => (
              <NavLink
                to={"/news/" + post._id}
                key={post._id}
                className="h-[340px]"
              >
                <NewsCard
                  imgUrl={post.imgUrl}
                  title={post.title}
                  categoryName={post.categoryName as string}
                  isSmall
                />
              </NavLink>
            ))}
          </div>
          <NavLink
            to={"/news/all-news"}
            className="text-blue-300 duration-150 ease-in hover:text-blue-500"
          >
            View More -{">"}
          </NavLink>
        </>
      )}
    </div>
  );
};

export default NewsPageSection3;
