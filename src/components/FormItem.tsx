import { ReactNode } from "react";

interface IFormItemProps {
  labelText?: string;
  labelAltText?: string;
  children: ReactNode;
  helpText?: string;
  required?: boolean;
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
        <span className="label-text">{labelText}</span>
        <span className="label-text-alt">{labelAltText}</span>
      </div>
      {children}
      <div className="label">
        <span className="label-text-alt">{helpText}</span>
      </div>
    </label>
  );
}
