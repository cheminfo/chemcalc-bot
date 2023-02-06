import debugLib from 'debug';

import { formatResult } from './utils/formatResult.js';
import { generateIsotopicDistributionImage } from './utils/generateIsotopicDistributionImage.js';
import { getMFInfo } from './utils/getMFInfo.js';

const debug = debugLib('bot:defaultText');

export default function defaultText(bot) {
  // Not inline rendering
  // C10H12O3
  bot.onText(/(^[^\/@]+)/, (msg, match) => {
    debug(`onText from: ${msg.from.id}`);
    debug(match[1]);
    // formula calculation
    let fromId = msg.from.id;
    let mfInfo;
    try {
      mfInfo = getMFInfo(match[1]);
      bot.sendMessage(fromId, formatResult(mfInfo, true), {
        parse_mode: 'Markdown',
      });
      if (mfInfo.isotopicDistribution) {
        // image rendering
        generateIsotopicDistributionImage(mfInfo, fromId, (err) => {
          if (err) console.error(err);
          bot.sendPhoto(fromId, `${fromId}.png`);
        });
      }
    } catch (error) {
      bot.sendMessage(fromId, error);
    }
  });
}
