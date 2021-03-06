import { CommandCallback, ConfigVerb } from '../type';
import validate, { Argument } from '../validateArgs';
import announce from './announce';
import lang from './lang';
import modRole from './modrole';
import setprefixFunc from './setprefix';

const verbArgs : {
    [key in ConfigVerb]: Argument[]
} = {
  prefix: ['string'],
  modrole: ['role'],
  lang: [],
  announce: ['channel'],
};

const config : CommandCallback<'config'> = async (
  channel,
  [verb, rest],
) => {
  switch (verb) {
    case 'announce':
      announce(channel, await validate<typeof verb>(channel, verbArgs[verb], rest));
      break;
    case 'lang':
      lang(channel, await validate<typeof verb>(channel, verbArgs[verb], rest));
      break;
    case 'prefix':
      setprefixFunc(channel, await validate<typeof verb>(channel, verbArgs[verb], rest));
      break;
    case 'modrole':
      modRole(channel, await validate<typeof verb>(channel, verbArgs[verb], rest));
      break;
    default:
      break;
  }
};

export default config;
