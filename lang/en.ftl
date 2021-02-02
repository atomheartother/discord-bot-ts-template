# Help messages
## General
### This is displayed when the bot is pinged
prefixUsage =
    {-b}Hi! I'm {$botName}!{-b}
    My prefix on this server is `{$prefix}`.
    If you don't know how to use me, start with: `{$prefix}help`.

### This is in the help message header
helpHeader = {$botName} - the future awesome bot

### The main help message body, followed by usage
helpIntro =
    {-b}Hey, I'm {$botName}{-b}, I'm a template bot for people to start out making an awesome bot.
    Here's a few things you can do:

## Usage strings
usage-announce =
    `{$prefix}announce <channel>`
    Set the channel {$botName} uses to talk to the staff.

usage-lang =
    `{$prefix}lang [language]`
    List available languages, set a language for this server.

usage-setprefix =
    `{$prefix}setprefix [prefix]`
    Set a new prefix for the bot to use on this server.

# Errors
## Resolution errors
noSuchMember =
    {-b}I couldn't find a member from `{$member} on this server`.{-b}
    Either they're not in this server or this is the wrong name/id!

noSuchChannel =
    {-b}I couldn't find a channel from `{$name}`.{-b}
    Maybe I can't see that channel, try and make sure I have the proper rights.

## Permission fails
isAdminPermFail =
    {-b}You're not an admin!{-b}
    You have to be an admin to run `{$prefix}{$command}`!

isServerModPermFail =
    {-b}You're not a moderator!{-b}
    You have to be a mod to run `{$prefix}{$command}`!

manageRolesPermFail =
    {-b}You can't manage user roles!{-b}
    You have to have powers to manage roles to run `{$prefix}{$command}`!

# Commands
## Announce
notTextChannel = 
    {-b}<{-h}{$channel}> isn't a text channel!{-b}
    I can only post announcements in text channels.

announceSuccess =
    {-b}Announcement channel set!{-b}
    I will now post my announcements in <{-h}{$channel}>.

## Lang
noSuchLang = 
    {-b}{$language} isn't a valid language!{-b}
    Use `{$prefix}lang` to get a list of supported languages.

langSuccess =
    {-b}Language changed successfully!{-b}
    I'll now speak English :o

## Setprefix
setPrefixSuccess =
    {-b}New prefix set successfully!{-b}
    You can now use `{$prefix}` to execute my commands.
 
langHeader = {-b}List/set server language{-b}
langIntro = Use `{$prefix}lang <language>` to set server language.
i18nCredits = English, by Liz <3