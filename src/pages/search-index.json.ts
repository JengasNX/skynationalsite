import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { dicts } from '../i18n';
import { localizeAll, markdownToText, slugOf } from '../utils/content';
import { pathFor, type Lang } from '../utils/links';

type Doc = {
  id: string;
  lang: Lang;
  type: 'page' | 'news' | 'event' | 'wiki';
  title: string;
  excerpt: string;
  url: string;
  body: string;
};

const LANGS: Lang[] = ['ru', 'en'];

export const GET: APIRoute = async () => {
  const docs: Doc[] = [];

  // static sections
  for (const lang of LANGS) {
    const dict = dicts[lang];
    const pages = [
      { path: '/', title: SITE.name, excerpt: SITE.description[lang] },
      { path: '/about', title: dict.about.title, excerpt: dict.about.subtitle },
      { path: '/vacancies', title: dict.vacancies.title, excerpt: dict.vacancies.subtitle },
      { path: '/news', title: dict.news.title, excerpt: dict.news.subtitle },
      { path: '/events', title: dict.events.title, excerpt: dict.events.subtitle },
      { path: '/wiki', title: dict.wiki.title, excerpt: dict.wiki.subtitle },
      { path: '/join', title: dict.join.title, excerpt: dict.join.subtitle },
      { path: '/contacts', title: dict.contacts.title, excerpt: dict.contacts.subtitle },
    ];

    for (const page of pages) {
      docs.push({
        id: `page:${lang}:${page.path}`,
        lang,
        type: 'page',
        title: page.title,
        excerpt: page.excerpt,
        url: pathFor(lang, page.path),
        body: '',
      });
    }

    const news = localizeAll(await getCollection('news'), lang).sort(
      (a, b) => b.data.date.getTime() - a.data.date.getTime(),
    );
    for (const entry of news) {
      const slug = slugOf(entry.id);
      docs.push({
        id: `news:${lang}:${slug}`,
        lang,
        type: 'news',
        title: entry.data.title,
        excerpt: entry.data.excerpt,
        url: pathFor(lang, `/news/${slug}`),
        body: markdownToText(entry.body ?? ''),
      });
    }

    const events = localizeAll(await getCollection('events'), lang);
    for (const entry of events) {
      const slug = slugOf(entry.id);
      docs.push({
        id: `event:${lang}:${slug}`,
        lang,
        type: 'event',
        title: entry.data.title,
        excerpt: entry.data.excerpt,
        url: pathFor(lang, '/events'),
        body: markdownToText(entry.body ?? ''),
      });
    }

    const wiki = localizeAll(await getCollection('wiki'), lang);
    for (const entry of wiki) {
      const slug = slugOf(entry.id);
      docs.push({
        id: `wiki:${lang}:${slug}`,
        lang,
        type: 'wiki',
        title: entry.data.title,
        excerpt: entry.data.excerpt,
        url: pathFor(lang, `/wiki/${slug}`),
        body: markdownToText(entry.body ?? ''),
      });
    }
  }

  return new Response(JSON.stringify(docs), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
