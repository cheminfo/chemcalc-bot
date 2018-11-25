'use strict';

const analyseMF = require('chemcalc').analyseMF;
const processMF = require('./processMF');
const gnuplot = require('gnuplot');
const fs = require('fs');

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;

let bot = new TelegramBot(token, { polling: true });

// A very polite bot
bot.getMe().then(me => {
  console.log('Hi my name is %s!', me.username);
});

// Inline rendering
// @chemcalc_bot C10H12O3
bot.on('inline_query', msg => {
  let ans, res_text;
  try {
    ans = analyseMF(msg.query, { isotopomers: 'arrayXYXY' });
    res_text = formatChemcalcResult(ans, true, false);
  } catch (error) {
    if (error.b === 'Isotopic distribution: empty table') {
      ans = analyseMF(msg.query);
      res_text = formatChemcalcResult(ans, true, true);
    } else {
      ans = { mv: 'not found' };
      res_text = error.b;
    }
  }

  bot.answerInlineQuery(msg.id, [
    {
      type: 'article',
      id: '1',
      title: msg.query + ' - mw: ' + ans.mw,
      input_message_content: {
        message_text: msg.query ? res_text : 'Molecular formula not given',
        parse_mode: 'Markdown'
      }
    }
  ]);
});

// Not inline rendering
// C10H12O3
bot.onText(/(^[^\/@]+)/, (msg, match) => {
  // formula calculation
  let fromId = msg.from.id;
  let result;
  try {
    result = processMF(match[1]);
    bot.sendMessage(fromId, result.data, { parse_mode: 'Markdown' });

    // image rendering
    img_generation(result, fromId, err => {
      if (err) console.error(err);
      bot.sendPhoto(fromId, fromId + '.png');
    });
  } catch (error) {
    if (error.b === 'Isotopic distribution: empty table') {
      bot.sendMessage(
        fromId,
        formatChemcalcResult(analyseMF(match[1]), false, true),
        { parse_mode: 'Markdown' }
      );
    } else {
      bot.sendMessage(fromId, error.b);
    }
  }
});

/**
 * Generates an Isotopic distribution image
 * @param {object} result - resulting object of the che_calc function
 * @param {number} fromId - id of the user that requested the formula
 * @param {function} callback what to do when the img is generated
 */
function img_generation(result, fromId, callback) {
  let out = fs.createWriteStream(fromId + '.png');
  let plot = gnuplot()
    .set('terminal png medium size 400,300')
    .set('title "Isotopic distribution"')
    .unset('key') // no legend
    .set('border 3')
    .set('xlabel "m/z (Da)"')
    .set('ylabel "Intensity (%)"')
    .set('ytics nomirror') // hide ticks left
    .set('xtics nomirror') // hide ticks top
    .set('grid xtics lw 1 lc rgb "#dddddd"')
    .set('grid ytics lw 1 lc rgb "#dddddd"')
    .set('xrange [' + result.chartXFrom + ':' + result.chartXTo + ']')
    .set('yrange [0:120]');

  result.xy.forEach(point => {
    plot.set(
      'arrow from ' +
        point[0] +
        ',0 to ' +
        point[0] +
        ',' +
        point[1] * 100 +
        ' nohead lw 2 lc rgb "blue"'
    );
  });
  plot.plot('sin(x) lc rgb "white"', { end: true }).pipe(out);

  out.on('finish', callback);
}
