import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { site } from "@/config/site";
import { ServerStatusProvider } from "@/hooks/useServerStatus";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileConnectBar } from "@/components/layout/MobileConnectBar";
import "./globals.css";

const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-onest", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ванильный Minecraft-сервер`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { title: `${site.name} — ванильный Minecraft-сервер`, description: site.description, locale: "ru_RU", type: "website" },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={onest.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only z-[60] rounded-lg bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Перейти к содержимому
        </a>
        <ServerStatusProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileConnectBar />
        </ServerStatusProvider>
      </body>
    </html>
  );
}
