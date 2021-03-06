import { ts } from '../../send';
import { CommandCallback, ConfigVerb, FunctionParams } from '../type';
import validate, { Argument } from '../validateArgs';
import announce from './announce';
import lang from './lang';
import modRole from './modrole';
import setprefixFunc from './setprefix';

interface ConfigSubCommand {
  args: Argument[];
  minArgs: number;
}

const verbArgs : {
    [key in ConfigVerb]: ConfigSubCommand
} = {
  prefix: {
    args: ['string'],
    minArgs: 1,
  },
  modrole: {
    args: ['role'],
    minArgs: 1,
  },
  lang: {
    args: [],
    minArgs: 0,
  },
  announce: {
    args: ['channel'],
    minArgs: 1,
  },
};

const config : CommandCallback<'config'> = async (
  channel,
  [verb, rest],
) => {
  if (rest.length < verbArgs[verb].minArgs) {
    ts(channel, `usage-${verb}`, { cmd: verb });
    return;
  }
  switch (verb) {
    case 'announce': {
      const args = await validate<typeof verb>(channel, verbArgs[verb].args, rest);
      if (args) {
        announce(channel, args);
      }
      break;
    }
    case 'lang': {
      const args = await validate<typeof verb>(channel, verbArgs[verb].args, rest);
      if (args) {
        lang(channel, args);
      }
      break;
    }
    case 'prefix': {
      const args = await validate<typeof verb>(channel, verbArgs[verb].args, rest);
      if (args) {
        setprefixFunc(channel, args);
      }
      break;
    }
    case 'modrole': {
      const args = await validate<typeof verb>(channel, verbArgs[verb].args, rest);
      if (args) {
        modRole(channel, args);
      }
      break;
    }
    default:
      break;
  }
};

export default config;
