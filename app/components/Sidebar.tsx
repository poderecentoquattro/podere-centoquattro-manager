import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Sidebar() {
  const [mobile, setMobile] =useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const closeMenu = () => {
    if (mobile) setOpen(false);
  };

  return (
    <>
      {/* Pulsante menu */}
      {mobile && (
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-4 left-4 z-50 rounded-xl bg-[#0A5A34] p-3 text-white shadow-xl"
        >
          ☰
        </button>
      )}

      {/* Overlay */}
      {mobile && open && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={() => setOpen(false)}
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
              ? `fixed top-0 left-0 h-screen z-40 w-72 ${
                  open ? "translate-x-0" : "-translate-x-full"
                }`
              : "w-80"
          }
        `}
      >
        {/* Logo */}
        <div className="px-8 pt-8 pb-10">
          <Logo />
        </div>

        {/* Menu */}
        <nav className="flex-1 px-6 space-y-3">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-5 text-xl hover:bg-white/20 transition"
          >
            🏡 Dashboard
          </Link>

          <Link
            href="/nuova-pratica"
            onClick={closeMenu}
            className="flex items-center gap-4 rounded-2xl px-6 py-5 text-xl hover:bg-white/10 transition"
          >
            📝 Nuova Pratica
          </Link>

          <Link
            href="/pratiche"
            onClick={closeMenu}
            className="flex items-center gap-4 rounded-2xl px-6 py-5 text-xl hover:bg-white/10 transition"
          >
            📋 Tutte le Pratiche
          </Link>

          <Link
            href="/calendario"
            onClick={closeMenu}
            className="flex items-center gap-4 rounded-2xl px-6 py-5 text-xl hover:bg-white/10 transition"
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