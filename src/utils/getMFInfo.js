import { IsotopicDistribution } from 'isotopic-distribution';
import { MF, ensureCase } from 'mf-parser';

export function getMFInfo(mfString) {
  const mf = new MF(ensureCase(mfString));
  const mfInfo = mf.getInfo();
  try {
    mfInfo.ea = mf.getEA();
  } catch {
    // elemental analysis is optional
  }
  try {
    mfInfo.isotopicDistribution = new IsotopicDistribution(mfInfo.mf).getPeaks({
      maxValue: 100,
    });
  } catch {
    // isotopic distribution is optional
  }

  return mfInfo;
}
