import { setPrefix } from '../db';
import { ts } from '../send';
import { CommandCallback } from './type';

const setprefixFunc : CommandCallback<'setprefix'> = async (channel, [prefix]) => {
  await setPrefix(channel.guild.id, prefix);
  ts(channel, 'setPrefixSuccess');
};

export default setprefixFunc;
