import chemcalcPkg from 'chemcalc';

const { analyseMF } = chemcalcPkg;

const url = 'https://www.chemcalc.org/analyse_content?mf=';

/**
 * Make the MF analysis
 * @param  {string} formula chemical formula
 * @return {object} formated result, x values and y values
 */
export function processMF(formula) {
  let result = analyseMF(formula, { isotopomers: 'arrayXYXY' });
  let xy = result.arrayXYXY;
  let chartXFrom = Math.floor(xy[0][0]) - 2;
  let chartXTo = Math.ceil(xy[xy.length - 1][0]) + 2;

  return {
    data: formatResult(result, false, false),
    xy,
    chartXFrom,
    chartXTo,
  };
}

function formatResult(chemcalcResult, link, emptyTable) {
  let result = [];
  result.push(`*MF:* ${chemcalcResult.mf}`);
  result.push(`*MW:* ${chemcalcResult.mw}`);
  result.push(`*EM:* ${chemcalcResult.em.toFixed(5)}`);

  if (chemcalcResult.parts && chemcalcResult.parts.length == 1) {
    if (
      chemcalcResult.parts[0].msem &&
      chemcalcResult.parts[0].msem != chemcalcResult.em
    ) {
      result.push(`*Exp.&nbsp;EM:* ${chemcalcResult.parts[0].msem.toFixed(5)}`);
    }
    if (chemcalcResult.parts[0].unsaturation) {
      result.push(`*Unsat.:* ${chemcalcResult.parts[0].unsaturation}`);
    }
  }

  if (chemcalcResult.parts.length == 1) {
    // Elemental analysis
    result.push(' ');
    result.push('*Element* \t *Count* \t *Percent*');
    for (let i = 0; i < chemcalcResult.parts[0].ea.length; ++i) {
      result.push(
        `${chemcalcResult.parts[0].ea[i].element} \r\t ${
          chemcalcResult.parts[0].ea[i].number
        } \r\t ${chemcalcResult.parts[0].ea[i].percentage.toFixed(3)}%`,
      );
    }
  }

  if (link) {
    result.push(' ');
    result.push(`For more info click [here](${url}${chemcalcResult.mf})`);
  }

  if (emptyTable) {
    result.push(' ');
    result.push('_Isotopic distribution not found_');
  }

  return result.join('\r\n');
}
