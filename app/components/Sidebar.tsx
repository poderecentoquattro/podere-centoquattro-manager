"use client";

import Link from "next/link";
import Logo from "./Logo";

type SidebarProps = {
  open: boolean;
  mobile: boolean;
  onClose: () => void;
};

export default function Sidebar({
  open,
  mobile,
  onClose,
}: SidebarProps) {
  const handleClick = () => {
    if (mobile) onClose();
  };

  return (
    <>
      {/* Overlay */}
      {mobile && open && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-[#0A5A34]
          text-white
          flex
          flex-col
          shadow-2xl
          transition-transform
          duration-300

          ${
            mobile
              ? `
                  fixed
                  top-0
                  left-0
                  h-screen
                  w-72
                  z-40
                  ${open ? "translate-x-0" : "-translate-x-full"}
                `
              : "w-80"
          }
        `}
      >
        {/* Logo */}
        <div className="px-4 pt-8 pb-6">
          <Logo />
        </div>

        {/* Menu */}
        <nav className="flex-1 px-6 space-y-3">
          <Link
            href="/"
            onClick={handleClick}
            className="flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-5 text-xl transition hover:bg-white/20"
          >
            🏡 Dashboard
          </Link>

          <Link
            href="/nuova-pratica"
            onClick={handleClick}
            className="flex items-center gap-4 rounded-2xl px-6 py-5 text-xl transition hover:bg-white/10"
          >
            📝 Nuova Pratica
          </Link>

          <Link
            href="/pratiche"
            onClick={handleClick}
            className="flex items-center gap-4 rounded-2xl px-6 py-5 text-xl transition hover:bg-white/10"
          >
            📋 Tutte le Pratiche
          </Link>

          <Link
            href="/calendario"
            onClick={handleClick}
            className="flex items-center gap-4 rounded-2xl px-6 py-5 text-xl transition hover:bg-white/10"
          >
            📅 Calendario
          </Link>
        </nav>

        {/* Footer */}
        <div className="px-6 pb-8">
          <div className="mb-6 border-t border-white/20"></div>

          <button className="flex w-full items-center gap-4 rounded-2xl px-6 py-4 text-xl transition hover:bg-white/10">
            🚪 Esci
          </button>
        </div>
      </aside>
    </>
  );
}