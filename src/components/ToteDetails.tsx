import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Tote } from "../types";
import { ArrowLeft, Trash2 } from "lucide-react";
import Image from "./Image";
import { useToteActions } from "../hooks/useTotes";

interface ToteDetailsProps {
  totes: Tote[];
}

const ToteDetails: React.FC<ToteDetailsProps> = ({ totes }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tote = totes.find((t) => t.id === id);
  const { deleteTote } = useToteActions();

  if (!tote) {
    return <div>Tote not found</div>;
  }

  const handleDelete = async () => {
    await deleteTote(tote.id);
    navigate("/");
  };

  return (
    <>
      <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-slate-200 shadow-md dark:bg-slate-800">
        <Image
          imagePath={tote.images?.[0]}
          alt={tote.name}
          className="h-64 w-full object-cover"
        />
        <div className="relative p-6">
          <Link
            to="/"
            className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to list
          </Link>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {tote.name}
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Contents: {tote.contents}
          </p>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            ID: {tote.id}
          </p>
          <button
            onClick={handleDelete}
            className="focus:shadow-outline absolute bottom-6 right-6 flex items-center rounded bg-red-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none"
          >
            <Trash2 size={20} className="mr-2" />
            Delete Tote
          </button>
        </div>
        <div className="columns-3xs gap-2">
          {tote.images?.map((image, i) => (
            <Image
              key={image}
              imagePath={image}
              alt={`${tote}-${i}`}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ToteDetails;
