import Link from "next/link";
import { discordUrl, navigation, site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line pt-16 pb-28 sm:pb-12">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{site.description}</p>
          </div>
          <nav aria-label="Навигация в подвале" className="grid grid-cols-2 gap-x-12 gap-y-3 text-[15px] sm:grid-cols-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-ink-2 transition-colors hover:text-ink">
                {item.label}
              </Link>
            ))}
            {discordUrl && (
              <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="text-ink-2 transition-colors hover:text-ink">
                Discord
              </a>
            )}
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Не является официальным продуктом Minecraft. Не одобрено и не связано с Mojang или Microsoft.</p>
        </div>
      </Container>
    </footer>
  );
}
