/**
 * One-off test: posts a test embed to the site webhook to verify it works.
 * Includes the user-mention content line, exactly like the real form does.
 * Run: node scripts/test-webhook.mjs <webhook-url>
 */
const WEBHOOK = process.argv[2];
if (!WEBHOOK) {
  console.error('usage: node scripts/test-webhook.mjs <webhook-url>');
  process.exit(1);
}

const MENTION_USERS = ['1101502940314878092', '1226424162307014688'];

const content = MENTION_USERS.map((id) => '<@' + id + '>').join(' ');

const res = await fetch(WEBHOOK, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'SkyNational · Applications',
    content,
    embeds: [
      {
        title: 'Новая заявка · Тест упоминаний',
        color: 0x1a53d8,
        fields: [
          { name: 'Discord', value: 'test_user', inline: true },
          { name: 'Возраст', value: '20', inline: true },
          { name: 'Часовой пояс', value: 'UTC+3', inline: true },
          { name: 'Опыт и налёт', value: 'Автотест — сообщение можно удалить' },
          { name: 'Мотивация', value: 'Проверка пинга двух пользователей при новой заявке.' },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  }),
});

console.log('status:', res.status);
const text = await res.text();
if (text) console.log(text);
