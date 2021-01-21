import { pool, getInt } from './common';

export const createGuild = async (guildId: string) : Promise<number> => {
  const { rowCount } = await pool().query(
    'INSERT INTO guilds("guildId") VALUES($1) ON CONFLICT DO NOTHING',
    [guildId],
  );
  return rowCount;
};

export const rmGuild = async (guildId : string) : Promise<number> => {
  const { rowCount } = await pool().query(
    'DELETE FROM guilds WHERE "guildId" = $1',
    [guildId],
  );
  return rowCount;
};

export const setLang = async (guildId : string, lang : string) : Promise<number> => {
  const { rows: [{ case: inserted }] } = await pool().query(
    `INSERT INTO guilds("guildId", lang)
    VALUES($1, $2)
    ON CONFLICT("guildId") DO
      UPDATE SET lang=$2
    RETURNING case when xmax::text::int > 0 then 0 else 1 end`,
    [guildId, lang],
  );
  return inserted;
};

export const getLang = async (guildId : string) : Promise<string> => {
  const { rows: [lang] } = await pool().query(
    'SELECT lang FROM guilds WHERE "guildId"=$1', [guildId],
  );
  return lang;
};

export const setPrefix = async (guildId : string, prefix : string) : Promise<number> => {
  const { rows: [{ case: inserted }] } = await pool().query(
    `INSERT INTO guilds("guildId", prefix)
    VALUES($1, $2)
    ON CONFLICT("guildId") DO
      UPDATE SET prefix=$2
    RETURNING case when xmax::text::int > 0 then 0 else 1 end`,
    [guildId, prefix],
  );
  return inserted;
};

export type GuildInfo = {
  lang: string | null;
  prefix: string | null;
  announce: string | null;
}

export const getGuildInfo = async (guildId : string) : Promise<GuildInfo | undefined> => {
  const { rows: [data] } = await pool().query<GuildInfo>(
    `SELECT lang, prefix, ${getInt('announce')} FROM guilds WHERE "guildId"=$1 LIMIT 1`,
    [guildId],
  );
  return data;
};

export const setGuildInfo = async (
  id: string,
  {
    lang,
    prefix,
    announce,
  }: GuildInfo,
) : Promise<number> => {
  const { rows: [{ case: inserted }] } = await pool().query(
    `INSERT INTO guilds("guildId", lang, prefix, announce)
      VALUES($1, $2, $3, $4)
      ON CONFLICT("guildId") DO
        UPDATE SET lang=$2, prefix=$3, announce=$4
      RETURNING case when xmax::text::int > 0 then 0 else 1 end`,
    [id, lang, prefix, announce],
  );
  return inserted;
};
