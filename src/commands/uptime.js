import moment from 'moment';

const description = 'Check uptime';
const startTime = moment();

export default function uptime(bot) {
  bot.onText(/\/uptime/, (message) => {
    const fromId = message.from.id;
    const response = `Uptime: ${startTime.from(moment(), true)}`;

    return bot.sendMessage(fromId, response);
  });
  return { description };
}
