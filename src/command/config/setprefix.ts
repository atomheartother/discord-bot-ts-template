import { TextChannel } from 'discord.js';
import { setPrefix } from '../../db';
import { ts } from '../../send';
import { FunctionParams } from '../type';

const setprefixFunc = async (
  channel: TextChannel,
  [prefix]: FunctionParams<'prefix'>,
): Promise<void> => {
  await setPrefix(channel.guild.id, prefix);
  ts(channel, 'setPrefixSuccess');
};

export default setprefixFunc;
