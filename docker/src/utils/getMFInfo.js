import { IsotopicDistribution } from 'isotopic-distribution';
import { ensureCase, MF } from 'mf-parser';

export function getMFInfo(mfString) {
  const mf = new MF(ensureCase(mfString));
  let mfInfo = mf.getInfo();
  try {
    mfInfo.ea = mf.getEA();
  } catch (e) {}
  try {
    mfInfo.isotopicDistribution = new IsotopicDistribution(mfInfo.mf).getPeaks({
      maxValue: 100,
    });
  } catch (e) {}

  return mfInfo;
}
