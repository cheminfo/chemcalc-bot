import { readdir } from 'fs/promises';

const commandsDirectory = new URL('./commands/', import.meta.url);

export default async function loadCommands(bot) {
  const commandFiles = (await readdir(commandsDirectory)).filter((name) =>
    name.endsWith('js'),
  );
  const commands = [];
  for (let filename of commandFiles) {
    const commandFct = await import(`./commands/${filename}`);
    const info = commandFct.default(bot);
    commands.push({
      command: filename.replace('.js', ''),
      description: info.description,
    });
  }
  await bot.setMyCommands(commands);
}
