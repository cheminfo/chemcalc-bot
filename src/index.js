import debugLib from 'debug';
import TelegramBot from 'node-telegram-bot-api';

import defaultText from './defaultText.js';
import inlineQuery from './inlineQuery.js';
import loadCommands from './loadCommands.js';

const token = process.env.TELEGRAM_TOKEN;
if (!token) {
  throw new Error('TELEGRAM_TOKEN environment variable is required');
}

const debug = debugLib('bot:index');

const bot = new TelegramBot(token, { polling: true });

await loadCommands(bot);

defaultText(bot);

inlineQuery(bot);

const me = await bot.getMe();
if (!me.supports_inline_queries) {
  debug(
    'Bot is currently not supporting supports_inline_queries. To enable this option, send the /setinline command to @BotFather ',
  );
}
debug('Hi my name is %s !', me.username);
