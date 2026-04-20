const description = 'Ping if server is available';

export default function ping(bot) {
  bot.onText(/\/ping/, (message) => {
    const fromId = message.from.id;
    const response = `I'm alive, don't worry :)`;

    return bot.sendMessage(fromId, response);
  });
  return { description };
}
