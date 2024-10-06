import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useToteActions } from "../hooks/useTotes";
import FormItem from "./FormItem";
import TextInput from "./TextInput";

interface ToteFormProps {}

const ToteForm: React.FC<ToteFormProps> = () => {
  const [name, setName] = useState("");
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const { addTote } = useToteActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      const id = await addTote({ name, contents }, null);
      navigate(`/tote/${id}`);
    }
  };

  return (
    <div className="m-4">
      <div className="mx-auto mt-4 max-w-6xl">
        <Link
          to="/"
          className="link-hover link link-primary mb-4 flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to list
        </Link>
        <FormItem labelText="Name">
          <TextInput value={name} onChange={setName} required />
        </FormItem>
        <FormItem labelText="Description">
          <TextInput value={contents} onChange={setContents} />
        </FormItem>
        <div className="flex justify-center">
          <button className="btn btn-primary btn-wide" onClick={handleSubmit}>
            <Save />
            Create Tote
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToteForm;
