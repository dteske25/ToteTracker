import React, { useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Save, Trash2, UploadCloud } from "lucide-react";
import Image from "./Image";
import { useTote, useToteActions } from "../hooks/useTotes";
import FormItem from "./FormItem";
import TextInput from "./TextInput";

interface ToteDetailsProps {}

interface IDeleteButtonProps {
  label?: string;
  onClick: () => void;
}
function DeleteButton({ onClick, label }: IDeleteButtonProps) {
  const handleClick = () => {
    const result = confirm("Are you sure?");
    console.log(result);
    if (result) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-error">
      <Trash2 />
      <span className="hidden md:block">{label ?? "Delete"}</span>
    </button>
  );
}

const ToteDetails: React.FC<ToteDetailsProps> = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tote } = useTote(id);
  const {
    deleteTote,
    addImageToTote,
    updateToteInfo,
    removeImageFromTote,
    setAsCoverImage,
  } = useToteActions();
  const [editMode, setEditMode] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [contentsInput, setContentsInput] = useState("");
  const [imageInput, setImageInput] = useState<FileList | null>();

  const handleDeleteTote = async () => {
    if (!tote) return;
    await deleteTote(tote.id);
    navigate("/");
  };

  const handleDeleteImage = async (imagePath: string) => {
    if (!tote) return;
    await removeImageFromTote(tote?.id, imagePath);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageInput(e.target.files);
  };

  const handleUploadMoreImages = async () => {
    if (!imageInput || !tote) return;
    for (const image of imageInput) {
      await addImageToTote(tote.id, image);
    }
    setImageInput(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleEnterEditMode = () => {
    if (!tote) return;
    setNameInput(tote.name);
    setContentsInput(tote.contents);
    setEditMode(true);
  };

  const handleUpdateToteInfo = async () => {
    if (!tote) return;
    updateToteInfo({ ...tote, name: nameInput, contents: contentsInput });
    setEditMode(false);
  };

  const handleMakeCoverPhoto = async (imagePath: string) => {
    if (!tote) return;
    await setAsCoverImage(tote?.id, imagePath);
  };

  if (!tote) {
    return <div>Tote not found</div>;
  }

  const columns = 2;
  const chunkedImages: string[][] = [];
  for (let i = 0; i < columns; i++) {
    chunkedImages.push([]);
  }

  const toteImages = tote.images ?? [];
  for (let i = 0; i < toteImages.length; i++) {
    chunkedImages[i % columns].push(toteImages[i]);
  }

  if (editMode) {
    return (
      <div className="m-4">
        <div className="mx-auto mt-4 max-w-6xl">
          <div className="flex justify-end gap-4">
            <DeleteButton onClick={handleDeleteTote} label="Delete Bin" />
            <button className="btn btn-primary" onClick={handleUpdateToteInfo}>
              <Save />
              Save
            </button>
          </div>
          <FormItem labelText="Name">
            <TextInput value={nameInput} onChange={setNameInput} />
          </FormItem>
          <FormItem labelText="Contents">
            <TextInput value={contentsInput} onChange={setContentsInput} />
          </FormItem>
          <FormItem labelText="Add Images">
            <div className="flex gap-4">
              <input
                ref={imageInputRef}
                type="file"
                id="image"
                onChange={handleFileInputChange}
                className="file-input file-input-bordered w-full max-w-full"
                accept="image/*"
                multiple
              />
              <button
                className="btn btn-primary"
                onClick={handleUploadMoreImages}
                disabled={!imageInput}
              >
                <UploadCloud />
                Upload
              </button>
            </div>
          </FormItem>
          <div className="mx-auto mt-8">
            <div className="columns-1 gap-4 md:columns-2">
              {tote.images?.map((image, i) => (
                <div key={i} className="relative pt-4">
                  <Image
                    imagePath={image}
                    alt={`additional-image-${i}`}
                    className="max-w-full rounded-lg"
                  />
                  <div className="absolute left-4 top-8">
                    <DeleteButton
                      onClick={() => {
                        handleDeleteImage(image);
                      }}
                    />
                  </div>
                  <div className="absolute right-4 top-8">
                    {tote.coverImage !== image && (
                      <button
                        className="btn btn-accent"
                        onClick={() => handleMakeCoverPhoto(image)}
                      >
                        Make Cover Photo
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Image
        imagePath={tote.coverImage}
        alt={tote.name}
        className="h-64 w-full object-cover"
      />
      <div className="m-4">
        <div className="mx-auto mt-4 max-w-6xl">
          <Link
            to="/"
            className="link-hover link link-primary mb-4 flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to list
          </Link>

          <div className="">
            <div className="">
              <div className="flex justify-between">
                <div>
                  <div className="my-2 text-3xl font-bold">{tote.name}</div>
                  <div className="my-2">{tote.contents}</div>
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    className="btn btn-ghost"
                    onClick={handleEnterEditMode}
                  >
                    <Pencil />
                  </button>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-8">
              <div className="columns-1 gap-4 md:columns-2">
                {tote.images?.map((image, i) => (
                  <div key={i} className="relative pt-4">
                    <Image
                      imagePath={image}
                      alt={`additional-image-${i}`}
                      className="max-w-full rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToteDetails;
