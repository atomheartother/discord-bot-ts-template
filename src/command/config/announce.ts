import { TextChannel } from 'discord.js';
import { getGuildInfo, setGuildInfo } from '../../db';
import { ts } from '../../send';
import { FunctionParams } from '../type';

const announce = async (
  channel: TextChannel,
  [targetChannel]: FunctionParams<'announce'>,
): Promise<void> => {
  if (targetChannel.type !== 'text') {
    ts(channel, 'notTextChannel', { channel: targetChannel.id });
    return;
  }
  const guildInfo = await getGuildInfo(channel.guild.id);
  guildInfo.announce = targetChannel.id;
  await setGuildInfo(
    channel.guild.id,
    guildInfo,
  );
  ts(channel, 'announceSuccess', { channel: targetChannel.id });
};

export default announce;
