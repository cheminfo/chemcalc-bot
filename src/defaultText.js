import debugLib from 'debug';

import { formatResult } from './utils/formatResult.js';
import { generateIsotopicDistributionImage } from './utils/generateIsotopicDistributionImage.js';
import { getMFInfo } from './utils/getMFInfo.js';

const debug = debugLib('bot:defaultText');

export default function defaultText(bot) {
  // Not inline rendering
  // C10H12O3
  bot.onText(/(?<formula>^[^/@]+)/, async (msg, match) => {
    debug(`onText from: ${msg.from.id}`);
    const formula = match.groups.formula;
    debug(formula);
    const fromId = msg.from.id;
    try {
      const mfInfo = getMFInfo(formula);
      bot.sendMessage(fromId, formatResult(mfInfo, true), {
        // eslint-disable-next-line camelcase -- Telegram Bot API uses snake_case
        parse_mode: 'Markdown',
      });
      if (mfInfo.isotopicDistribution) {
        const buffer = await generateIsotopicDistributionImage(mfInfo);
        bot.sendPhoto(fromId, buffer);
      }
    } catch (error) {
      bot.sendMessage(fromId, error.message || String(error));
    }
  });
}
