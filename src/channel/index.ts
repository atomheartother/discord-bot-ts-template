import { TextChannel, DMChannel } from 'discord.js';
import { getUserDm } from '../discord';

export type SupportedChannel = TextChannel | DMChannel

export const getName = (channel : SupportedChannel) : string => {
  if (channel instanceof TextChannel) {
    return `#${channel.name}`;
  }
  if (channel instanceof DMChannel) {
    return `DMs of ${channel.recipient.tag}`;
  }
  return 'Unsupported channel type'; // Should be unreachable
};

export const getInfo = (channel : SupportedChannel) : string => `${getName(channel)} (${channel.id})`;

export const getOwnerDm = async (
  channel : SupportedChannel,
) : Promise<DMChannel> => {
  if (channel instanceof DMChannel) {
    return channel;
  }
  if (channel instanceof TextChannel) {
    return getUserDm(channel.guild.ownerID);
  }
  return null;
};
