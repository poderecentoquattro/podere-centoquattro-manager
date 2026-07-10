"use client";

type Props = {
  viewMode: "bookings" | "prices";
  onChange: (mode: "bookings" | "prices") => void;
};

export default function CalendarToolbar({
  viewMode,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onChange("bookings")}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          viewMode === "bookings"
            ? "bg-green-700 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        📅 Prenotazioni
      </button>

      <button
        onClick={() => onChange("prices")}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          viewMode === "prices"
            ? "bg-blue-700 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        💶 Tariffe
      </button>
    </div>
  );
}