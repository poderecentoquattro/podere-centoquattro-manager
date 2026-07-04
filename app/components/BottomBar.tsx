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
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,.08)] lg:hidden">
      <div className="flex justify-around">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center py-2 transition ${
                active
                  ? "text-[#0A5A34] font-semibold"
                  : "text-gray-500"
              }`}
            >
              <span className="text-2xl">
                {item.icon}
              </span>

              <span className="text-xs">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}