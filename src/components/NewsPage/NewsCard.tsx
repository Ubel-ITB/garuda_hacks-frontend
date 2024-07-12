import Category from "../universal/Category";

const NewsCard = ({
  imgUrl,
  title,
  authorProfilePicUrl,
  authorName,
  categoryName,
}: {
  imgUrl: string;
  title: string;
  authorProfilePicUrl?: string;
  authorName?: string;
  categoryName?: string;
}) => {
  return (
    <div className="h-full rounded-lg bg-white p-5 duration-150 ease-in hover:scale-105 hover:drop-shadow-2xl">
      <div className="group flex h-full w-full flex-col gap-2">
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={imgUrl}
            alt={title}
            className="absolute inset-0 h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="flex h-[120px] flex-col justify-between">
          <h3>
            <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat text-2xl text-blue-800 transition-[background-size] duration-500 hover:bg-[length:100%_10x] group-hover:bg-[length:100%_10px]">
              {title}
            </span>
          </h3>
          {authorName && categoryName && (
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-center gap-2">
                <img
                  src={authorProfilePicUrl}
                  className="aspect-square h-6 rounded-full"
                />
                {<span className="text-sm text-slate-700">{authorName}</span>}
              </div>
              <Category category={categoryName as string} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
