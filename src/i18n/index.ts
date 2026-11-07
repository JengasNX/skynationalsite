import { ru } from './ru';
import { en } from './en';
import type { Lang } from '../utils/links';

export type { Dict } from './ru';

export const dicts: Record<Lang, typeof ru> = { ru, en };

/** Returns the UI dictionary for a language. */
export function useDict(lang: Lang) {
  return dicts[lang];
}

/** Formats a date for the given language: 14 ноября 2026 / 14 November 2026 */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Short numeric date: 14.11.2026 / 14/11/2026 */
export function formatShortDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/** Date and time with timezone label: 14 ноября 2026, 19:00 UTC */
export function formatDateTime(date: Date, lang: Lang, timezone = 'UTC'): string {
  const d = new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone === 'UTC' ? 'UTC' : undefined,
  }).format(date);
  return `${d} ${timezone}`;
}
