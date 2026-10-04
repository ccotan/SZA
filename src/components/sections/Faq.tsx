import { faq } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="pt-8 pb-24 sm:pb-32">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <p className="mb-4 text-sm font-medium text-accent">FAQ</p>
          <h2 id="faq-title" className="text-[32px] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl">
            Частые вопросы
          </h2>
          <p className="mt-5 text-lg text-muted">Не нашли ответ? Спросите в Discord — отвечаем быстро.</p>
        </Reveal>
        <Reveal delay={80}>
          <Accordion items={faq} />
        </Reveal>
      </Container>
    </section>
  );
}
