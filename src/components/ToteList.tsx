import React from "react";
import { Link } from "react-router-dom";
import { Tote } from "../types";
import Image from "./Image";

interface ToteListProps {
  totes: Tote[];
}

const ToteList: React.FC<ToteListProps> = ({ totes }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {totes.map((tote) => (
        <Link
          key={tote.id}
          className='bg-slate-200 dark:bg-slate-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105'
          to={`/tote/${tote.id}`}
        >
          <Image
            imagePath={tote.images[0]}
            alt={tote.name}
            className='w-full h-48 object-cover'
          />
          <div className='p-4'>
            <h3 className='text-lg font-semibold mb-2 text-slate-900 dark:text-white'>
              {tote.name}
            </h3>
            <p className='text-slate-500 dark:text-slate-400 truncate'>
              {tote.contents}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ToteList;
