// ARGS
/*
This is where most of the work with argument parsing goes
This file allows you to define custom data types and have
them automatically parsed before they reach your command.

So for example if your bot is used to register users' favorite posts,
lots of your commands are going to involve members linking posts.
Instead of parsing it in every command, handling error cases etc,
we can define a custom type here and make sure the message
arrives already parsed in the command.
*/

import {
  TextChannel, GuildMember, Channel, Guild, Role,
} from 'discord.js';
import { ts } from '../send';
import {
  getMemberFromMention, getChannelFromMention, getGuild, getRoleFromMention,
} from '../discord';
import {
  AllConfigVerbs, BotCommand, ConfigVerb, FunctionParams,
} from './type';

// We export our argument strings as well as every type that can result from them
export type Argument =
  'all'
  | 'rest'
  | 'member'
  | 'string'
  | 'channel'
  | 'guild'
  | 'configVerb'
  | 'role'

export type PossibleArgumentResults = string[] | GuildMember | string | Channel | Guild | Role;

// This table associates string literal types with argument parsing results
export type ArgumentResult<T extends Argument> =
    T extends 'all' ? string[] :
    T extends 'member' ? GuildMember :
    T extends 'rest' ? string[] :
    T extends 'channel' ? Channel :
    T extends 'guild' ? Guild :
    T extends 'configVerb' ? ConfigVerb :
    T extends 'role' ? Role :
    string;

type ParseArgumentFunction<T extends Argument> = (
    channel: TextChannel, str: string, allArgs: string[], index: number,
) => Promise<ArgumentResult<T>>;

const member : ParseArgumentFunction<'member'> = async (channel, name) => {
  const res = await getMemberFromMention(channel.guild, name);
  if (!res) {
    ts(channel, 'noSuchMember', { member: name });
  }
  return res;
};

const getChannel : ParseArgumentFunction<'channel'> = async (channel, name) => {
  const res = getChannelFromMention(channel.guild, name);
  if (!res) {
    ts(channel, 'noSuchChannel', { name });
  }
  return res;
};

const guild : ParseArgumentFunction<'guild'> = async (channel, id) => {
  const g = await getGuild(id);
  if (!g) {
    ts(channel, 'noSuchGuild', { id });
  }
  return g;
};

const configVerb : ParseArgumentFunction<'configVerb'> = async (channel, verb) => {
  if (AllConfigVerbs.includes(verb.toLowerCase() as ConfigVerb)) {
    return verb.toLowerCase() as ConfigVerb;
  }
  return null;
};

const role : ParseArgumentFunction<'role'> = async (channel, roleMention) => {
  const r = getRoleFromMention(channel.guild, roleMention);
  if (!r) {
    ts(channel, 'noSuchRole', { roleMention });
    return null;
  }
  return r;
};

// This returns all the arguments passed to the command
const all : ParseArgumentFunction<'all'> = async (channel, str, allArgs) => allArgs;
// This returns the rest of the arguments passed to the function after this point
const rest : ParseArgumentFunction<'rest'> = async (channel, str, allArgs, i) => allArgs.slice(i);
// This returns the argument uninterpreted, as-is
const string : ParseArgumentFunction<'string'> = async (channel, str) => str;

const argumentParser : {
    [key in Argument] : ParseArgumentFunction<key>
} = {
  all,
  rest,
  string,
  member,
  channel: getChannel,
  guild,
  configVerb,
  role,
};

export const validate = async <T extends BotCommand | ConfigVerb>(
  channel: TextChannel, cmdArgs: Argument[], args: string[],
): Promise<FunctionParams<T> | null> => {
  // Typescript doesn't understand what we're trying to do
  // if we use generics, so we type the return results to
  // every single argument possible then cast it once everything is
  // checked. This is a hack but it works.
  const resolved = await Promise.all<PossibleArgumentResults>(
    cmdArgs.map(
      (arg, i) => argumentParser[arg](channel, args[i], args, i),
    ),
  );
  if (resolved.findIndex((arg) => !arg) !== -1) return null;
  return resolved as FunctionParams<T>;
};

export default validate;
