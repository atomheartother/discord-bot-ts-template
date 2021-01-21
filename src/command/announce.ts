import { CommandCallback } from './type';
import { getGuildInfo, setGuildInfo } from '../db';
import { ts } from '../send';

const announce : CommandCallback<'announce'> = async (
  channel,
  [targetChannel],
) => {
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
