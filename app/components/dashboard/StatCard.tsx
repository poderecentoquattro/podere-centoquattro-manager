type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  color = "#0A5A34",
}: StatCardProps) {
  return (
    <div className="group rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Icona */}
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: `${color}15`,
          color,
        }}
      >
        <span className="text-4xl">
          {icon}
        </span>
      </div>

      {/* Numero */}
      <h2
        className="text-5xl font-extrabold leading-none"
        style={{ color }}
      >
        {value}
      </h2>

      {/* Titolo */}
      <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
        {title}
      </p>

    </div>
  );
}