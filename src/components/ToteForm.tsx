import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Tote } from '../types';
import { ArrowLeft } from 'lucide-react';

interface ToteFormProps {
  onAdd: (tote: Omit<Tote, 'id' | 'imageUrl' | 'userId'>, image: File | null) => Promise<void>;
}

const ToteForm: React.FC<ToteFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [contents, setContents] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && contents) {
      await onAdd({ name, contents }, image);
      navigate('/');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Link to="/" className="flex items-center text-blue-500 hover:text-blue-700 mb-4">
        <ArrowLeft size={20} className="mr-2" />
        Back to list
      </Link>
      <form onSubmit={handleSubmit} className="bg-slate-200 dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Tote Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contents" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Contents
          </label>
          <input
            type="text"
            id="contents"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Tote Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-accent-color hover:bg-accent-color-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Tote
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToteForm;