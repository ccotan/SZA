import type { Metadata } from "next";
import { ruleGroups } from "@/content/rules";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Правила", description: "Короткие и понятные правила сервера." };

export default function RulesPage() {
  return (
    <div className="page-in pt-32 pb-24 sm:pt-40">
      <Container>
        <header className="max-w-2xl">
          <p className="mb-4 text-sm font-medium text-accent">Правила</p>
          <h1 className="text-[40px] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-6xl">Играем честно</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Правила созданы, чтобы мир оставался общим и интересным для всех. Играя на сервере, вы соглашаетесь с ними.
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-[220px_1fr] lg:gap-16">
          <nav aria-label="Разделы правил" className="-mx-5 overflow-x-auto px-5 lg:sticky lg:top-28 lg:mx-0 lg:self-start lg:px-0">
            <ul className="flex gap-2 lg:flex-col lg:gap-1">
              {ruleGroups.map((g) => (
                <li key={g.id} className="shrink-0">
                  <a href={`#${g.id}`} className="block rounded-full bg-surface px-4 py-2 text-[15px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink lg:rounded-[10px] lg:bg-transparent lg:px-3">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-16">
            {ruleGroups.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-t`}>
                <Reveal>
                  <h2 id={`${g.id}-t`} className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{g.title}</h2>
                  <p className="mt-2 text-muted">{g.summary}</p>
                </Reveal>
                <ol className="mt-6 divide-y divide-line rounded-[var(--radius-card)] border border-line">
                  {g.rules.map((r) => (
                    <li key={r.id} id={`rule-${r.id}`} className="grid gap-1 p-5 sm:grid-cols-[56px_1fr] sm:gap-4 sm:p-7">
                      <span className="font-mono text-sm text-muted sm:pt-0.5">{r.id}</span>
                      <div>
                        <h3 className="font-semibold">{r.title}</h3>
                        <p className="mt-1 text-[15px] leading-relaxed text-muted">{r.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
            <div className="rounded-[var(--radius-card)] bg-surface p-6 sm:p-8">
              <p className="text-lg font-semibold">Всё понятно?</p>
              <p className="mt-1 text-muted">Тогда до встречи в игре.</p>
              <ButtonLink href="/#start" className="mt-5">Начать играть</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
