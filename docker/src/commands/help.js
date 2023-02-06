const description = 'Help';

export default function help(bot) {
  bot.onText(/\/help/, (message) => {
    const fromId = message.from.id;
    const response = `
This ChemCalc bot allows to calculate information about a molecular formula.

You may enter directly a molecular formula using groups like 'Me', 'Ala', etc to calculate the mw, monoisotopic mass, elemental analysis as well as the isotopic distribution.

Examples: C10H20O3, Me2CHCOCl, HAla10GlyProOH
`;

    return bot.sendMessage(fromId, response);
  });
  return { description };
}
