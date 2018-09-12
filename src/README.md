# chemcalc-bot

> [Bot's link](http://telegram.me/chemcalc_bot)

Telegram bot to answer ChemCalc question and display isotopic distribution.

## Install

```bash
$ npm install
```

## Production

In order to be able to run this the `TELEGRAM_TOKEN` should be set to the token provided for Telegram

```bash
$ docker pull cheminfo/chemcalc-bot
$ docker run -it --env TELEGRAM_TOKEN=<your token here> cheminfo/chemcalc-bot
```

## Related documents
  - [Telegram Bot API](https://core.telegram.org/bots/api)
  - [Telegram Bot API for NodeJS](https://github.com/yagop/node-telegram-bot-api)
