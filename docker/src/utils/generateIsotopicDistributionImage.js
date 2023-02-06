import { createWriteStream } from 'fs';

import gnuplot from 'gnuplot';

/**
 * Generates an Isotopic distribution image
 * @param {object} result - resulting object of the che_calc function
 * @param {number} fromId - id of the user that requested the formula
 * @param {function} callback what to do when the img is generated
 */
export function generateIsotopicDistributionImage(result, fromId, callback) {
  const peaks = result.isotopicDistribution;
  const xs = peaks.map((point) => point.x);
  const xMin = Math.min(...xs) - 1;
  const xMax = Math.max(...xs) + 1;

  let out = createWriteStream(`${fromId}.png`);
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
    .set(`xrange [${xMin}:${xMax}]`)
    .set('yrange [0:120]');

  peaks.forEach((point) => {
    plot.set(
      `arrow from ${point.x},0 to ${point.x},${point.y} nohead lw 2 lc rgb "blue"`,
    );
  });
  plot.plot('sin(x) lc rgb "white"', { end: true }).pipe(out);

  out.on('finish', callback);
}
