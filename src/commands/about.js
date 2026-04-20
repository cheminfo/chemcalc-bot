const description = 'About';

export default function about(bot) {
  bot.onText(/\/about/, (message) => {
    const fromId = message.from.id;
    const response = `
ChemCalc telegram bot.

If you are using our tools please don't forget to cite us:

ChemCalc: a building block for tomorrow’s chemical infrastructure. Patiny, Luc; Borel, Alain Journal of Chemical Information and Modeling 2013. DOI:10.1021/ci300563h
`;

    return bot.sendMessage(fromId, response);
  });
  return {
    description,
  };
}
