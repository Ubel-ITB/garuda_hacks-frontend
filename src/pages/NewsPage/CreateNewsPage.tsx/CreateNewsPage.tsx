import { useState } from "react";
import CustomAxios from "../../../lib/actions/CustomAxios";
import { INewsForm } from "../../../lib/types/NewsForm";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InputText from "../../../components/universal/InputText";
import InputImage from "../../../components/universal/InputImage";
import useFetch from "../../../lib/CustomHooks/useFetch";
import { IPostCategory } from "../../../lib/types/PostCategory";
import CreatableSelect from "react-select/creatable";
import Button from "../../../components/universal/Button";
import { Editor } from "@tinymce/tinymce-react";
import { TINYMCE_TOKEN } from "../../../lib/constant";

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
  const { response: categories } = useFetch<IPostCategory[]>({
    url: "/posts/categories",
  });

  const fileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content,
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

  // Options for react-select
  const categoryOptions = categories?.map((el) => ({
    value: el.name,
    label: el.name,
  }));

  return (
    <div className="relative flex min-h-screen w-full grow flex-col items-center justify-center py-10">
      <h1 className="text-[50px] font-bold text-blue-700">
        Create Your Own Post
      </h1>

      <div className="relative flex w-[70%] flex-col">
        <form
          className="flex w-full flex-col rounded-lg border-[1px] bg-slate-50 px-4 py-5 shadow-md"
          onSubmit={onSubmit}
        >
          <div>
            <label
              htmlFor="title"
              className="px-2 font-light uppercase tracking-wide text-slate-700"
            >
              Title
            </label>
            <InputText
              name="title"
              placeholder="Title"
              onChange={onChange}
              value={formData.title}
            />
          </div>
          <div className="pt-4">
            <label
              htmlFor="content"
              className="px-2 font-light uppercase tracking-wide text-slate-700"
            >
              Content
            </label>
            <Editor
              apiKey={TINYMCE_TOKEN} // Replace with your TinyMCE API key if you have one
              value={formData.content}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
          <div className="flex flex-col py-4">
            <label
              htmlFor="category"
              className="px-2 font-light uppercase tracking-wide text-slate-700"
            >
              Category
            </label>
            <CreatableSelect
              isClearable
              options={categoryOptions}
              value={categoryOptions?.find(
                (option) => option.value === formData.category,
              )}
              onChange={(selectedOption) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  category: selectedOption?.value as string,
                }))
              }
              placeholder="Select or type to add a new category"
              isSearchable
            />
          </div>
          <div className="flex flex-col py-4">
            <InputImage file={file} onChange={fileOnChange} />
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            <div>
              <Button className="w-full">Publish</Button>
            </div>
            <div>
              <NavLink to="/news">
                <Button className="w-full border-[2px] border-red-700 bg-transparent text-red-700 hover:bg-red-100">
                  Cancel
                </Button>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewsPage;
