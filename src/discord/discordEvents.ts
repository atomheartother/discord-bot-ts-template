import {
  Message, GuildMember, PartialGuildMember,
} from 'discord.js';
import {
  getClient, isTextChannel,
} from '.';
import log from '../utils/log';
import { ts } from '../send';
import command from '../command';
import { deleteMember, getGuildInfo } from '../db';

export const handleMessage = async (message : Message) : Promise<void> => {
  const {
    content, author, channel, mentions, guild,
  } = message;
  // Ignore bots
  if (author.bot) return;
  // If somehow channel isn't a TextChannel, stop
  if (!isTextChannel(channel)) return;
  // Find prefix
  const { prefix } = await getGuildInfo(guild.id);
  if (content.indexOf(prefix) !== 0) {
    if (mentions.has(getClient().user)) {
      // We've been mentioned, tell them what our prefix is
      ts(channel, 'prefixUsage', { prefix });
      return;
    }
    return;
  }
  command(content.slice(prefix.length), channel, message);
};

export const handleReady = () : void => {
  log('✅ Logged in to Discord');
};

export const handleError = ({ message }: Error) : void => {
  log(`Discord client encountered an error: ${message}`);
};

export const handleMemberRemove = async (
  { id }: GuildMember | PartialGuildMember,
) : Promise<void> => {
  await deleteMember(id);
};
