import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Tote } from '../types';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface ToteDetailsProps {
  totes: Tote[];
  onDelete: (id: string) => Promise<void>;
}

const ToteDetails: React.FC<ToteDetailsProps> = ({ totes, onDelete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tote = totes.find(t => t.id === id);

  if (!tote) {
    return <div>Tote not found</div>;
  }

  const handleDelete = async () => {
    await onDelete(tote.id);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-200 dark:bg-slate-800 shadow-md rounded-lg overflow-hidden">
      <img
        src={tote.imageUrl || `https://source.unsplash.com/featured/?storage,container&sig=${tote.id}`}
        alt={tote.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6 relative">
        <Link to="/" className="flex items-center text-blue-500 hover:text-blue-700 mb-4">
          <ArrowLeft size={20} className="mr-2" />
          Back to list
        </Link>
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{tote.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Contents: {tote.contents}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">ID: {tote.id}</p>
        <button
          onClick={handleDelete}
          className="absolute bottom-6 right-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center transition-colors duration-200"
        >
          <Trash2 size={20} className="mr-2" />
          Delete Tote
        </button>
      </div>
    </div>
  );
};

export default ToteDetails;