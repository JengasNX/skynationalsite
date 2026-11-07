# SkyNational Community — сайт

Статический сайт виртуального авиасообщества SkyNational на [Astro 5](https://astro.build) с TypeScript, i18n (ru/en) и деплоем на GitHub Pages.

- Репозиторий: `JengasAdmin/skynationalsite`
- Адрес: https://jengasadmin.github.io/skynationalsite/

Весь сайт собирается в обычные статические файлы (`dist/`), сервер не нужен.

## Команды

```bash
npm install       # установка зависимостей
npm run dev       # локальный дев-сервер (http://localhost:4321)
npm run build     # production-сборка в dist/
npm run preview   # локальный просмотр собранного сайта
npm run assets    # перегенерация оптимизированных картинок из assets-source
```

`npm run assets` запускает `scripts/optimize-assets.mjs`: берёт исходники из `assets-source/`, кладёт результат в `public/assets/`. Запускайте после замены исходных изображений.

## Как добавить новость или событие

Каждая публикация — это пара markdown-файлов: `<slug>.ru.md` и `<slug>.en.md` с одинаковым слагом.

### Новость — `src/content/news/<slug>.ru.md` + `<slug>.en.md`

```yaml
---
title: Заголовок новости
date: 2026-10-01          # YYYY-MM-DD
tags: [updates]           # теги из списка ниже
cover: /assets/news/cover.jpg
excerpt: Краткое описание для карточки.
---

Текст новости в Markdown.
```

Поля frontmatter:

| Поле | Описание |
|---|---|
| `title` | Заголовок новости |
| `date` | Дата публикации, `YYYY-MM-DD` |
| `tags` | Массив тегов: `updates`, `events`, `recruitment`, `community` |
| `cover` | Путь к обложке в `public/` (например `/assets/news/cover.jpg`) |
| `excerpt` | Краткое описание для карточки в списке |

### Событие — `src/content/events/<slug>.ru.md` + `<slug>.en.md`

```yaml
---
title: Групповой полёт UUEE → EHAM
date: 2026-10-17T18:00:00+03:00   # ISO 8601 с таймзоной
timezone: Europe/Moscow            # IANA-идентификатор часового пояса
type: group-flight                 # тип события
route: UUEE — EHAM
network: VATSIM                    # сеть полёта
link: https://discord.gg/...       # ссылка на Discord-ивент (необязательно)
excerpt: Краткое описание события.
---

Подробности события в Markdown.
```

Поля frontmatter:

| Поле | Описание |
|---|---|
| `title` | Название события |
| `date` | Дата и время старта в ISO-формате с указанием таймзоны |
| `timezone` | Часовой пояс события (IANA), например `Europe/Moscow` |
| `type` | Тип: `group-flight` (групповой полёт), `training` (тренировка), `meetup` (встреча) |
| `route` | Маршрут, например `UUEE — EHAM` |
| `network` | Сеть: `VATSIM` |
| `link` | Внешняя ссылка на ивент (необязательно) |
| `excerpt` | Краткое описание для карточки |

После добавления обеих версий страница события сгенерируется автоматически при сборке.

## Как добавить статью wiki

Файлы в `src/content/wiki/`: `<slug>.ru.md` + `<slug>.en.md`.

```yaml
---
title: Планирование полёта
category: flying          # раздел wiki
order: 2                  # порядок внутри раздела, по возрастанию
excerpt: Краткое описание статьи.
---

Текст статьи в Markdown.
```

Поля frontmatter:

| Поле | Описание |
|---|---|
| `title` | Заголовок статьи |
| `category` | Раздел: `getting-started`, `flying`, `rules`, `software`, `atc` |
| `order` | Порядок сортировки внутри раздела (по возрастанию) |
| `excerpt` | Краткое описание для карточки wiki |

## Где что настраивать

- **`src/config.ts`** — центральная конфигурация:
  - `SITE` — имя, адрес сайта, описание, тэглайны;
  - `DISCORD` — `guildId` (включает счётчик онлайна на сайте), `invite` (ссылка на сервер из кнопок), `webhookUrl` (куда уходят заявки из формы «Присоединиться»), `mentionRoleId` (упоминание роли в сообщении заявки);
  - `SOCIALS` — внешние ссылки (соцсети, Telegram и т.п.).
- **`src/data/vacancies.ts`** — список вакансий и состав команды.
- **`src/data/gallery.ts`** — галерея (список изображений с подписями).
- **`src/i18n/ru.ts` и `src/i18n/en.ts`** — весь текст интерфейса: названия разделов, кнопки, формы, мета-тексты. Новый текст добавляйте в оба файла.

## Важно: про Discord-вебхук

Форма заявки работает без сервера: данные отправляются прямо из браузера в Discord-вебхук. Это значит, что **URL вебхука виден в клиентском бандле** — любой может его найти и слать спам.

Если вебхук заспамили:

1. Откройте настройки Discord-канала → Интеграции → Вебхуки → удалите старый и создайте новый (перевыпуск URL).
2. Обновите `webhookUrl` в `src/config.ts`.
3. Запушьте изменения — сайт пересоберётся.

## Деплой

Автодеплой на GitHub Pages через GitHub Actions: пуш в ветку `main` запускает workflow `.github/workflows/deploy.yml`, который ставит зависимости, собирает сайт и публикует `dist/`.

Перед первым деплоем в репозитории: **Settings → Pages → Source: GitHub Actions**.

## Стек

- **Astro 5** + TypeScript — генерация статики;
- **MiniSearch** — поиск по сайту (новости, wiki, страницы) прямо в браузере;
- **Inter** — шрифт, self-hosted через `@fontsource-variable/inter` (без внешних CDN);
- **@astrojs/sitemap** — генерация sitemap.xml.
