import React from "react";
import { Link } from "react-router-dom";
import { Tote } from "../types";
import Image from "./Image";
import { Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface ToteListProps {
  totes: Tote[];
}

const ToteList: React.FC<ToteListProps> = ({ totes }) => {
  const { user } = useAuth();
  if (totes.length === 0) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to Binventory!</h1>
            <p className="py-6">Get started by adding your first tote!</p>
            {user ? (
              <Link to="/add" className="btn btn-wide btn-primary">
                <Plus className="mr-2 h-5 w-5" />
                Add New Bin
              </Link>
            ) : (
              "Sign in to get started!"
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {totes.map((tote) => (
        <Link
          key={tote.id}
          className="cursor-pointer overflow-hidden rounded-lg bg-slate-200 shadow-md transition-transform duration-200 hover:scale-105 dark:bg-slate-800"
          to={`/tote/${tote.id}`}
        >
          <Image
            imagePath={tote.images?.[0]}
            alt={tote.name}
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
              {tote.name}
            </h3>
            <p className="truncate text-slate-500 dark:text-slate-400">
              {tote.contents}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ToteList;
