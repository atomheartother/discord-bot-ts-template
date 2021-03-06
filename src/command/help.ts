import { MessageEmbed } from 'discord.js';
import { eb } from '../send';
import i18n from '../i18n';
import { CommandCallback } from './type';
import { getGuildInfo } from '../db';

const help : CommandCallback<'help'> = async (channel) : Promise<void> => {
  const { lang, prefix } = await getGuildInfo(channel.guild.id);
  const embed = new MessageEmbed()
    .setColor(0x0e7675)
    .setTitle(i18n(lang, 'helpHeader', { botName: process.env.BOT_NAME }))
    .setDescription(i18n(lang, 'helpIntro', { botName: process.env.BOT_NAME }))
    .addField(`${prefix}config`, i18n(lang, 'usage-config', { prefix }));
  eb(channel, { embed });
};

export default help;
