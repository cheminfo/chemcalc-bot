import chemcalcPkg from 'chemcalc';
import debugLib from 'debug';

import { formatChemcalcResult } from './formatChemcalcResult.js';
import { generateIsotopicDistributionImage } from './generateIsotopicDistributionImage.js';
import { processMF } from './processMF.js';

const { analyseMF } = chemcalcPkg;

const debug = debugLib('defaultText');

export default function defaultText(bot) {
  // Not inline rendering
  // C10H12O3
  bot.onText(/(^[^\/@]+)/, (msg, match) => {
    debug(`onText from: ${msg.from.id}`);
    debug(match[1]);
    // formula calculation
    let fromId = msg.from.id;
    let result;
    try {
      result = processMF(match[1]);
      bot.sendMessage(fromId, result.data, { parse_mode: 'Markdown' });

      // image rendering
      generateIsotopicDistributionImage(result, fromId, (err) => {
        if (err) console.error(err);
        bot.sendPhoto(fromId, `${fromId}.png`);
      });
    } catch (error) {
      if (error.b === 'Isotopic distribution: empty table') {
        bot.sendMessage(
          fromId,
          formatChemcalcResult(analyseMF(match[1]), false, true),
          { parse_mode: 'Markdown' },
        );
      } else {
        bot.sendMessage(fromId, error.b);
      }
    }
  });
}
