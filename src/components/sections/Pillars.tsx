import { pillars } from "@/content/server";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Pillars() {
  return (
    <section aria-label="Преимущества" className="pt-20 sm:pt-28">
      <Container>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.index} delay={i * 80} className="bg-canvas p-7 sm:p-10">
              <p className="font-mono text-sm text-accent">{p.index}</p>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] sm:mt-16">{p.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
