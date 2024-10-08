export interface Tote {
  id: string;
  name: string;
  contents: string;
  images?: string[];
  coverImage?: string;
  userId: string;
}

export interface IImageSelectorRef {
  clearImageFileInput: () => void;
}
