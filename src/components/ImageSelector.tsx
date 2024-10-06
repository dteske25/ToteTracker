import { Camera, Images } from "lucide-react";
import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { IImageSelectorRef } from "../types";

interface IImageSelectorProps {
  multiple?: boolean;
  onChange: (files: FileList | null) => Promise<void>;
  isLoading?: boolean;
}

const ImageSelector = forwardRef<IImageSelectorRef, IImageSelectorProps>(
  function ImageSelectorInternal(
    { onChange, multiple, isLoading }: IImageSelectorProps,
    ref,
  ) {
    const [cameraMode, setCameraMode] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      await onChange(e.target.files);
      setCameraMode(false);
    };

    const handleUploadMode = () => {
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      // and then click it to trigger the phone camera
      imageInputRef.current?.click();
    };

    const handleCameraMode = () => {
      setCameraMode(true);
    };

    useEffect(() => {
      if (cameraMode) {
        // if we're switching to camera mode, clear the current file input
        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
        // and then click it to trigger the phone camera
        imageInputRef.current?.click();
      }
    }, [cameraMode]);

    useImperativeHandle(ref, () => {
      return {
        clearImageFileInput: () => {
          if (imageInputRef.current) {
            imageInputRef.current.value = "";
          }
        },
      };
    }, []);

    return (
      <>
        <input
          ref={imageInputRef}
          type="file"
          id="image"
          onChange={(e) => handleChange(e)}
          className="file-input file-input-bordered hidden w-full max-w-full"
          accept="image/*"
          multiple={multiple}
          capture={cameraMode}
        />
        <button
          className="btn btn-primary md:btn-wide"
          onClick={handleUploadMode}
          disabled={isLoading}
        >
          {isLoading && !cameraMode ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <Images />
          )}
          Choose from gallery
        </button>
        <button
          className="btn btn-accent md:btn-wide"
          onClick={handleCameraMode}
          disabled={isLoading}
        >
          {isLoading && cameraMode ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <Camera />
          )}
          Take new photo
        </button>
      </>
    );
  },
);

export default ImageSelector;
