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

      // Su desktop la sidebar è sempre visibile
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

      <div className="flex flex-1 min-w-0 flex-col">
        {mobile && (
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
        )}

       <main
  className="
    flex-1
    overflow-y-auto
    bg-gradient-to-br
    from-[#F8FBF6]
    to-[#EEF5EF]
    p-4
    pb-24
    md:p-8
    lg:p-10
  "
>
        {mobile && <BottomBar />}
      </div>
    </div>
  );
}