'use strict';

const url = 'http://www.chemcalc.org/analyse_content?mf='

module.exports = (chemcalcResult, link) => {
    let result=[];
    result.push('*MF:*' + chemcalcResult.mf);
    result.push('*MW:*' + chemcalcResult.mw);
    result.push('*EM:*' + chemcalcResult.em.toFixed(5));

    if (chemcalcResult.parts && chemcalcResult.parts.length == 1) {
        if (chemcalcResult.parts[0].msem && chemcalcResult.parts[0].msem != chemcalcResult.em) {
            result.push('*Exp.&nbsp;EM:*' + chemcalcResult.parts[0].msem.toFixed(5));
        }
        if (chemcalcResult.parts[0].unsaturation) {
            result.push('*Unsat.:*' + chemcalcResult.parts[0].unsaturation);
        }
    }

    if (chemcalcResult.parts.length == 1) { // Elemental analysis
        result.push(' ');
        result.push('*Element* \t *Count* \t *Percent*');
        for (let i = 0; i < chemcalcResult.parts[0].ea.length; ++i) {
            result.push(chemcalcResult.parts[0].ea[i].element + ' \r\t ' + chemcalcResult.parts[0].ea[i].number
                + ' \r\t ' + chemcalcResult.parts[0].ea[i].percentage.toFixed(3) + '%');
        }
    }

    if (link) {
        result.push(' ');
        result.push('For more info click [here](' + url + chemcalcResult.mf + ')');
    }

    return result.join('\r\n');
};
