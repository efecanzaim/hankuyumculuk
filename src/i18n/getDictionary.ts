import type { Locale } from "./config";
import tr from "./dictionaries/tr.json";
import en from "./dictionaries/en.json";
import ru from "./dictionaries/ru.json";

const dictionaries: Record<Locale, Record<string, unknown>> = { tr, en, ru };

export type Dictionary = typeof tr;

export function getDictionary(locale: Locale): Dictionary {
  return (dictionaries[locale] || dictionaries.tr) as Dictionary;
}
