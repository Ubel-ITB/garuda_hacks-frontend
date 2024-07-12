import { NavLink } from "react-router-dom";
import { IPost } from "../../lib/types/Post";
import Category from "../universal/Category";

const NewsCard = ({ isSmall, post }: { isSmall?: boolean; post?: IPost }) => {
  if (!post) {
    return null;
  }

  return (
    <div className="h-full rounded-lg bg-white p-5 duration-150 ease-in hover:scale-105 hover:drop-shadow-2xl">
      <div className="group flex h-full w-full flex-col gap-2">
        <NavLink
          to={"/news/" + post._id}
          className="relative h-full w-full overflow-hidden"
        >
          {post.imgUrl ? (
            <img
              src={post.imgUrl}
              alt={post.title || "No title"}
              className="absolute inset-0 h-full w-full rounded-lg object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </NavLink>
        <div className="flex h-[120px] flex-col justify-between">
          <NavLink to={"/news/" + post._id}>
            <span
              className={`bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat ${
                isSmall ? "text-lg" : "text-2xl"
              } line-clamp-2 text-blue-800 transition-[background-size] duration-500 hover:bg-[length:100%_10px] group-hover:bg-[length:100%_10px]`}
            >
              {post.title || "No Title"}
            </span>
          </NavLink>
          {(post.authorName || post.categoryName) && (
            <div className="flex flex-row items-center justify-between">
              <NavLink
                to={"/profile/" + post.authorName}
                className="flex flex-row items-center justify-center gap-2"
              >
                {post.authorProfilePicUrl && (
                  <img
                    src={post.authorProfilePicUrl}
                    className="aspect-square h-6 w-auto rounded-full object-cover"
                  />
                )}
                <span className="text-sm text-slate-700">
                  {post.authorName || "Unknown Author"}
                </span>
              </NavLink>
              {post.categoryName && (
                <Category category={post.categoryName as string} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
