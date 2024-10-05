export default function Avatar(props: {
  name?: string;
  image?: string;
  className?: string;
}) {
  const { name, image } = props;

  let content;
  if (image) {
    content = <img src={image} alt={name} />;
  } else {
    const initials = (name ?? "")
      .split(" ")
      .map((s) => s.slice(0, 1).toUpperCase())
      .join("");
    content = <span className="text-xs">{initials}</span>;
  }

  return (
    <div className="avatar">
      <div className="w-12 rounded-full">{content}</div>
    </div>
  );
}
