/**
 * Team of SkyNational Community — shows on the About page.
 * TODO: описания ниже — рабочие заготовки; владелец пришлёт свои тексты.
 *
 * Фото: положи JPG в папку public/assets/team/ с именем <id>.jpg
 * (сейчас: nylev0y.jpg и helix.jpg) — карточки подхватят их автоматически.
 */

export interface TeamEntry {
  /** id — также имя файла фото: /assets/team/<id>.jpg */
  id: string;
  /** Роль (одинакова для ru/en, как в референсе). */
  role: string;
  /** Позывной / имя участника. */
  name: string;
  /** Краткое описание для карточки. */
  desc: { ru: string; en: string };
}

export const TEAM_MEMBERS: TeamEntry[] = [
  {
    id: 'nylev0y',
    role: 'Founder',
    name: 'Nylev0y',
    desc: {
      ru: 'Основал SkyNational и задаёт вектор развития сообщества: видение, культура полётов и главные проекты.',
      en: 'Founded SkyNational and sets the direction for the community: vision, flying culture and flagship projects.',
    },
  },
  {
    id: 'helix',
    role: 'CEO',
    name: 'Helix',
    desc: {
      ru: 'Руководит сообществом: стратегия, команда персонала и партнёрства в сети VATSIM.',
      en: 'Runs the community: strategy, the staff team and partnerships across the VATSIM network.',
    },
  },
];
