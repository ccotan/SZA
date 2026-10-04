import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Карта мира" };

/** Встраивает BlueMap / Dynmap / squaremap по NEXT_PUBLIC_MAP_URL. Сервис карты должен разрешать iframe. */
export default function MapPage() {
  const url = site.links.mapUrl;
  return (
    <div className="page-in pt-20 pb-6 sm:pt-24">
      <Container className="px-3 sm:px-8">
        {url ? (
          <>
            <div className="mb-3 flex items-center justify-between gap-4 px-2">
              <h1 className="text-xl font-semibold tracking-[-0.02em]">Карта мира</h1>
              <ButtonLink href={url} external variant="secondary">
                В новой вкладке <Icon name="arrowUpRight" size={16} />
              </ButtonLink>
            </div>
            <iframe src={url} title="Интерактивная карта мира" className="h-[calc(100svh-160px)] w-full rounded-[28px] border border-line bg-surface" loading="lazy" />
          </>
        ) : (
          <div className="grid min-h-[60svh] place-items-center rounded-[28px] bg-surface p-8 text-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-semibold tracking-[-0.03em]">Карта скоро появится</h1>
              <p className="mt-3 text-muted">Мы подключаем интерактивную карту мира. Следите за анонсами в Discord.</p>
              <ButtonLink href="/" variant="secondary" className="mt-6">На главную</ButtonLink>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
