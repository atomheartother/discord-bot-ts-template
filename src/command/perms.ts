// PERMS
/*
Perms allows you to define permissions.
You can define anything in here & add it to any command's perms array
*/

import { GuildMember, TextChannel } from 'discord.js';
import { getGuildInfo } from '../db';

export type Permission = 'isAdmin' | 'isServerMod' | 'manageRoles';

type PermissionEntry = (
  author: GuildMember,
  args: string[],
  channel: TextChannel
) => Promise<boolean>;

const isAdmin = async (author: GuildMember) : Promise<boolean> => (
  author.hasPermission('ADMINISTRATOR') || author.id === process.env.OWNER_ID
);

const isServerMod = async (author: GuildMember) : Promise<boolean> => {
  const simpleModCheck = (
    (await isAdmin(author))
    || author.hasPermission('BAN_MEMBERS')
  );
  if (simpleModCheck) return true;
  const guildInfo = await getGuildInfo(author.guild.id);
  if (!guildInfo.modRole) return false;
  const role = author.roles.cache.get(guildInfo.modRole);
  return !!role;
};

const manageRoles = async (
  author: GuildMember,
) : Promise<boolean> => (await isServerMod(author)) || !!author.hasPermission('MANAGE_ROLES');

const permisssionList : {
    [key in Permission]: PermissionEntry
} = {
  isAdmin,
  isServerMod,
  manageRoles,
};

export default permisssionList;
