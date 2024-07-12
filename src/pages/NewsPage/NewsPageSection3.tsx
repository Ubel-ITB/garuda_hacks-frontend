import { useEffect, useState } from "react";
import useFetch from "../../lib/CustomHooks/useFetch";
import { IPost } from "../../lib/types/Post";
import { NavLink } from "react-router-dom";
import NewsCard from "../../components/NewsPage/NewsCard";

const NewsPageSection3 = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { response, error, loading } = useFetch<IPost[]>({
    url: "/posts",
  });

  useEffect(() => {
    if (response) {
      setPosts(response);
    }
  }, [response]);

  return (
    <div className="mx-auto h-fit w-full max-w-[1200px] bg-white px-4">
      <div className="">
        <h4 className="mb-5 pl-2 text-3xl text-blue-800">Sort By Category</h4>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="grid h-fit w-full grid-cols-1 gap-10 p-2 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <NavLink
            to={"/news/" + post._id}
            key={post._id}
            className="h-[300px]"
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
      <NavLink
        to={"/news/all-news"}
        className="text-blue-300 duration-150 ease-in hover:text-blue-500"
      >
        View More -{">"}
      </NavLink>
    </div>
  );
};

export default NewsPageSection3;
