import { TextChannel } from 'discord.js';
import { getGuildInfo, setGuildInfo } from '../../db';
import { ts } from '../../send';
import { FunctionParams } from '../type';

const modRole = async (
  channel: TextChannel,
  [role]: FunctionParams<'modrole'>,
): Promise<void> => {
  const guildInfo = await getGuildInfo(channel.guild.id);
  guildInfo.modRole = role.id;
  await setGuildInfo(
    channel.guild.id,
    guildInfo,
  );
  ts(channel, 'modRoleSuccess', { roleId: role.id });
};

export default modRole;
