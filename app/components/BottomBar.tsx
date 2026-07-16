"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomBar() {
  const pathname = usePathname();

  const items = [
    {
      href: "/",
      icon: "🏡",
      label: "Home",
    },
    {
      href: "/calendario",
      icon: "📅",
      label: "Calendario",
    },
    {
      href: "/nuova-pratica",
      icon: "➕",
      label: "Nuova",
      primary: true,
    },
    {
      href: "/pratiche",
      icon: "📋",
      label: "Pratiche",
    },
    {
      href: "/impostazioni",
      icon: "⚙️",
      label: "Altro",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/90 backdrop-blur-xl lg:hidden">
      <div
        className="flex items-center justify-around px-2 pt-2"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        {items.map((item) => {
          const active = pathname === item.href;

          if (item.primary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-1 justify-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0A5A34] text-3xl text-white shadow-lg transition-transform duration-200 active:scale-95">
                  {item.icon}
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-1 transition-all duration-200 ${
                active
                  ? "text-[#0A5A34] font-semibold"
                  : "text-gray-500"
              }`}
            >
              <span
                className={`transition-transform duration-200 ${
                  active ? "scale-110 text-[28px]" : "text-[26px]"
                }`}
              >
                {item.icon}
              </span>

              <span className="text-[11px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}