import { MessageEmbed } from 'discord.js';
import { eb } from '../send';
import i18n from '../i18n';
import { CommandCallback } from './type';
import { getGuildInfo } from '../db';

const help : CommandCallback<'help'> = async (channel) : Promise<void> => {
  const { lang, prefix } = await getGuildInfo(channel.guild.id);
  const embed = new MessageEmbed()
    .setColor(0x0e7675)
    .setTitle(i18n(lang, 'helpHeader'))
    .setDescription(i18n(lang, 'helpIntro'))
    .addField(`${prefix}announce`, i18n(lang, 'usage-announce', { prefix }))
    .addField(`${prefix}lang`, i18n(lang, 'usage-lang', { prefix }));
  eb(channel, { embed });
};

export default help;
