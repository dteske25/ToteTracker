import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToteActions } from "../hooks/useTotes";

interface ToteFormProps {}

const ToteForm: React.FC<ToteFormProps> = () => {
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const { addTote } = useToteActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && contents) {
      await addTote({ name, contents }, images);
      navigate("/");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <Link
        to="/"
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to list
      </Link>
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-slate-200 px-8 pb-8 pt-6 shadow-md dark:bg-slate-800"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300"
          >
            Bin Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border bg-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="contents"
            className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300"
          >
            Contents
          </label>
          <input
            type="text"
            id="contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border bg-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300"
          >
            Images
          </label>
          <input
            type="file"
            id="image"
            multiple
            onChange={handleImageChange}
            className="focus:shadow-outline w-full appearance-none rounded border bg-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:bg-gray-700 dark:text-gray-300"
            accept="image/*"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-accent-color px-4 py-2 font-bold text-white hover:bg-accent-color-dark focus:outline-none"
          >
            Create Bin
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToteForm;
