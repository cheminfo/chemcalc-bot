import { readdir } from 'node:fs/promises';

const commandsDirectory = new URL('commands/', import.meta.url);

export default async function loadCommands(bot) {
  const entries = await readdir(commandsDirectory);
  const commandFiles = entries.filter((name) => name.endsWith('.js'));
  const commands = await Promise.all(
    commandFiles.map(async (filename) => {
      const commandFct = await import(`./commands/${filename}`);
      const info = commandFct.default(bot);
      return {
        command: filename.replace('.js', ''),
        description: info.description,
      };
    }),
  );
  await bot.setMyCommands(commands);
}
