// COMMAND INDEX
// This is the heart of the bot
// Each command is a file in this folder,
// and its parameters are defined here.
//

import { TextChannel, Message } from 'discord.js';
import permisssionList from './perms';
import validate from './validateArgs';
import help from './help';
import { ts } from '../send';

import { getMemberFromId } from '../discord';
import {
  BotCommand, CommandDefinition, CommandOptions, FunctionParams,
} from './type';
import config from './config';

// Adding a command, step 4:
// Add your new command here, you can specify the permissions required to run it,
// the minimum number of args, the nature of args, aliases, etc.
// And you're done! Run the bot, and your command will be called.
// Remember to add usage-COMMAND to en.ftl to get a usage string.
const CmdList : {
    [key in BotCommand]: CommandDefinition<key>
} = {
  help: {
    f: help,
    perms: [],
    args: [],
    minArgs: 0,
    aliases: ['h'],
  },
  config: {
    f: config,
    perms: ['isAdmin'],
    args: ['configVerb', 'rest'], // get the config verb, then the rest of the arguments as a string[]
    minArgs: 1, // We should at least have a verb
    aliases: ['conf'],
  },
};

const getCmdFromWord = (word : string) : BotCommand => {
  if (CmdList[word as BotCommand]) return word as BotCommand;
  for (let i = 0; i < Object.keys(CmdList).length; i += 1) {
    const key = Object.keys(CmdList)[i] as BotCommand;
    const cmd = CmdList[key];
    if (cmd.aliases && cmd.aliases.indexOf(word) !== -1) return key;
  }
  return null;
};

const parseWords = (line: string) : {args: string[], options: CommandOptions} => {
  const args : string[] = [];
  const options : CommandOptions = {};
  // Good luck changing this
  const regxp = /(?:--|—)(\w+)(=(?:"|”)(.*?)(?:"|”)|=(\S+))?|(?:"|”)(.*?)(?:"|”)|(\S+)/g;
  let match = regxp.exec(line);
  while (match) {
    if (match[6] || match[5]) { // Single word or multiple word arg
      args.push(match[6] || match[5]);
    } else if (match[1] && !match[2]) { // Option with no equal
      options[match[1]] = true;
    } else {
      const key = match[1];
      const value = match[3] || match[4]; // Multiple word value or simple value
      options[key] = value;
    }
    match = regxp.exec(line);
  }
  return { args, options };
};

// The entrypoint for all commands
const runCommand = async (
  content : string,
  channel : TextChannel,
  message: Message,
) : Promise<void> => {
  // Get the first line, which should hold the actual command
  const [firstLine] = content.split('\n');
  if (!firstLine) return;
  const [firstWord, ...words] = firstLine.split(/ +/);
  const verb = getCmdFromWord(firstWord);

  if (!verb) return; // This isn't a recognized command. Do nothing and exit.

  // This IS a recognized command!
  // Get its info from CmdList and type it using CommandDefinition<>
  const cmd : CommandDefinition<typeof verb> = CmdList[verb];

  // Check permissions
  const member = await getMemberFromId(channel.guild, message.author.id);
  const passes = await Promise.all(cmd.perms.map(
    (perm) => permisssionList[perm](member, words, channel),
  ));

  for (let i = 0; i < passes.length; i += 1) {
    const pass = passes[i];
    if (!pass) {
      ts(channel, `${cmd.perms[i]}PermFail`, { command: verb });
      return;
    }
  }

  // Parse the args provided
  const { args, options } = parseWords(words.join(' '));
  if (args.length < cmd.minArgs) {
    ts(channel, `usage-${verb}`, { cmd: verb });
    return;
  }
  const commandArgs = await validate<typeof verb>(channel, cmd.args, args);
  // Run the command, recombining the lines from before
  cmd.f(
    channel,
    (commandArgs.length > 0 ? commandArgs : args) as FunctionParams<typeof verb>,
    options,
    message,
  );
};

export default runCommand;
