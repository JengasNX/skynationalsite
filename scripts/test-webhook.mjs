/**
 * One-off test: posts a test embed to the site webhook to verify it works.
 * Run: node scripts/test-webhook.mjs
 */
const WEBHOOK = process.argv[2];
if (!WEBHOOK) {
  console.error('usage: node scripts/test-webhook.mjs <webhook-url>');
  process.exit(1);
}

const res = await fetch(WEBHOOK, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'SkyNational · Applications',
    embeds: [
      {
        title: 'Тестовая заявка · Проверка вебхука',
        color: 0x1a53d8,
        fields: [
          { name: 'Discord', value: 'test_user', inline: true },
          { name: 'Возраст', value: '21', inline: true },
          { name: 'Часовой пояс', value: 'UTC+3', inline: true },
          { name: 'Опыт и налёт', value: 'MSFS, ~120 ч на VATSIM' },
          { name: 'Мотивация', value: 'Автотест формы /join/ — можно удалить это сообщение.' },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  }),
});

console.log('status:', res.status);
const text = await res.text();
if (text) console.log(text);
