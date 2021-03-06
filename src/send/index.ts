import { FluentVariable } from '@fluent/bundle';
import {
  TextChannel, MessageOptions, DiscordAPIError, Message,
} from 'discord.js';
import { getGuildInfo } from '../db';
import i18n from '../i18n';
import log from '../utils/log';
import handleError from './handleError';

export type BotMessage = (MessageOptions & {split?: false}) | string;

const send = async (channel : TextChannel, content: BotMessage) : Promise<Message | null> => {
  try {
    const msg = await channel.send(content);
    return msg;
  } catch (e) {
    if (e instanceof DiscordAPIError) {
      return handleError(channel, e, content);
    }
    log('Got unknown error type', channel);
    log(e, channel);
    return null;
  }
};

export const ts = async (
  channel: TextChannel,
  key: string,
  options: Record<string, FluentVariable> = {},
) : Promise<Message | null> => {
  const { prefix } = await getGuildInfo(channel.guild.id);
  // Add some common data to the translation
  return send(channel, i18n('en', key, { ...options, prefix, botName: process.env.BOT_NAME }));
};

export const eb = (
  channel: TextChannel,
  content: MessageOptions,
) : Promise<Message | null> => send(channel, { ...content, split: false });
