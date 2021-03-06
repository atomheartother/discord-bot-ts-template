import { MessageEmbed, TextChannel } from 'discord.js';
import { FunctionParams } from '../type';
import { getGuildInfo, setLang } from '../../db';
import { ts } from '../../send';
import i18n, { supportedLangs } from '../../i18n';
import { paginatedEmbedWithFormat, paginateElems } from '../../discord/paginatedEmbed';

const langCmd = async (
  channel: TextChannel,
  [language]: FunctionParams<'lang'>,
): Promise<void> => {
  const { lang, prefix } = await getGuildInfo(channel.guild.id);
  const formatLangs = (langs: string[]): MessageEmbed => {
    const langListEmbed = new MessageEmbed()
      .setColor(0x0e7675)
      .setTitle(i18n(lang, 'langHeader'))
      .setDescription(i18n(lang, 'langIntro', { prefix }));
    langs.forEach((l) => {
      langListEmbed.addField(lang === l ? `[${l}]` : l, i18n(l, 'i18nCredits'));
    });
    return langListEmbed;
  };
  if (language === undefined) {
    // Only make 1-element pages to show off the pagination system with our 2 elements.
    paginatedEmbedWithFormat<string[]>(channel, paginateElems(supportedLangs, 1), formatLangs);
    return;
  }
  if (supportedLangs.indexOf(language) === -1) {
    ts(channel, 'noSuchLang', { language });
    return;
  }
  await setLang(channel.guild.id, language);
  ts(channel, 'langSuccess');
};

export default langCmd;
