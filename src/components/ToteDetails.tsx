import React, { useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CornerLeftUp,
  CornerRightUp,
  Pencil,
  Save,
  Trash2,
} from "lucide-react";
import Image from "./Image";
import { useTote, useToteActions } from "../hooks/useTotes";
import FormItem from "./FormItem";
import TextInput from "./TextInput";
import ImageSelector from "./ImageSelector";
import { IImageSelectorRef } from "../types";

interface ToteDetailsProps {}

interface IDeleteButtonProps {
  label?: string;
  onClick: () => void;
}
function DeleteButton({ onClick, label }: IDeleteButtonProps) {
  const handleClick = () => {
    const result = confirm("Are you sure you want to delete this?");
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
  const imageInputRef = useRef<IImageSelectorRef>(null);
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
  const [isUploadingImages, setUploadingImages] = useState(false);

  const handleDeleteTote = async () => {
    if (!tote) return;
    await deleteTote(tote.id);
    navigate("/");
  };

  const handleDeleteImage = async (imagePath: string) => {
    if (!tote) return;
    await removeImageFromTote(tote?.id, imagePath);
  };

  const handleUploadMoreImages = async (files: FileList | null) => {
    if (!files || !tote) return;
    setUploadingImages(true);
    try {
      for (const image of files) {
        await addImageToTote(tote.id, image);
      }
      if (imageInputRef.current) {
        imageInputRef.current.clearImageFileInput();
      }
    } finally {
      setUploadingImages(false);
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
    updateToteInfo(tote.id, nameInput, contentsInput);
    setEditMode(false);
  };

  const handleMakeCoverPhoto = async (imagePath: string) => {
    if (!tote) return;
    await setAsCoverImage(tote?.id, imagePath);
  };

  if (!tote) {
    return <div>Tote not found</div>;
  }

  const imageUploader = (
    <>
      <div className="divider"></div>
      <div className="flex justify-center gap-4">
        <ImageSelector
          ref={imageInputRef}
          onChange={handleUploadMoreImages}
          isLoading={isUploadingImages}
          multiple
        />
      </div>
      {(tote.images?.length ?? 0) === 0 && (
        <div className="mt-4 flex items-center justify-center">
          <CornerLeftUp />
          <p className="mx-2 text-3xl">Add photos to get started!</p>
          <CornerRightUp />
        </div>
      )}
    </>
  );

  if (editMode) {
    return (
      <div className="m-4">
        <div className="mx-auto mt-4 max-w-6xl">
          <div className="flex justify-end gap-4">
            <DeleteButton onClick={handleDeleteTote} label="Delete Tote" />
            <button className="btn btn-primary" onClick={handleUpdateToteInfo}>
              <Save />
              Save
            </button>
          </div>
          <FormItem labelText="Name">
            <TextInput value={nameInput} onChange={setNameInput} />
          </FormItem>
          <FormItem labelText="Description">
            <TextInput value={contentsInput} onChange={setContentsInput} />
          </FormItem>
          {imageUploader}
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
        className="h-32 w-full object-cover md:h-64"
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
                  <div className="my-2 text-5xl">{tote.name}</div>
                  <div className="my-2 text-3xl font-light">
                    {tote.contents}
                  </div>
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
            {imageUploader}
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
