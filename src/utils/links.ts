export type Lang = 'ru' | 'en';
export const LANGS: Lang[] = ['ru', 'en'];
export const DEFAULT_LANG: Lang = 'ru';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Base path of the deployed site ('' in theory, '/skynationalsite' on GitHub Pages). */
export const basePath = BASE;

/**
 * Prefixes a static asset path with the deployment base:
 * asset('/assets/logo.png') -> '/skynationalsite/assets/logo.png'.
 * Assets are never locale-prefixed.
 */
export function asset(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}`;
}

/** Locale part of a path only: '/news/' or '/en/news/' (used for canonical/hreflang URLs). */
export function localePath(lang: Lang, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  if (lang === 'en') return clean ? `/en${clean}/` : '/en/';
  return clean ? `${clean}/` : '/';
}

/** Builds an internal URL for a page in the given language. pathFor('en', '/news') -> '/skynationalsite/en/news' */
export function pathFor(lang: Lang, path: string): string {
  return `${BASE}${localePath(lang, path)}` || '/';
}

/** Strips the base + locale prefix from a pathname: '/skynationalsite/en/news/x' -> 'news/x' */
export function pageKey(pathname: string): string {
  let p = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  p = p.replace(/^\//, '');
  if (p === 'en' || p.startsWith('en/')) p = p.slice(2).replace(/^\//, '');
  return p;
}

/** Detects the language from a pathname. */
export function langFromPath(pathname: string): Lang {
  const p = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return /^\/?en(\/|$)/.test(p) ? 'en' : 'ru';
}

/** URL of the same page in the other language (used by the language switcher). */
export function switchLangPath(lang: Lang, path: string): string {
  return pathFor(lang, path);
}
