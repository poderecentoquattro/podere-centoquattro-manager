"use client";

type Props = {
  onMenuClick: () => void;
};

export default function TopBar({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-green-100 bg-white/95 px-4 shadow-sm backdrop-blur">
      {/* Pulsante Menu */}
      <button
        onClick={onMenuClick}
        className="flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-green-50 active:scale-95"
        aria-label="Apri menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-[#0A5A34]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Titolo */}
      <div className="text-center">
        <h1 className="text-lg font-bold text-[#0A5A34]">
          Podere Centoquattro
        </h1>

        <p className="text-xs text-gray-500">
          Manager
        </p>
      </div>

      {/* Profilo */}
      <button
        className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-xl transition hover:bg-green-200 active:scale-95"
      >
        👤
      </button>
    </header>
  );
}