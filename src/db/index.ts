// DATABASE INDEX
// Here we export all the database functions.
// This file serves as middleware and lets you change
// the actual database functions behind the scenes,
// keeping the API the same for the rest of the bot,
// who should only import from this file.

import { init } from './common';
import { SQLrmMember } from './members';
import {
  SQLgetGuildInfo,
  GuildInfo,
  SQLsetGuildInfo,
  SQLsetLang,
  SQLsetPrefix,
} from './guilds';

// Common
export const initDatabase = init;

// Members
export const deleteMember = SQLrmMember;

// Guilds
export const setLang = SQLsetLang;
export const setPrefix = SQLsetPrefix;

export const getGuildInfo = async (guildid: string): Promise<GuildInfo & {prefix: string}> => {
  let res: GuildInfo = await SQLgetGuildInfo(guildid);
  if (!res) {
    res = {
      announce: null,
      prefix: null,
      lang: null,
    };
  }
  if (!res.prefix) {
    res.prefix = process.env.PREFIX;
  }
  if (!res.lang) {
    res.lang = process.env.DEFAULT_LANG;
  }
  return res;
};
export const setGuildInfo = (
  id: string,
  info: GuildInfo,
) : Promise<number> => SQLsetGuildInfo(id, info);
