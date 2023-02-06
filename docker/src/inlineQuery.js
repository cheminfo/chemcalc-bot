import chemcalcPkg from 'chemcalc';

import { formatChemcalcResult } from './formatChemcalcResult.js';

const { analyseMF } = chemcalcPkg;

export default function inlineQuery(bot) {
  // Inline rendering
  // @chemcalc_bot C10H12O3
  bot.on('inline_query', (msg) => {
    debug('inline_query');
    let ans, textResult;
    try {
      ans = analyseMF(msg.query, { isotopomers: 'arrayXYXY' });
      textResult = formatChemcalcResult(ans, true, false);
    } catch (error) {
      if (error.b === 'Isotopic distribution: empty table') {
        ans = analyseMF(msg.query);
        textResult = formatChemcalcResult(ans, true, true);
      } else {
        ans = { mv: 'not found' };
        textResult = error.b;
      }
    }

    bot.answerInlineQuery(msg.id, [
      {
        type: 'article',
        id: '1',
        title: `${msg.query} - mw: ${ans.mw}`,
        input_message_content: {
          message_text: msg.query ? textResult : 'Molecular formula not given',
          parse_mode: 'Markdown',
        },
      },
    ]);
  });
}
