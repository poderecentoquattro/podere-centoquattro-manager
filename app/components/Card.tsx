type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: Props) {
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-md
        transition-all
        duration-300
        hover:shadow-xl
      "
    >
      {/* Titolo */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0A5A34]">
          {title}
        </h2>
      </div>

      {/* Contenuto */}
      <div>{children}</div>
    </section>
  );
}