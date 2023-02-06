import debugLib from 'debug';

import { formatResult } from './utils/formatResult.js';
import { getMFInfo } from './utils/getMFInfo.js';

const debug = debugLib('bot:inLineQuery');

export default function inlineQuery(bot) {
  // Inline rendering
  // @chemcalc_bot C10H12O3
  bot.on('inline_query', (msg) => {
    debug('inline_query');
    let mfInfo, textResult;
    try {
      mfInfo = getMFInfo(msg.query);
      textResult = formatResult(mfInfo, true);
    } catch (error) {
      textResult = error.toString();
    }

    bot.answerInlineQuery(msg.id, [
      {
        type: 'article',
        id: '1',
        title:
          (mfInfo?.mf || msg.query) +
          (mfInfo ? ` - mw: ${mfInfo.mass.toFixed(2)}` : ' - error'),
        input_message_content: {
          message_text: msg.query ? textResult : 'Molecular formula not given',
          parse_mode: 'Markdown',
        },
      },
    ]);
  });
}
