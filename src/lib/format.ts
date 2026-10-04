const plural = new Intl.PluralRules("ru-RU");

export function pluralize(n: number, forms: { one: string; few: string; many: string }) {
  const rule = plural.select(n);
  return rule === "one" ? forms.one : rule === "few" ? forms.few : forms.many;
}

export const playersWord = (n: number) => pluralize(n, { one: "игрок", few: "игрока", many: "игроков" });

export const formatNumber = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
