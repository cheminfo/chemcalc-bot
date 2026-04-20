const url = 'http://www.chemcalc.org/analyse_content?mf=';

export function formatResult(mfInfo, link) {
  const result = [
    `*MF:* ${mfInfo.mf}`,
    `*MW:* ${mfInfo.mass.toFixed(2)}`,
    `*EM:* ${mfInfo.monoisotopicMass.toFixed(5)}`,
  ];

  if (mfInfo.observedMonoisotopicMass) {
    result.push(
      `*Exp.&nbsp;EM:* ${mfInfo.observedMonoisotopicMass.toFixed(5)}`,
    );
  }
  if (mfInfo.unsaturation) {
    result.push(`*Unsat.:* ${mfInfo.unsaturation}`);
  }
  if (mfInfo.ea) {
    result.push(' ', '*Element* \t *Mass* \t *Percent*');
    for (const ea of mfInfo.ea) {
      result.push(
        `${ea.element} \r\t ${ea.mass.toFixed(2)} \r\t ${(
          ea.ratio * 100
        ).toFixed(2)}%`,
      );
    }
  }

  if (link) {
    result.push(' ', `For more info click [here](${url}${mfInfo.mf})`);
  }

  return result.join('\n');
}
