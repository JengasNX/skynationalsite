/**
 * Open positions of SkyNational Community.
 * TODO: описания ниже — рабочие заготовки; владелец проекта пришлёт свои формулировки,
 * менять нужно только поля ru/en в этом файле.
 */

export type Localized = { ru: string; en: string };

export type Vacancy = {
  code: string;
  title: Localized;
  summary: Localized;
  responsibilities: { ru: string[]; en: string[] };
  requirements: { ru: string[]; en: string[] };
  open: boolean;
};

export const VACANCIES: Vacancy[] = [
  {
    code: 'CFO',
    title: { ru: 'Главный финансовый директор', en: 'Chief Financial Officer' },
    summary: {
      ru: 'Отвечает за финансовый контур сообщества: бюджет, расходы на инфраструктуру и прозрачную отчётность.',
      en: 'Runs the financial side of the community: budget, infrastructure spending and transparent reporting.',
    },
    responsibilities: {
      ru: [
        'Ведение бюджета сообщества и регулярная финансовая отчётность',
        'Управление расходами на серверы, домены и лицензии',
        'Прозрачность: отчёты для участников сообщества',
        'Финансовая стратегия на год',
      ],
      en: [
        'Maintaining the community budget and regular financial reports',
        'Managing spending on servers, domains and licences',
        'Transparency: reports shared with the community',
        'Annual financial strategy',
      ],
    },
    requirements: {
      ru: [
        'Опыт работы с бюджетом и отчётностью',
        'Внимательность и аккуратность с цифрами',
        'Базовое понимание бухгалтерии',
        'Готовность к регулярным отчётам',
      ],
      en: [
        'Experience with budgets and reporting',
        'Precision and attention to detail',
        'Basic accounting understanding',
        'Willingness to report regularly',
      ],
    },
    open: true,
  },
  {
    code: 'CCO',
    title: { ru: 'Коммерческий директор', en: 'Chief Commercial Officer' },
    summary: {
      ru: 'Развитие партнёрств, продвижение сообщества и работа с внешними проектами.',
      en: 'Partnerships, promotion of the community and cooperation with external projects.',
    },
    responsibilities: {
      ru: [
        'Поиск и сопровождение партнёрств с другими сообществами',
        'Продвижение SkyNational на площадках VATSIM и IVAO',
        'Условия сотрудничества и обменные программы',
        'Аналитика роста и эффективности каналов',
      ],
      en: [
        'Finding and maintaining partnerships with other communities',
        'Promoting SkyNational across VATSIM and IVAO',
        'Cooperation terms and exchange programmes',
        'Growth analytics for every channel',
      ],
    },
    requirements: {
      ru: [
        'Опыт в маркетинге или партнёрских программах',
        'Умение вести переговоры и грамотно излагать мысли',
        'Рабочий английский язык',
        'Понимание культуры виртуальной авиации',
      ],
      en: [
        'Experience in marketing or partnership programmes',
        'Negotiation and communication skills',
        'Working English',
        'Understanding of virtual aviation culture',
      ],
    },
    open: true,
  },
  {
    code: 'CGO',
    title: { ru: 'Директор по росту', en: 'Chief Growth Officer' },
    summary: {
      ru: 'Приток новых участников и их путь от первой заявки до активного члена сообщества.',
      en: 'Bringing new members in and guiding them from the first application to an active member.',
    },
    responsibilities: {
      ru: [
        'Стратегия привлечения новых пилотов',
        'Онбординг: сопровождение новичков первые недели',
        'Активности, удержание и вовлечённость участников',
        'Метрики роста и отчётность',
      ],
      en: [
        'Strategy for attracting new pilots',
        'Onboarding: supporting newcomers in their first weeks',
        'Activities, retention and member engagement',
        'Growth metrics and reporting',
      ],
    },
    requirements: {
      ru: [
        'Опыт в комьюнити-менеджменте',
        'Терпение и готовность помогать новичкам',
        'Организованность',
        'Знание VATSIM глазами новичка',
      ],
      en: [
        'Community management experience',
        'Patience and a genuine wish to help newcomers',
        'Organisation',
        'Knowledge of VATSIM from a beginner’s perspective',
      ],
    },
    open: true,
  },
  {
    code: 'CSO',
    title: { ru: 'Директор по безопасности', en: 'Chief Security Officer' },
    summary: {
      ru: 'Безопасность сервера и данных участников, разбор инцидентов и защита от злоупотреблений.',
      en: 'Server and member data safety, incident handling and protection from abuse.',
    },
    responsibilities: {
      ru: [
        'Настройка ролей и прав доступа в Discord',
        'Мониторинг подозрительной активности',
        'Реагирование на инциденты и разбор нарушений',
        'Хранение и защита персональных данных участников',
      ],
      en: [
        'Configuring Discord roles and permissions',
        'Monitoring for suspicious activity',
        'Incident response and violation handling',
        'Keeping member personal data safe',
      ],
    },
    requirements: {
      ru: [
        'Опыт администрирования Discord-серверов',
        'Знание принципов модерации и правил сетей',
        'Спокойствие и непредвзятость',
        'Доступность при инцидентах',
      ],
      en: [
        'Experience administering Discord servers',
        'Knowledge of moderation principles and network rules',
        'A calm, unbiased attitude',
        'Availability when incidents happen',
      ],
    },
    open: true,
  },
  {
    code: 'CHO',
    title: { ru: 'Директор по работе с людьми', en: 'Chief Human Officer' },
    summary: {
      ru: 'Набор, адаптация и работа с командой: климат, роли и обратная связь.',
      en: 'Hiring, onboarding and working with the team: climate, roles and feedback.',
    },
    responsibilities: {
      ru: [
        'Проведение собеседований и набор команды',
        'Адаптация новых членов команды',
        'Климат, обратная связь и разбор конфликтов',
        'Ведение кадровой документации сообщества',
      ],
      en: [
        'Running interviews and hiring the team',
        'Onboarding new team members',
        'Team climate, feedback and conflict resolution',
        'Keeping the community’s people records',
      ],
    },
    requirements: {
      ru: [
        'Опыт в HR или работе с командой',
        'Эмпатия и такт',
        'Умение слушать и формулировать ожидания',
        'Конфиденциальность',
      ],
      en: [
        'HR or team-management experience',
        'Empathy and tact',
        'Listening skills and clear expectations',
        'Discretion',
      ],
    },
    open: true,
  },
  {
    code: 'CDO',
    title: { ru: 'Директор по развитию', en: 'Chief Development Officer' },
    summary: {
      ru: 'Развитие проектов и инфраструктуры: сайт, боты и инструменты сообщества.',
      en: 'Developing projects and infrastructure: the website, bots and community tools.',
    },
    responsibilities: {
      ru: [
        'Развитие цифровых проектов сообщества',
        'Дорожная карта инструментов и интеграций',
        'Координация разработчиков и приёмка изменений',
        'Поддержка и обновление инфраструктуры',
      ],
      en: [
        'Growing the community’s digital projects',
        'Roadmap for tools and integrations',
        'Coordinating developers and reviewing changes',
        'Maintaining and updating infrastructure',
      ],
    },
    requirements: {
      ru: [
        'Понимание веб-разработки и основ DevOps',
        'Опыт управления проектами',
        'Готовность читать и ревьюить код',
        'Английский для чтения документации',
      ],
      en: [
        'Understanding of web development and DevOps basics',
        'Project management experience',
        'Willingness to read and review code',
        'English for reading documentation',
      ],
    },
    open: true,
  },
  {
    code: 'CUR',
    title: { ru: 'Куратор администрации и модерации', en: 'Curator ADM/MODR' },
    summary: {
      ru: 'Курирует работу администрации и модераторов: задачи, качество, эскалации.',
      en: 'Oversees the administration and moderation teams: tasks, quality and escalations.',
    },
    responsibilities: {
      ru: [
        'Постановка задач для команды модерации',
        'Контроль качества обработки обращений',
        'Эскалация сложных ситуаций руководству',
        'Обучение и онбординг модераторов',
      ],
      en: [
        'Setting tasks for the moderation team',
        'Quality control of how requests are handled',
        'Escalating difficult cases to leadership',
        'Training and onboarding moderators',
      ],
    },
    requirements: {
      ru: [
        'Опыт модерации в Discord',
        'Организаторские навыки',
        'Знание регламентов сообщества и сетей',
        'Ответственность',
      ],
      en: [
        'Moderation experience on Discord',
        'Organisational skills',
        'Knowledge of community and network rules',
        'Sense of responsibility',
      ],
    },
    open: true,
  },
  {
    code: 'SUP',
    title: { ru: 'Служба поддержки (тикеты)', en: 'Support-Ticket' },
    summary: {
      ru: 'Первая линия поддержки участников: тикеты, вопросы и помощь по шагам.',
      en: 'First line of member support: tickets, questions and step-by-step help.',
    },
    responsibilities: {
      ru: [
        'Обработка тикетов в системе поддержки',
        'Ответы на вопросы участников',
        'Передача технических проблем разработчикам',
        'Ведение базы типовых ответов',
      ],
      en: [
        'Processing support tickets',
        'Answering member questions',
        'Passing technical issues to developers',
        'Keeping a knowledge base of standard answers',
      ],
    },
    requirements: {
      ru: [
        'Дружелюбное и чёткое общение',
        'Готовость отвечать регулярно',
        'Базовое знание VATSIM и софта',
        'Английский приветствуется',
      ],
      en: [
        'Friendly and clear communication',
        'Readiness to answer regularly',
        'Basic knowledge of VATSIM and the software',
        'English is a plus',
      ],
    },
    open: true,
  },
  {
    code: 'SCD',
    title: { ru: 'Модератор', en: 'Moderator' },
    summary: {
      ru: 'Следит за порядком в каналах, помогает новичкам и применяет регламент.',
      en: 'Keeps order in the channels, helps newcomers and applies the rules.',
    },
    responsibilities: {
      ru: [
        'Модерация каналов Discord',
        'Помощь новичкам с базовыми вопросами',
        'Фиксация нарушений и применение регламента',
        'Участие в разборе конфликтов',
      ],
      en: [
        'Moderating the Discord channels',
        'Helping newcomers with basic questions',
        'Recording violations and applying the rules',
        'Taking part in conflict resolution',
      ],
    },
    requirements: {
      ru: [
        'Знание правил сообщества',
        'Спокойная манера общения',
        'Активность в сети',
        'Честность и непредвзятость',
      ],
      en: [
        'Knowledge of community rules',
        'A calm manner of communication',
        'Being active online',
        'Honesty and impartiality',
      ],
    },
    open: true,
  },
];

export type TeamMember = {
  role: string;
  name: Localized;
  note: Localized;
};

/** TODO: заполнить реальными участниками команды, когда владелец пришлёт данные. */
export const TEAM: TeamMember[] = [];
