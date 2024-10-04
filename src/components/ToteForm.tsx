import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTotes } from "../hooks/useTotes";

interface ToteFormProps {}

const ToteForm: React.FC<ToteFormProps> = () => {
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const { addTote } = useTotes();

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
    <div className='max-w-md mx-auto'>
      <Link
        to='/'
        className='flex items-center text-blue-500 hover:text-blue-700 mb-4'
      >
        <ArrowLeft size={20} className='mr-2' />
        Back to list
      </Link>
      <form
        onSubmit={handleSubmit}
        className='bg-slate-200 dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'
          >
            Bin Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='contents'
            className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'
          >
            Contents
          </label>
          <input
            type='text'
            id='contents'
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='image'
            className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'
          >
            Images
          </label>
          <input
            type='file'
            id='image'
            multiple
            onChange={handleImageChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            accept='image/*'
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-accent-color hover:bg-accent-color-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Create Bin
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToteForm;
