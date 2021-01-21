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

import { TextChannel, GuildMember, Channel } from 'discord.js';
import { ts } from '../send';
import { getMemberFromMention, getChannelFromMention } from '../discord';

// We export our argument strings as well as every type that can result from them
export type Argument =
  'all'
  | 'rest'
  | 'member'
  | 'string'
  | 'channel';
export type PossibleArgumentResults = string[] | GuildMember | string | Channel;

// This table associates string literal types with argument parsing results
export type ArgumentResult<T extends Argument> =
    T extends 'all' ? string[] :
    T extends 'member' ? GuildMember :
    T extends 'rest' ? string[] :
    T extends 'channel' ? Channel :
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
};

export default argumentParser;
