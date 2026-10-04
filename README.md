# Valley — сайт ванильного Minecraft-сервера

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. Других runtime-зависимостей нет.

## Запуск
```bash
cp .env.example .env.local   # заполните адрес сервера, Discord, карту
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```
Тестовые данные статуса: `STATUS_PROVIDER=mock npm run dev`. В production mock автоматически отключён, а в интерфейсе тестовые данные всегда помечены плашкой «Тестовые данные».

## Что где лежит
```
src/
  config/site.ts         название, адрес, ссылки, навигация — единый источник правды
  content/               тексты: характеристики, правила, FAQ, шаги, галерея (типизированы)
  lib/server-status/     StatusProvider-интерфейс + mcsrvstat (live) + mock (dev)
  lib/discord/           публичный invite API Discord (участники/онлайн)
  hooks/                 useServerStatus (один опрос на всё приложение), useCopy
  components/ui/         Button, Card, Section, Reveal, CopyIp, StatusBadge, Accordion, Icon
  components/sections/   секции главной
  components/layout/     Header, Footer, MobileConnectBar, Logo
  components/visual/     Landscape — процедурная SVG-иллюстрация (заменяется скриншотами)
  app/                   страницы: /, /rules, /map, API: /api/status, /api/discord
```

## Подключение позже
| Что | Куда |
|---|---|
| Свой API сервера / плагин | новый провайдер в `lib/server-status/`, реализующий `StatusProvider` |
| Список игроков | `enable-query=true` в server.properties (mcsrvstat его читает) или свой провайдер |
| Карта BlueMap/Dynmap | `NEXT_PUBLIC_MAP_URL`; сервис карты должен разрешать iframe |
| Discord | `NEXT_PUBLIC_DISCORD_INVITE`; Bot API — расширить `lib/discord` |
| Скриншоты | `/public/media/gallery` + `content/gallery.ts` |
| Новости, заявки, whitelist, кабинет, админка | новые маршруты в `app/` (например `app/(account)/…`, `app/admin/…`), данные — в `lib/<домен>/`; авторизация — Auth.js с Discord/Microsoft OAuth через `middleware` |
