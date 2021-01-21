# Variables
-user =  <user ID/mention>
-char =  <character name/mention/role ID>

# Help messages
## General
### This is displayed when the bot is pinged
prefixUsage =
    {-b}Hi! I'm {-bot-name}!{-b}
    My prefix on this server is `{$prefix}`.
    If you don't know how to use me, start with: `{$prefix}help`.

### This is in the help message header
helpHeader = {-bot-name} - the roleplay server manager

### The main help message body, followed by usage
helpIntro =
    {-b}Hey, I'm {-bot-name}{-b}, I'm a template bot for people to start out making an awesome bot.
    Here's a few things you can do:

## Usage strings

# Errors
## Resolution errors
noSuchMember =
    {-b}I couldn't find a member from `{$member}`.{-b}
    Either they're not in this server or this is the wrong name/id!

noSuchChannel =
    {-b}I couldn't find a channel from `{$name}`.{-b}
    Maybe I can't see that channel, try and make sure I have the proper rights.

## Permission fails
isAdminPermFail =
    {-b}You're not an admin!{-b}
    You have to be an admin to run `{$command}`!

isServerModPermFail =
    {-b}You're not a moderator!{-b}
    You have to be a mod to run `{$command}`!

manageRolesPermFail =
    {-b}You can't manage user roles!{-b}
    You have to have powers to manage roles to run `{$command}`!

# Commands
## Announce
notTextChannel = 
    {-b}<{-h}{$channel}> isn't a text channel!{-b}
    I can only post announcements in text channels.

announceSuccess =
    {-b}Announcement channel set!{-b}
    I will now post my announcements in <{-h}{$channel}>.