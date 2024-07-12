import { useContext, useEffect, useState } from "react";
import useFetch from "../../lib/CustomHooks/useFetch";
import { IPost } from "../../lib/types/Post";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../lib/contexts/CurrentUserContext";
import { CiCirclePlus } from "react-icons/ci";
import NewsCard from "../../components/NewsPage/NewsCard";

const NewsPageSection2 = () => {
  const currentUserContext = useContext(CurrentUserContext);
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
    <div className="mx-auto mb-10 w-full max-w-[1200px] bg-white px-4">
      <div className="">
        <h1 className="mb-5 pl-2 text-3xl text-blue-800">Latest News</h1>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="grid h-fit w-full grid-cols-1 gap-10 p-2 sm:grid-cols-2 lg:grid-cols-3">
        {currentUserContext?.currentUser?.role === "publisher" ? (
          <NavLink to={"/create/news"}>
            <div className="group flex h-full w-full flex-col items-center justify-center rounded-3xl border-[5px] border-dashed duration-150 ease-in hover:border-blue-500">
              <CiCirclePlus className="text-[150px] text-slate-400 duration-150 ease-in group-hover:text-blue-500" />
              <p className="text-slate-400 duration-150 ease-in group-hover:text-blue-500">
                Publish Your Own News
              </p>
            </div>
          </NavLink>
        ) : (
          <div hidden />
        )}
        {posts.map((post) => (
          <NavLink
            to={"/news/" + post._id}
            key={post._id}
            className="h-[400px]"
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
    </div>
  );
};

export default NewsPageSection2;
