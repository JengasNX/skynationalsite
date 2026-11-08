/**
 * Global site configuration.
 * TODO-поля помечены комментарием — владелец проекта пришлёт реальные значения.
 */

export const SITE = {
  name: 'SkyNational Community',
  shortName: 'SkyNational',
  code: 'SKN',
  repo: 'JengasNX/skynationalsite',
  url: 'https://jengasnx.github.io/skynationalsite',
  tagline: {
    ru: 'Авиасообщество пилотов VATSIM',
    en: 'VATSIM pilots community',
  },
  description: {
    ru: 'SkyNational: сообщество виртуальных пилотов VATSIM. Совместные полёты, обучение новичков и живое комьюнити.',
    en: 'SkyNational: a community for VATSIM pilots. Group flights, pilot training and a lively community.',
  },
  about: {
    ru: 'SkyNational, сообщество пилотов VATSIM. Мы летаем вместе, разбираем полёты и помогаем новичкам спокойно выйти в сеть: без гонки за звёздами, с понятными правилами и поддержкой на каждом шаге.',
    en: 'SkyNational is a community for VATSIM pilots. We fly together, review our flights and help newcomers get online with confidence: clear rules and support at every step.',
  },
  networks: ['VATSIM'],
} as const;

/**
 * Заявки на события сейчас отключены: на сайте показывается
 * «событий не ожидается», а содержимое events остаётся в контенте
 * на будущее. Переключите в true, когда появятся реальные слоты.
 */
export const EVENTS_ENABLED = false;

export const DISCORD = {
  /** ID сервера Discord — включает счётчик онлайна на сайте */
  guildId: '',
  /** Ссылка-инвайт на сервер Discord */
  invite: 'https://discord.gg/9dddBQ35JC',
  /** TODO: URL вебхука, куда уходят заявки из формы «Присоединиться» */
  webhookUrl: '',
  /** TODO: ID роли, которую нужно упомянуть в заявке (необязательно) */
  mentionRoleId: '',
} as const;

export type Social = {
  id: string;
  label: string;
  /** TODO: заполнить реальными ссылками */
  url: string;
};

/**
 * Аналитика, нагруженная только после согласия в cookie-баннере.
 * Google Analytics 4 (обезличенный IP), ID веб-потока SkyNational.
 */
export const ANALYTICS = {
  provider: 'ga4' as 'ga4',
  id: 'G-2RJZV0FYWM',
};

export const SOCIALS: Social[] = [
  { id: 'discord', label: 'Discord', url: DISCORD.invite },
  { id: 'telegram', label: 'Telegram', url: '' },
  { id: 'vatsim', label: 'VATSIM', url: 'https://www.vatsim.net' },
  { id: 'youtube', label: 'YouTube', url: '' },
  { id: 'twitch', label: 'Twitch', url: '' },
];

/** Only the links that are actually configured (used in the footer). */
export const SOCIALS_ACTIVE: Social[] = SOCIALS.filter((s) => s.url.trim().length > 0);
