CREATE TABLE guilds (
    "guildId"     BIGINT PRIMARY KEY, -- ID of the guild
    "modRole"     BIGINT DEFAULT NULL,
    "prefix"      text DEFAULT NULL, -- Prefix to use there
    "lang"        text DEFAULT NULL, -- Language
    "announce"    text DEFAULT NULL -- Announcement channel
);