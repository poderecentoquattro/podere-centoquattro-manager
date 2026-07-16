"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

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
    <div className="flex min-h-[100dvh] overflow-hidden bg-[#F6FAF5]">
      <Sidebar
        mobile={mobile}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {mobile && (
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
        )}

        <main
          className="
            flex-1
            overflow-y-auto
            overscroll-contain
            bg-gradient-to-br
            from-[#F8FBF6]
            to-[#EEF5EF]
            p-4
            pb-[calc(7rem+env(safe-area-inset-bottom))]
            md:p-8
            lg:p-10
          "
        >
          {children}
        </main>

        {mobile && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200">
            <BottomBar />
          </div>
        )}
      </div>
    </div>
  );
}