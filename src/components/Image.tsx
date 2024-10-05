import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase";
import { FileImage } from "lucide-react";
import { clsx } from "clsx";

interface IImageProps {
  imagePath?: string;
  alt: string;
  className?: string;
}

export default function Image({ imagePath, alt, className }: IImageProps) {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (imagePath) {
        const downloadUrl = await getDownloadURL(ref(storage, imagePath));
        setImage(downloadUrl);
      }
    })();
  }, [imagePath, setImage]);

  if (!imagePath) {
    return <FileImage className={className} />;
  }

  if (!image) {
    <div className={clsx("skeleton", "h-full", "w-full", className)}></div>;
  }

  return <img src={image} alt={alt} className={className} />;
}
