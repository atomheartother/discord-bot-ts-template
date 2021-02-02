import {
  Message, MessageEmbed, TextChannel,
} from 'discord.js';
import log from '../utils/log';

/**
 * Takes in an array and divides it into equally-sized pages.
 */
export const paginateElems = <T>(
  elems: T[],
  pageSize = 5,
): T[][] => elems.reduce((acc: T[][], cur) => {
    if (acc.length < 1 || acc[acc.length - 1].length >= pageSize) {
      return [...acc, [cur]];
    }
    return [...acc.slice(0, acc.length - 1), [...acc[acc.length - 1], cur]];
  }, []);

/**
 * Posts a paginated embed, takes a formatting function which allows you
 * to perform some action on your data and return the embed
 * formatted the way you want.
 */
export const paginatedEmbedWithFormat = async <T = MessageEmbed>(
  channel: TextChannel,
  pages: T[],
  formatFunc: (data: T) => Promise<MessageEmbed> | MessageEmbed,
  emojiList: [string, string] = ['⏪', '⏩'],
  time = 120000,
): Promise<Message> => {
  let page = 0;
  const sentEmbed = await channel.send({ embed: (await formatFunc(pages[page])).setFooter(`Page ${page + 1} / ${pages.length}`) });
  if (pages.length > 1) {
    emojiList.forEach((emoji) => {
      sentEmbed.react(emoji);
    });
    const reactionCollector = sentEmbed.createReactionCollector(
      (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
      { time },
    );

    const editEmbed = async (newPage: number): Promise<void> => {
      if (newPage === page) return;
      try {
        const newEmbed = await formatFunc(pages[newPage]);
        sentEmbed.edit({ embed: newEmbed.setFooter(`Page ${newPage + 1} / ${pages.length}`) });
        page = newPage;
      } catch (e) {
        log('paginatedEmbed: Failed editing embed.', channel);
      }
    };

    reactionCollector.on('collect', async (reaction, user) => {
      reaction.users.remove(user);
      switch (reaction.emoji.name) {
        case emojiList[0]:
          editEmbed(page > 0 ? page - 1 : pages.length - 1);
          break;
        case emojiList[1]:
          editEmbed(page + 1 < pages.length ? page + 1 : 0);
          break;
        default:
          break;
      }
    });
    reactionCollector.on('end', () => {
      if (!sentEmbed.deleted) {
        sentEmbed.reactions.removeAll();
      }
    });
  }
  return sentEmbed;
};

/**
 * Posts a paginated embed when provided a list of MessageEmbeds, each of which being a page.
 *
 * Import paginatedEmbedWithFormat for the possibility to use
 * something else than MessageEmbeds as source data.
 */
export default (
  channel: TextChannel,
  pages: MessageEmbed[],
  emojiList: [string, string] = ['⏪', '⏩'],
  time = 120000,
): Promise<Message> => paginatedEmbedWithFormat(channel, pages, (x) => x, emojiList, time);
