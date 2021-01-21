// DATABASE INDEX
// Here we export all the database functions.
// This file serves as middleware and lets you change
// the actual database functions behind the scenes,
// keeping the API the same for the rest of the bot,
// who should only import from this file.

import { init } from './common';
import { rmMember } from './members';
import {
  getGuildInfo as SQLgetGuildInfo,
  GuildInfo,
  setGuildInfo as SQLsetGuildInfo,
} from './guilds';
// Common
export const initDatabase = init;

// Members
export const deleteMember = rmMember;

// Guilds
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
  return res;
};
export const setGuildInfo = (
  id: string,
  info: GuildInfo,
) : Promise<number> => SQLsetGuildInfo(id, info);
