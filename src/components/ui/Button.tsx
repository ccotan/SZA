import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] font-medium " +
  "transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover shadow-[0_1px_0_rgb(255_255_255/0.2)_inset]",
  secondary: "bg-surface text-ink hover:bg-surface-2",
  ghost: "text-ink hover:bg-surface",
  inverse: "bg-white text-ink hover:bg-white/90",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function Button({ variant, size, className, ...props }: CommonProps & ComponentPropsWithoutRef<"button">) {
  return <button type="button" className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  external,
  ...props
}: CommonProps & { href: string; external?: boolean } & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const cls = buttonClass(variant, size, className);
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props} />;
  return <Link href={href} className={cls} {...props} />;
}
