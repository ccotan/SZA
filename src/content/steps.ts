export type Step = { title: string; text: string; action?: "copy-ip" };

export const steps: Step[] = [
  { title: "Запустите Minecraft", text: "Нужна лицензионная Java Edition и официальный лаунчер." },
  { title: "Выберите версию", text: "В лаунчере укажите актуальную версию сервера." },
  { title: "Добавьте сервер", text: "Сетевая игра → Добавить → вставьте адрес.", action: "copy-ip" },
  { title: "Заходите", text: "Новички появляются у спавна. Загляните в правила — это две минуты." },
];
