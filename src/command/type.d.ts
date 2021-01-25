import {
  TextChannel, Message, Channel,
} from 'discord.js';
import { Permission } from './perms';
import { Argument } from './args';

// Adding a command, step 1:
// Add it to the BotCommand enum
export type BotCommand =
    'help'
    | 'lang'
    | 'announce'
    | 'setprefix'

export type CommandOptions = {
    [key:string] : (string | boolean);
}

// Adding a command, step 2:
// Define its arguments if you want them parsed ahead of time.
// If you don't do anything here the command will receive arguments
// as an array of strings of arbitrary length and you can parse it there.

// Step 3 is to create a command function in its own file,
// then head over to command/index.ts for step 4
type FunctionParams<T extends BotCommand> =
  T extends 'help' ? null :
  T extends 'announce' ? [Channel] :
  T extends 'setprefix' ? [string] :
  string[];

export type CommandCallback<T extends BotCommand> =
    (channel: TextChannel,
    args: FunctionParams<T>,
    options : CommandOptions,
    message: Message) => Promise<void>;

type CommandDefinition<T extends BotCommand> = {
    f: CommandCallback<T>;
    perms: Permission[];
    args: Argument[];
    minArgs: number;
    aliases?: string[];
};
