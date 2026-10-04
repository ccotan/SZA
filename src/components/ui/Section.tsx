import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/format";

type Props = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, lead, aside, children, className }: Props) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-20 sm:py-28", className)}>
      <Container>
        <Reveal className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow && <p className="mb-4 text-sm font-medium text-accent">{eyebrow}</p>}
            <h2 id={headingId} className="text-[32px] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
              {title}
            </h2>
            {lead && <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">{lead}</p>}
          </div>
          {aside}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
