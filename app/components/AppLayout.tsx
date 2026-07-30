"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const [mobile, setMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 1024;

      setMobile(isMobile);

      if (!isMobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

 return (
    <div className="flex min-h-screen bg-[#F6FAF5]">
      <Sidebar
        mobile={mobile}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">

   {mobile && (
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
        )}

{/* Lasciamo lo scroll gestito dal body.
    overflow-y-auto causava il blocco della rotellina del mouse su desktop. */}
        <main className="flex-1 p-4 pb-6 md:p-8 lg:p-10">
          {children}
        </main>

      </div>
        </div>
);
}