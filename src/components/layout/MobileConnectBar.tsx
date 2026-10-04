"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/format";
import { CopyIp } from "@/components/ui/CopyIp";

/** На телефоне IP всегда под рукой: панель появляется после первого экрана */
export function MobileConnectBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 rounded-[18px] border border-line bg-canvas/85 p-1.5 shadow-[var(--shadow-lift)] backdrop-blur-xl transition-[opacity,transform] duration-300 ease-out sm:hidden",
        "pb-[max(0.375rem,env(safe-area-inset-bottom))]",
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <CopyIp className="border-0" />
    </div>
  );
}
