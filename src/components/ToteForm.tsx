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
      <Link to="/" className="text-primary mb-4 flex items-center">
        <ArrowLeft size={20} className="mr-2" />
        Back to list
      </Link>

      <form
        onSubmit={handleSubmit}
        className="bg-base-200 mt-4 rounded p-4 shadow-lg"
      >
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

        <div className="flex justify-end">
          <button className="btn btn-primary my-4">Create Bin</button>
        </div>
      </form>
    </div>
  );
};

export default ToteForm;
