import { keyRules } from "@/content/rules";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function RulesPreview() {
  return (
    <Section
      id="rules"
      eyebrow="Правила"
      title="Коротко о главном"
      lead="Правил немного, и все они про одно — уважение к миру и друг к другу."
      aside={
        <ButtonLink href="/rules" variant="secondary" className="self-start md:self-auto">
          Все правила <Icon name="arrow" size={16} />
        </ButtonLink>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {keyRules.map((r, i) => (
          <Reveal key={r.id} delay={i * 60} className="rounded-[var(--radius-card)] border border-line p-6 transition-colors hover:border-ink/15 sm:p-8">
            <p className="font-mono text-sm text-muted">{r.id}</p>
            <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{r.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{r.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
