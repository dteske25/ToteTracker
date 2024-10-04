import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tote } from '../types';

interface ToteListProps {
  totes: Tote[];
}

const ToteList: React.FC<ToteListProps> = ({ totes }) => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/tote/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {totes.map((tote) => (
        <div
          key={tote.id}
          className="bg-slate-200 dark:bg-slate-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={() => handleCardClick(tote.id)}
        >
          <img
            src={tote.imageUrl || `https://source.unsplash.com/featured/?storage,container&sig=${tote.id}`}
            alt={tote.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">{tote.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 truncate">{tote.contents}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToteList;