# chemcalc-bot

> [Bot's link](http://telegram.me/chemcalc_bot)

Telegram bot that answers ChemCalc questions and renders isotopic distributions.

## Deployment with Docker

```bash
cp .env.example .env
# edit .env and set TELEGRAM_TOKEN to the value given by @BotFather
cp compose.example.yaml compose.yaml
docker compose pull && docker compose up -d
```

To build the image from the current checkout instead of pulling the published one:

```bash
docker compose up -d --build
```

## Local development

```bash
npm install
cp .env.example .env
# edit .env and set TELEGRAM_TOKEN
npm run dev
```

`TELEGRAM_TOKEN` is read from the process environment. `npm run dev` and `npm start` use Node's `--env-file-if-exists=.env` flag, so the local `.env` file is loaded automatically. In Docker, the same values are injected by the `env_file` directive in compose — no `.env` file is present inside the container, which is why `-if-exists` is used.

## Related

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
