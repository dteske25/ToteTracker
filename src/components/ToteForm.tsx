import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToteActions } from "../hooks/useTotes";
import FormItem from "./FormItem";
import TextInput from "./TextInput";

interface ToteFormProps {}

const ToteForm: React.FC<ToteFormProps> = () => {
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const { addTote } = useToteActions();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (name) {
        const id = await addTote({ name, contents }, image);
        navigate(`/tote/${id}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="m-4">
      <div className="mx-auto max-w-md">
        <Link
          to="/"
          className="link-hover link link-primary mb-4 flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to list
        </Link>

        <form
          onSubmit={handleSubmit}
          className="card mt-4 w-96 rounded bg-base-200 shadow-xl"
        >
          <div className="card-body">
            <div className="card-title">Create Bin</div>
            <FormItem labelText="Bin Name">
              <TextInput value={name} onChange={setName} required />
            </FormItem>
            <FormItem labelText="Contents">
              <TextInput value={contents} onChange={setContents} />
            </FormItem>
            <FormItem labelText="Cover Image">
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full max-w-full"
                accept="image/*"
              />
            </FormItem>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" disabled={isLoading}>
                {isLoading && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
                Create Bin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ToteForm;
