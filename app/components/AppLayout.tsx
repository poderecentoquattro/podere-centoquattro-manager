"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import { usePathname } from "next/navigation";
import { UIProvider } from "./UIContext";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const [mobile, setMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
const pathname = usePathname();

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
  <UIProvider>
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
           pb-6
            md:p-8
            lg:p-10
          "
        >
          {children}
        </main>

)
      </div>
        </div>
  </UIProvider>
);
}