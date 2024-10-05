import { ReactNode } from "react";

interface IFormItemProps {
  labelText?: string;
  labelAltText?: string;
  children: ReactNode;
  helpText?: string;
}

export default function FormItem({
  labelText,
  labelAltText,
  children,
  helpText,
}: IFormItemProps) {
  return (
    <label className="form-control w-full max-w-full">
      <div className="label">
        <span className="label-tex text-primaryt">{labelText}</span>
        <span className="label-text-alt text-primary">{labelAltText}</span>
      </div>
      {children}
      <div className="label text-primary">
        <span className="label-text-alt text-primary">{helpText}</span>
      </div>
    </label>
  );
}
