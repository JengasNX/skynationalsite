import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Keep the raw file name (minus extension) as the entry id, so the locale
 * suffix stays parseable: 'first-flight.ru' -> id 'first-flight.ru'.
 * The default slugifier strips dots and would turn it into 'first-flightru'.
 */
const keepLocaleSuffix = ({ entry }: { entry: string }): string =>
  entry.replace(/\.(md|mdx)$/, '');

const news = defineCollection({
  loader: glob({ pattern: ['*.ru.md', '*.en.md'], base: './src/content/news', generateId: keepLocaleSuffix }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z
      .array(z.enum(['updates', 'events', 'recruitment', 'community']))
      .default([]),
    cover: z.string().optional(),
    excerpt: z.string(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: ['*.ru.md', '*.en.md'], base: './src/content/events', generateId: keepLocaleSuffix }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    timezone: z.string().default('UTC'),
    type: z.enum(['group-flight', 'training', 'meetup']),
    route: z.string().optional(),
    network: z.enum(['VATSIM']).optional(),
    link: z.string().default(''),
    excerpt: z.string(),
  }),
});

const wiki = defineCollection({
  loader: glob({ pattern: ['*.ru.md', '*.en.md'], base: './src/content/wiki', generateId: keepLocaleSuffix }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['getting-started', 'flying', 'rules', 'software', 'atc']),
    order: z.number().default(0),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { news, events, wiki };
