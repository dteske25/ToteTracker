interface ITextInputProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}

export default function TextInput({
  value,
  onChange,
  placeholder,
  required,
}: ITextInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="input input-bordered w-full max-w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  );
}
