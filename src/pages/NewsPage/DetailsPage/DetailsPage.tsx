import { useParams } from "react-router-dom";
import useFetch from "../../../lib/CustomHooks/useFetch";
import { IPost } from "../../../lib/types/Post";
import { FaFacebook, FaTwitter } from "react-icons/fa";

const DetailsPage = () => {
  const { postId } = useParams();

  const {
    response: post,
    error,
    loading,
  } = useFetch<IPost>({
    url: "/posts/" + postId,
  });

  // Function to handle sharing on Facebook
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      "_blank",
    );
  };

  // Function to handle sharing on Twitter
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${window.location.href}`,
      "_blank",
    );
  };

  return (
    <div className="flex w-full items-center justify-center pb-20 pt-24">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {post && (
        <div className="flex w-full max-w-[900px] flex-col gap-4 px-4">
          <h1 className="text-[50px] font-bold text-blue-800">{post.title}</h1>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <img
                src={post.authorProfilePicUrl}
                className="aspect-square h-[40px] rounded-full"
                alt="Author"
              />
              <span className="text-sm text-slate-700">{post.authorName}</span>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              {/* Share buttons */}
              <button onClick={shareOnFacebook} className="hover:text-blue-700">
                <FaFacebook size={30} />
              </button>
              <button onClick={shareOnTwitter} className="hover:text-blue-300">
                <FaTwitter size={30} />
              </button>
            </div>
          </div>
          <div className="h-[0.5px] w-full scale-105 bg-black"></div>
          <img
            className="h-auto max-h-[600px] w-full object-contain"
            src={post.imgUrl}
            alt={post.title}
          />

          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-black"
          ></div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
