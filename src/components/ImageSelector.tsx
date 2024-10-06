import { Camera } from "lucide-react";
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
  onChange: (files: FileList | null) => void;
}

const ImageSelector = forwardRef<IImageSelectorRef, IImageSelectorProps>(
  function ImageSelectorInternal(
    { onChange, multiple }: IImageSelectorProps,
    ref,
  ) {
    const [cameraMode, setCameraMode] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.files);
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
          className="file-input file-input-bordered w-full max-w-full"
          accept="image/*"
          multiple={multiple}
          capture={cameraMode}
        />
        <button className="btn btn-accent" onClick={handleCameraMode}>
          <Camera />
        </button>
      </>
    );
  },
);

export default ImageSelector;
