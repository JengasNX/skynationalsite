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
    ru: 'Международное авиационное сообщество пилотов',
    en: 'International community of virtual pilots',
  },
  description: {
    ru: 'SkyNational — международное авиационное сообщество для пилотов VATSIM, энтузиастов авиации и всех, кто мечтает о небе.',
    en: 'SkyNational is an international aviation community for VATSIM pilots, aviation enthusiasts and everyone who dreams of the sky.',
  },
  about: {
    ru: 'SkyNational — это международное авиационное сообщество, созданное для пилотов VATSIM, энтузиастов авиации и всех, кто мечтает о небе. Мы объединяем людей с разных концов света — от начинающих виртуальных пилотов до опытных пилотов, которые знают, как управлять самолётом в сложных ситуациях.',
    en: 'SkyNational is an international aviation community created for VATSIM pilots, aviation enthusiasts and everyone who dreams of the sky. We bring together people from all over the world — from beginner virtual pilots to experienced pilots who know how to handle an aircraft in difficult situations.',
  },
  networks: ['VATSIM', 'IVAO'],
} as const;

export const DISCORD = {
  /** TODO: ID сервера Discord — включает счётчик онлайна на сайте */
  guildId: '',
  /** TODO: ссылка-инвайт на сервер Discord */
  invite: '',
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

export const SOCIALS: Social[] = [
  { id: 'discord', label: 'Discord', url: DISCORD.invite },
  { id: 'telegram', label: 'Telegram', url: '' },
  { id: 'vatsim', label: 'VATSIM', url: 'https://www.vatsim.net' },
  { id: 'ivao', label: 'IVAO', url: 'https://www.ivao.aero' },
  { id: 'youtube', label: 'YouTube', url: '' },
  { id: 'twitch', label: 'Twitch', url: '' },
];

/** Only the links that are actually configured (used in the footer). */
export const SOCIALS_ACTIVE: Social[] = SOCIALS.filter((s) => s.url.trim().length > 0);
