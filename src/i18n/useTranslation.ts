"use client";

import { useMemo } from "react";
import { useLocale } from "./LocaleContext";
import { getDictionary } from "./getDictionary";
import type { Locale } from "./config";

function getNestedValue(obj: Record<string, unknown>, key: string): string {
  const keys = key.split(".");
  let current: unknown = obj;
  for (const k of keys) {
    if (current === null || current === undefined || typeof current !== "object") return key;
    current = (current as Record<string, unknown>)[k];
  }
  return typeof current === "string" ? current : key;
}

export type TranslateFunction = (key: string, replacements?: Record<string, string>) => string;

export function useTranslation(localeOverride?: Locale): TranslateFunction {
  const contextLocale = useLocale();
  const locale = localeOverride || contextLocale;
  const dict = useMemo(() => getDictionary(locale), [locale]);

  return useMemo(
    () => (key: string, replacements?: Record<string, string>) => {
      let value = getNestedValue(dict as Record<string, unknown>, key);
      if (replacements) {
        for (const [placeholder, replacement] of Object.entries(replacements)) {
          value = value.replace(`{${placeholder}}`, replacement);
        }
      }
      return value;
    },
    [dict]
  );
}
