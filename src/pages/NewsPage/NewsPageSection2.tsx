import { useEffect, useState } from "react";
import useFetch from "../../lib/CustomHooks/useFetch";
import { IPost } from "../../lib/types/Post";
import Category from "../../components/universal/Category";
import CustomAxios from "../../lib/actions/CustomAxios";
import { IForm } from "../../lib/types/FormData";

const NewsPageSection2 = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { response, error, loading, refetch } = useFetch<IPost[]>({
    url: "/posts",
  });
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<IForm>({
    title: "",
    content: "",
    category: "",
    _id: "",
    AuthorId: "",
    imgUrl: "",
  });

  const fileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log("in progress");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    if (response) {
      setPosts(response);
    }
  }, [response]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="grid h-fit w-full grid-cols-3 gap-10 bg-white p-2 px-[150px]">
        <form
          className="w-full rounded-lg border border-slate-400 p-2"
          onSubmit={onSubmit}
        >
          <input
            placeholder="title"
            name="title"
            value={formData.title}
            onChange={onChange}
          />
          <input
            placeholder="content"
            name="content"
            value={formData.content}
            onChange={onChange}
          />
          <input
            placeholder="category"
            name="category"
            value={formData.category}
            onChange={onChange}
          />
          <input name="file" id="file" type="file" onChange={fileOnChange} />
          <button type="submit">Upload</button>
        </form>
        {posts.map((post) => (
          <div key={post._id} className="group flex w-full flex-col">
            <div className="h-[200px] w-full bg-red-200"></div>
            <div>
              <img
                src={`http://localhost:4000/uploads/posts2/${post.imgUrl}`}
                alt={post.title}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3>
                <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-[length:0px_10px] bg-left-bottom bg-no-repeat text-2xl transition-[background-size] duration-500 hover:bg-[length:100%_10x] group-hover:bg-[length:100%_10px]">
                  {post.title}
                </span>
              </h3>
              <p className="text-slate-600">{post.content}</p>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2">
                  <div className="aspect-square h-6 rounded-full bg-blue-500"></div>
                  <span className="text-sm">{post.AuthorId}</span>
                </div>
                <Category category="nice" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPageSection2;
