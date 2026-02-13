export const LOCALES = ['tr', 'en', 'ru'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'tr';

// Page ID -> localized path mapping
export const routeMap: Record<Locale, Record<string, string>> = {
  tr: {
    home: '/',
    contact: '/iletisim',
    about: '/hakkimizda',
    jewelry: '/mucevher',
    'jewelry/rings': '/mucevher/yuzuk',
    'jewelry/bracelets': '/mucevher/bileklik',
    'jewelry/necklaces': '/mucevher/kolye',
    'jewelry/earrings': '/mucevher/kupe',
    'jewelry/sets': '/mucevher/set',
    men: '/erkek',
    'men/rings': '/erkek/yuzuk',
    'men/bracelets': '/erkek/bileklik',
    'men/prayer-beads': '/erkek/tesbih',
    'men/cuff': '/erkek/kol',
    'collection/light-of-my-eyes': '/koleksiyon/gozumun-nuru',
    'custom-design': '/ozel-tasarim',
    gifts: '/hediye',
    preloved: '/preloved',
    investment: '/yatirim',
    blog: '/blog',
    product: '/urun',
    appointment: '/randevu',
    'customer-service/care-warranty': '/musteri-hizmetleri/bakim-garanti',
    'legal/cookie-policy': '/yasal/cerez-politikasi',
  },
  en: {
    home: '/en',
    contact: '/en/contact',
    about: '/en/about',
    jewelry: '/en/jewelry',
    'jewelry/rings': '/en/jewelry/rings',
    'jewelry/bracelets': '/en/jewelry/bracelets',
    'jewelry/necklaces': '/en/jewelry/necklaces',
    'jewelry/earrings': '/en/jewelry/earrings',
    'jewelry/sets': '/en/jewelry/sets',
    men: '/en/men',
    'men/rings': '/en/men/rings',
    'men/bracelets': '/en/men/bracelets',
    'men/prayer-beads': '/en/men/prayer-beads',
    'men/cuff': '/en/men/cuff',
    'collection/light-of-my-eyes': '/en/collection/light-of-my-eyes',
    'custom-design': '/en/custom-design',
    gifts: '/en/gifts',
    preloved: '/en/preloved',
    investment: '/en/investment',
    blog: '/en/blog',
    product: '/en/product',
    appointment: '/en/appointment',
    'customer-service/care-warranty': '/en/customer-service/care-warranty',
    'legal/cookie-policy': '/en/legal/cookie-policy',
  },
  ru: {
    home: '/ru',
    contact: '/ru/kontakt',
    about: '/ru/o-nas',
    jewelry: '/ru/yuvelirnye-izdeliya',
    'jewelry/rings': '/ru/yuvelirnye-izdeliya/koltsa',
    'jewelry/bracelets': '/ru/yuvelirnye-izdeliya/braslety',
    'jewelry/necklaces': '/ru/yuvelirnye-izdeliya/kolie',
    'jewelry/earrings': '/ru/yuvelirnye-izdeliya/sergi',
    'jewelry/sets': '/ru/yuvelirnye-izdeliya/komplekty',
    men: '/ru/muzhskiye',
    'men/rings': '/ru/muzhskiye/koltsa',
    'men/bracelets': '/ru/muzhskiye/braslety',
    'men/prayer-beads': '/ru/muzhskiye/chotki',
    'men/cuff': '/ru/muzhskiye/manzhety',
    'collection/light-of-my-eyes': '/ru/kollektsiya/svet-moikh-glaz',
    'custom-design': '/ru/individualnyy-dizayn',
    gifts: '/ru/podarki',
    preloved: '/ru/preloved',
    investment: '/ru/investitsii',
    blog: '/ru/blog',
    product: '/ru/tovar',
    appointment: '/ru/zapis',
    'customer-service/care-warranty': '/ru/obsluzhivaniye/ukhod-garantiya',
    'legal/cookie-policy': '/ru/yuridicheskoye/cookie-politika',
  },
};

// Reverse map: localized path -> pageId (for EN/RU catch-all routing)
const reverseMapCache: Record<Locale, Record<string, string>> = { tr: {}, en: {}, ru: {} };

function buildReverseMap(locale: Locale): Record<string, string> {
  if (Object.keys(reverseMapCache[locale]).length > 0) return reverseMapCache[locale];
  const map = routeMap[locale];
  const reverse: Record<string, string> = {};
  for (const [pageId, path] of Object.entries(map)) {
    // Strip the locale prefix to get the relative path
    const prefix = locale === 'tr' ? '' : `/${locale}`;
    const relativePath = path.replace(prefix, '') || '/';
    reverse[relativePath] = pageId;
  }
  reverseMapCache[locale] = reverse;
  return reverse;
}

/** Resolve a localized path to a pageId */
export function resolvePageId(locale: Locale, pathSegments: string[]): string | null {
  const reverse = buildReverseMap(locale);
  const path = '/' + pathSegments.join('/');
  return reverse[path] || null;
}

/** Get localized path for a given pageId and locale */
export function getLocalizedPath(pageId: string, locale: Locale): string {
  return routeMap[locale]?.[pageId] || routeMap['tr']?.[pageId] || '/';
}

/** Get alternate links for all locales (for hreflang) */
export function getAlternateLinks(pageId: string): { locale: Locale; path: string }[] {
  return LOCALES.map((locale) => ({
    locale,
    path: routeMap[locale]?.[pageId] || '/',
  }));
}

/** Get all static params for EN/RU catch-all route */
export function getLocaleStaticParams(): { locale: string; path: string[] }[] {
  const params: { locale: string; path: string[] }[] = [];
  for (const locale of LOCALES) {
    if (locale === 'tr') continue; // Turkish pages are at root
    const map = routeMap[locale];
    for (const [, fullPath] of Object.entries(map)) {
      const prefix = `/${locale}`;
      const relativePath = fullPath.replace(prefix, '').replace(/^\//, '');
      if (relativePath) {
        params.push({ locale, path: relativePath.split('/') });
      }
    }
  }
  return params;
}

/** Detect locale from pathname */
export function getLocaleFromPath(pathname: string): Locale {
  for (const locale of LOCALES) {
    if (locale === 'tr') continue;
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return 'tr';
}

/** Get pageId from any pathname */
export function getPageIdFromPath(pathname: string): string | null {
  const locale = getLocaleFromPath(pathname);
  for (const [pageId, path] of Object.entries(routeMap[locale])) {
    if (path === pathname) return pageId;
  }
  return null;
}
