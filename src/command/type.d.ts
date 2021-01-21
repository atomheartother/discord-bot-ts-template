import {
  TextChannel, Message, Channel,
} from 'discord.js';
import { Permission } from './perms';
import { Argument } from './args';

export type BotCommand =
    'help'
    | 'lang'
    | 'announce';

export type CommandOptions = {
    [key:string] : (string | boolean);
}

type FunctionParams<T extends BotCommand> =
  T extends 'help' ? null :
  T extends 'announce' ? [Channel] :
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
