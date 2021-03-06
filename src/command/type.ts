import {
  TextChannel, Message, Role,
} from 'discord.js';
import { Permission } from './perms';
import { Argument } from './validateArgs';

// Adding a command, step 1:
// Add it to the BotCommand enum
export type BotCommand =
    'help'
    | 'config'

export type CommandOptions = {
    [key:string] : (string | boolean);
}

// Config-specific types
// If you want to extend config, do it here!
// You can also copy this system to make your own sub-commands.
export const AllConfigVerbs = <const>['prefix', 'lang', 'modrole', 'announce'];

type CONFIG_VERB_TUPLE = typeof AllConfigVerbs;

export type ConfigVerb = CONFIG_VERB_TUPLE[number];

// Adding a command, step 2:
// Define its arguments if you want them parsed ahead of time.
// If you don't do anything here the command will receive arguments
// as an array of strings of arbitrary length and you can parse it there.

// Step 3 is to create a command function in its own file,
// then head over to command/index.ts for step 4
export type FunctionParams<T extends BotCommand | ConfigVerb> =
  T extends 'help' ? null :
  T extends 'config' ? [ConfigVerb, string[]] :
  T extends 'prefix' ? [string] :
  T extends 'lang' ? [string] :
  T extends 'modrole' ? [Role] :
  T extends 'announce' ? [TextChannel] :
  string[];

export type CommandCallback<T extends BotCommand> =
    (channel: TextChannel,
    args: FunctionParams<T>,
    options : CommandOptions,
    message: Message) => Promise<void>;

export type CommandDefinition<T extends BotCommand> = {
    f: CommandCallback<T>;
    perms: Permission[];
    args: Argument[];
    minArgs: number;
    aliases?: string[];
};
