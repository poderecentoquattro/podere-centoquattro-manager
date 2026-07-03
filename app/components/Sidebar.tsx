"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Sidebar() {
  return (
    <aside className="w-80 bg-[#0A5A34] text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="px-8 pt-8 pb-10">
        <Logo />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-6 space-y-3">

        <Link
          href="/"
          className="flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-5 text-xl hover:bg-white/20 transition"
        >
          🏡 Dashboard
        </Link>

        <Link
          href="/nuova-pratica"
          className="flex items-center gap-4 rounded-2xl px-6 py-5 text-xl hover:bg-white/10 transition"
        >
          📝 Nuova Pratica
        </Link>

        <Link
          href="/pratiche"
          className="flex items-center gap-4 rounded-2xl px-6 py-5 text-xl hover:bg-white/10 transition"
        >
          📋 Tutte le Pratiche
        </Link>

        <Link
          href="/calendario"
          className="flex items-center gap-4 rounded-2xl px-6 py-5 text-xl hover:bg-white/10 transition"
        >
          📅 Calendario
        </Link>

      </nav>

      {/* Footer */}
      <div className="px-6 pb-8">

        <div className="border-t border-white/20 mb-6"></div>

        <button className="flex items-center gap-4 rounded-2xl px-6 py-4 text-xl hover:bg-white/10 transition w-full">
          🚪 Esci
        </button>

      </div>

    </aside>
  );
}