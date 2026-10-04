import { steps } from "@/content/steps";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CopyIp } from "@/components/ui/CopyIp";

export function Start() {
  return (
    <Section id="start" eyebrow="Как начать" title="Четыре шага до первого рассвета" className="bg-surface">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.title}
            delay={i * 70}
            className={`flex flex-col rounded-[var(--radius-card)] bg-canvas p-6 shadow-[var(--shadow-soft)] sm:p-7 ${step.action ? "sm:col-span-2 lg:col-span-1" : ""}`}
          >
            <span className="grid size-10 place-items-center rounded-full bg-surface font-mono text-sm font-medium">{i + 1}</span>
            <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
            {step.action === "copy-ip" && <CopyIp className="mt-6" />}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
