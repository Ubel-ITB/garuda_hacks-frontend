import { useState } from "react";
import CustomAxios from "../../../lib/actions/CustomAxios";
import { INewsForm } from "../../../lib/types/NewsForm";
import TextAreaInput from "../../../components/universal/TextAreaInput";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateNewsPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<INewsForm>({
    title: "",
    content: "",
    category: "",
    _id: "",
    imgUrl: "",
  });
  const navigate = useNavigate();

  const fileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    console.log({ name, value });
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!file) {
        throw new Error("No file selected");
      }
      const fd = new FormData();
      fd.append("file", file);
      const imgResponse = await CustomAxios(
        "post",
        "/uploads/posts/coverImage",
        fd,
      );
      console.log(imgResponse);
      const imgUrl = imgResponse.data.url;

      const postData = {
        ...formData,
        imgUrl,
      };

      const postResponse = await CustomAxios("post", "/posts", postData);

      if (postResponse) {
        Swal.fire({
          title: "Published successfully",
          icon: "success",
        });
        navigate("/news");
      }
      console.log("Post created successfully", postResponse.data);
    } catch (error) {
      console.error("Error uploading file or creating post:", error);
    }
  };
  return (
    <div className="relative flex min-h-screen w-full grow items-center justify-center">
      <h1 className="absolute top-10 text-[50px] text-blue-700">
        Create Your Own Post
      </h1>

      <div className="relative flex w-[70%] flex-col">
        <div className="absolute left-0 top-0 -z-[1] h-full w-full rotate-[2deg] rounded-lg bg-slate-200"></div>
        <div className="absolute left-0 top-0 -z-[2] h-full w-full rotate-[4deg] rounded-lg bg-slate-300"></div>
        <form
          className="flex w-full flex-col rounded-lg bg-slate-100 p-2 py-5"
          onSubmit={onSubmit}
        >
          <div>
            <h2 className="text-[30px]">Title</h2>
            <TextAreaInput
              name="title"
              placeholder="Title"
              rows={1}
              onChange={onChange}
              value={formData.title}
            />
          </div>
          <TextAreaInput
            name="content"
            placeholder="content"
            rows={10}
            value={formData.content}
            onChange={onChange}
          />
          <TextAreaInput
            name="category"
            placeholder="category"
            value={formData.category}
            onChange={onChange}
            rows={1}
          />
          <input name="file" id="file" type="file" onChange={fileOnChange} />
          <div className="flex w-full flex-row items-center justify-center gap-10">
            <button
              type="submit"
              className="w-fit rounded-full border-[2px] border-blue-300 p-2 px-5 text-blue-300 duration-100 ease-in hover:border-blue-500 hover:text-blue-500"
            >
              Publish
            </button>
            <button
              className="w-fit rounded-full border-[2px] border-red-300 p-2 px-5 text-red-300 duration-100 ease-in hover:border-red-500 hover:text-red-500"
              onClick={() => {
                navigate("/news");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewsPage;
