import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

const className = `
  inline-flex
  items-center
  justify-center
  gap-2
  rounded-2xl
  bg-[#0A5A34]
  px-6
  py-3
  text-base
  font-semibold
  text-white
  shadow-md
  transition-all
  duration-300
  hover:-translate-y-0.5
  hover:bg-[#0C6B3F]
  hover:shadow-xl
  active:scale-95
`;

export default function Button({
  href,
  onClick,
  children,
}: Props) {
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}