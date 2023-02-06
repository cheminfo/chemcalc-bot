import debugLib from 'debug';
import TelegramBot from 'node-telegram-bot-api';

import defaultText from './defaultText.js';
import inlineQuery from './inlineQuery.js';
import loadCommands from './loadCommands.js';

const token = process.env.TELEGRAM_TOKEN;

const debug = debugLib('bot:index');

let bot = new TelegramBot(token, { polling: true });

await loadCommands(bot);

defaultText(bot);

inlineQuery(bot);

// A very polite bot
bot.getMe().then((me) => {
  if (!me.supports_inline_queries) {
    debug(
      'Bot is currently not supporting supports_inline_queries. To enable this option, send the /setinline command to @BotFather ',
    );
  }
  debug('Hi my name is %s !', me.username);
});
