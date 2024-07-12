import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { IPost } from "../../lib/types/Post";
import useFetch from "../../lib/CustomHooks/useFetch";
import Category from "../../components/universal/Category";
import { NavLink } from "react-router-dom";

const NewsPageSection1 = () => {
  const {
    response: posts,
    error,
    loading,
  } = useFetch<IPost[]>({
    url: "/posts",
  });
  //const navigate=useNavigate()

  return (
    <div className="my-[100px] mt-[0px] h-fit w-full">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 3000 }} // Change delay to desired speed (2000ms = 2 seconds)
      >
        {posts?.map((post) => (
          <SwiperSlide key={post?._id}>
            <div className="relative flex h-[600px] w-full items-center justify-start overflow-hidden rounded-2xl">
              <div className="absolute z-[1] h-full w-full bg-gradient-to-r from-white via-white via-0% to-transparent"></div>
              <div className="absolute bottom-0 z-[1] h-[100px] w-full bg-gradient-to-t from-white via-white via-0% to-transparent"></div>
              <div className="absolute top-0 z-[1] h-[100px] w-full bg-gradient-to-b from-white via-white/80 via-80% to-transparent"></div>
              <img
                className="absolute right-0 h-full w-full object-cover"
                src={post?.imgUrl}
                alt={post?.title}
              />
              <div className="group z-10 mx-[30px] flex h-full flex-col justify-center">
                <h3>
                  <NavLink
                    to={"/news/" + post?._id}
                    className="line-clamp-2 bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_30px] bg-left-bottom bg-no-repeat text-[70px] font-bold text-blue-800 transition-[background-size] duration-500 group-hover:bg-[length:100%_30px]"
                  >
                    {post?.title}
                  </NavLink>
                </h3>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-between gap-2">
                    <NavLink
                      to={"/profile/" + post.authorName}
                      className="flex flex-row items-center justify-center gap-2"
                    >
                      <img
                        src={post?.authorProfilePicUrl}
                        className="aspect-square h-6 rounded-full"
                      />
                      <span className="text-sm text-slate-700">
                        {post?.authorName}
                      </span>
                    </NavLink>
                    <Category category={post?.categoryName as string} />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsPageSection1;
