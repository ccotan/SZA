"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/config/site";
import { cn } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
          scrolled || open
            ? "bg-canvas/80 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8">
          <Logo />

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-[10px] px-3 py-2 text-[15px] text-ink-2 transition-colors hover:bg-surface hover:text-ink",
                      pathname === item.href && "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <StatusBadge showVersion={false} className="mr-3 hidden xl:flex" />
            <span className="hidden sm:block">
              <ButtonLink href="/#start">Начать играть</ButtonLink>
            </span>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-[12px] hover:bg-surface lg:hidden"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "x" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </header>
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "fixed inset-x-0 z-40 top-16 bottom-0 bg-canvas px-5 pt-4 pb-8 transition-[opacity,transform] duration-300 ease-out sm:top-[72px] lg:hidden",
          open ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Мобильная навигация" className="flex h-full flex-col">
          <ul className="flex flex-col">
            {navigation.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 text-2xl font-medium tracking-[-0.02em]"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {item.label}
                  <Icon name="arrow" className="text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-4">
            <StatusBadge />
            <ButtonLink href="/#start" size="lg" onClick={() => setOpen(false)}>
              Начать играть
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
