import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useEffect, useState } from "react";
import { IPost } from "../../lib/types/Post";
import useFetch from "../../lib/CustomHooks/useFetch";
import Category from "../../components/universal/Category";

const NewsPageSection1 = () => {
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
    <div className="mb-[100px] h-[700px] w-full">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 3000 }} // Change delay to desired speed (2000ms = 2 seconds)
      >
        {posts.map((post) => (
          <SwiperSlide>
            <div
              key={post._id}
              className="group relative flex h-[700px] items-center justify-start overflow-hidden lg:bg-[length:50%_auto] lg:bg-center lg:bg-no-repeat"
              style={{
                backgroundImage: `url(${post.imgUrl})`,
                backgroundSize: "100% auto",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="m-2 flex h-[120px] flex-col justify-between">
                <h3>
                  <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat text-2xl text-white transition-[background-size] duration-500 hover:bg-[length:100%_10px] group-hover:bg-[length:100%_10px]">
                    {post.title}
                  </span>
                </h3>
                <div className="flex flex-col gap-2">
                  <p className="text-slate-100">{post.content}</p>
                  <div className="flex flex-row items-center justify-between gap-2">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <div className="aspect-square h-6 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-slate-100">
                        {post.authorName}
                      </span>
                    </div>
                    <Category category="nice" />
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
