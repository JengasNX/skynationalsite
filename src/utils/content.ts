import type { Lang } from './links';

/** Content entries are stored per locale: '<slug>.ru.md' / '<slug>.en.md' */

export function localeOf(id: string): Lang {
  return id.endsWith('.en') ? 'en' : 'ru';
}

export function slugOf(id: string): string {
  return id.replace(/\.(ru|en)$/, '');
}

type Entry = { id: string };

/**
 * Picks the entry for the requested language, falling back to the Russian
 * version when the translation is missing.
 */
export function localize<T extends Entry>(entries: T[], slug: string, lang: Lang): T | undefined {
  return (
    entries.find((e) => slugOf(e.id) === slug && localeOf(e.id) === lang) ??
    entries.find((e) => slugOf(e.id) === slug && localeOf(e.id) === 'ru')
  );
}

/** Returns only the entries of one locale that have a pair file (used to build static paths). */
export function slugsOf(entries: Entry[], lang: Lang): string[] {
  return [...new Set(entries.filter((e) => localeOf(e.id) === lang).map((e) => slugOf(e.id)))].sort();
}

/**
 * Collapses locale pairs into one list: prefers the requested language,
 * falls back to the Russian version when the translation is missing.
 */
export function localizeAll<T extends Entry>(entries: T[], lang: Lang): T[] {
  const map = new Map<string, T>();
  for (const entry of entries) {
    const slug = slugOf(entry.id);
    if (!map.has(slug)) map.set(slug, entry);
    if (localeOf(entry.id) === lang) map.set(slug, entry);
  }
  return [...map.values()];
}

/** Rough markdown -> plain text, used to build the search index. */
export function markdownToText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
