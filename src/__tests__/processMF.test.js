'use strict';

const processMF = require('../processMF.js');

describe('Test chemcalc bot', () => {
  test('MF C100', () => {
    const result = processMF('C100');
    console.log(result);
  });
  test('MF Et3N.HCl', () => {
    const result = processMF('Et3N.HCl');
    console.log(result);
  });
});
