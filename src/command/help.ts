import { MessageEmbed } from 'discord.js';
import { eb } from '../send';
import i18n from '../i18n';
import { CommandCallback } from './type';

const help : CommandCallback<'help'> = async (channel) : Promise<void> => {
  const prefix = process.env.PREFIX;
  const language = 'en';
  const embed = new MessageEmbed()
    .setColor(0x0e7675)
    .setTitle(i18n(language, 'helpHeader'))
    .setDescription(i18n(language, 'helpIntro'))
    .addField(`${prefix}announce`, i18n(language, 'usage-announce'))
    .addField(`${prefix}lang`, i18n(language, 'usage-lang'));
  eb(channel, { embed });
};

export default help;
