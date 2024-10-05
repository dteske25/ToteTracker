import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase";
import { FileImage } from "lucide-react";

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

  if (!image) {
    return <FileImage className={className} />;
  }

  return <img src={image} alt={alt} className={className} />;
}
