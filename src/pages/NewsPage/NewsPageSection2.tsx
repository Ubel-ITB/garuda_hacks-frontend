import { useContext, useEffect, useState } from "react";
import useFetch from "../../lib/CustomHooks/useFetch";
import { IPost } from "../../lib/types/Post";
import Category from "../../components/universal/Category";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../lib/contexts/CurrentUserContext";
import { CiCirclePlus } from "react-icons/ci";

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
    <div className="bg-white">
      <div>
        <h1 className="pl-2 text-3xl">Latest News</h1>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="grid h-fit w-full grid-cols-3 gap-10 p-2 px-[120px]">
        {currentUserContext?.currentUser?.role !== "citizen" ? (
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
          <div className="rounded-lg bg-white p-5 duration-150 ease-in hover:drop-shadow-2xl">
            <div key={post._id} className="group flex w-full flex-col gap-2">
              <div className="relative h-[300px] w-full overflow-hidden duration-150 ease-in group-hover:scale-105">
                <img
                  src={post.imgUrl}
                  alt={post.title}
                  className="absolute inset-0 h-full w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex h-[120px] flex-col justify-between">
                <h3>
                  <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat text-2xl transition-[background-size] duration-500 hover:bg-[length:100%_10x] group-hover:bg-[length:100%_10px]">
                    {post.title}
                  </span>
                </h3>
                <div className="flex flex-col gap-2">
                  <p className="text-slate-600">{post.content}</p>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <div className="aspect-square h-6 rounded-full bg-blue-500"></div>
                      <span className="text-sm">{post.authorName}</span>
                    </div>
                    <Category category="nice" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPageSection2;
