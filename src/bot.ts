import { login, getClient } from './discord';
import {
  handleMessage,
  handleError,
  handleReady,
  handleMemberRemove,
} from './discord/discordEvents';
import { initDatabase } from './db';

const start = async () => {
  // Init DB here
  initDatabase();
  getClient()
    .on('message', handleMessage)
    .on('error', handleError)
    .on('ready', handleReady)
    .on('guildMemberRemove', handleMemberRemove);
  login();
};

start();
