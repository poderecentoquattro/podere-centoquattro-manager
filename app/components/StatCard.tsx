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
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-lg font-medium">
            {title}
          </p>

          <h2
            className="text-5xl font-bold mt-4"
            style={{ color }}
          >
            {value}
          </h2>

        </div>

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{
            backgroundColor: `${color}20`,
            color: color,
          }}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}