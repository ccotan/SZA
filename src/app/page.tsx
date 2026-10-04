import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { About } from "@/components/sections/About";
import { Start } from "@/components/sections/Start";
import { LiveStatus } from "@/components/sections/Live";
import { World } from "@/components/sections/World";
import { RulesPreview } from "@/components/sections/RulesPreview";
import { Community } from "@/components/sections/Community";
import { Faq } from "@/components/sections/Faq";
import { Section } from "@/components/ui/Section";

export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <About />
      <Start />
      <Section id="live" eyebrow="Онлайн" title="Прямо сейчас на сервере" lead="Данные приходят с сервера и обновляются каждую минуту.">
        <LiveStatus />
      </Section>
      <World />
      <RulesPreview />
      <Community />
      <Faq />
    </>
  );
}
