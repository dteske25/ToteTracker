import React from "react";
import { Link } from "react-router-dom";
import { Tote } from "../types";
import Image from "./Image";
import { FileImage, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface ToteListProps {
  totes: Tote[];
}

const ToteList: React.FC<ToteListProps> = ({ totes }) => {
  const { user } = useAuth();
  if (totes.length === 0) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to ToteTracker!</h1>
            <p className="py-6">Get started by adding your first tote!</p>
            {user ? (
              <Link to="/add" className="btn btn-primary btn-wide">
                <Plus className="mr-2 h-5 w-5" />
                Add New Tote
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
    <div className="mx-4">
      <div className="mx-auto mt-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {totes.map((tote) => (
            <Link
              key={tote.id}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
              to={`/tote/${tote.id}`}
            >
              <div key={tote.id} className="card h-64 bg-base-300 shadow-xl">
                <figure className="h-full">
                  {tote.coverImage ? (
                    <Image imagePath={tote.coverImage} alt={tote.name} />
                  ) : (
                    <FileImage width={100} height={100} />
                  )}
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{tote.name}</h2>
                  <p>{tote.contents}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToteList;
