import { FluentVariable } from '@fluent/bundle';
import { TextChannel, MessageOptions, DiscordAPIError } from 'discord.js';
import { getGuildInfo } from '../db';
import i18n from '../i18n';
import log from '../utils/log';
import handleError from './handleError';

export type BotMessage = (MessageOptions & {split?: false}) | string;

const send = async (channel : TextChannel, content: BotMessage) : Promise<number> => {
  try {
    await channel.send(content);
  } catch (e) {
    if (e instanceof DiscordAPIError) {
      return handleError(channel, e, content);
    }
    log('Got unknown error type', channel);
    log(e, channel);
  }
  return 0;
};

export const ts = async (
  channel: TextChannel,
  key: string,
  options: Record<string, FluentVariable> = {},
) : Promise<number> => {
  const { prefix } = await getGuildInfo(channel.guild.id);
  // Add some common data to the translation
  return send(channel, i18n('en', key, { ...options, prefix, botName: process.env.BOT_NAME }));
};

export const eb = (
  channel: TextChannel,
  content: MessageOptions,
) : Promise<number> => send(channel, { ...content, split: false });
