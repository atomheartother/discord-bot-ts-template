import { MessageEmbed } from 'discord.js';
import { CommandCallback } from './type';
import { getGuildInfo, setLang } from '../db';
import { eb, ts } from '../send';
import i18n, { supportedLangs } from '../i18n';

const langCmd : CommandCallback<'lang'> = async (
  channel,
  [language],
) => {
  const { lang, prefix } = await getGuildInfo(channel.guild.id);
  if (language === undefined) {
    const embed = new MessageEmbed()
      .setColor(0x0e7675)
      .setTitle(i18n(lang, 'langHeader'))
      .setDescription(i18n(lang, 'langIntro', { prefix }));
    supportedLangs.forEach((l) => {
      embed.addField(lang === l ? `${l}*` : l, i18n(l, 'i18nCredits'));
    });
    eb(channel, embed);
  } else {
    if (supportedLangs.indexOf(language) === -1) {
      ts(channel, 'noSuchLang', { language });
      return;
    }
    await setLang(channel.guild.id, language);
    ts(channel, 'langSuccess');
  }
};

export default langCmd;
