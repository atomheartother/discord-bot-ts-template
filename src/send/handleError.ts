import { DiscordAPIError } from 'discord.js';
import {
  getInfo, SupportedChannel, getName, getOwnerDm,
} from '../channel';
import log from '../utils/log';
import { BotMessage } from '.';
import i18n from '../i18n';

const asyncTimeout = (
  f : () => Promise<number>,
  ms : number,
) : Promise<number> => new Promise(
  (resolve) => setTimeout(() => {
    resolve(f());
  }, ms),
);

// Handle an error with sending a message:
// - Try to notify the user
// - Plan for the notification failing too
const handleDiscordPostError = async (
  channel : SupportedChannel,
  error : DiscordAPIError,
  msg : BotMessage,
  errorCount = 1,
) : Promise<number> => {
  const errCode = error.code || error.httpStatus;
  // We keep fucking up. Stop trying.
  if (errorCount > 2) {
    log(
      `${errCode}: Discord servers failed receiving message ${errorCount} times, giving up`,
      channel,
    );
    return 3;
  }
  // New message to send
  let newMsg = msg;
  // Log message to print before sending
  let logMsg = '';
  // delay before sending
  let delay = 0;
  // Return code in case of success
  let retCode = 0;
  // channel to post to
  let channelToPostIn = 'best';
  if (
    errCode === 404
          || errCode === 10003
          || (errCode === undefined && error.name === 'TypeError')
  ) {
    // Either the channel was deleted or Discord 404'd trying to access twitter data.
    retCode = 2;
    channelToPostIn = 'none';
    log(error);
    log(msg);
    logMsg = `${errCode} on channel`;
  } else if (
    errCode === 403
          || errCode === 50013
          || errCode === 50001
          || errCode === 50004
          || errCode === 40001
  ) {
    retCode = 2;
    // Discord MissingPermissions error
    // Try to notify the user that something is wrong
    logMsg = `Tried to post in \`${getInfo(channel)}\` but lacked permissions: ${errCode} ${
      error.name
    }`;
    newMsg = i18n('en', 'postPermissionError', {
      name: getName(channel),
      id: channel.id,
    });
    channelToPostIn = 'ownerDms';
  } else if (
    errCode === 504
  ) {
    // There was an error
    logMsg = `${errCode}: Discord servers failed when I tried to send message`;
    delay = errorCount * 1500;
    // retry posting in the same channel
    channelToPostIn = 'same';
  } else if (errCode === 50006) {
    log(msg, channel);
    logMsg = `${errCode}: Message was empty.`;
    channelToPostIn = 'none';
  } else if (errCode === 50007) {
    logMsg = 'This user won\'t accept DMs from us';
    channelToPostIn = 'none';
    retCode = 4;
  } else {
    logMsg = `Posting message failed (${errCode} ${error.name}): ${
      error.message
    }`;
    log(msg);
    channelToPostIn = 'none';
  }
  log(`${logMsg} (attempt #${errorCount})`, channel);
  if (channelToPostIn === 'none') {
    return 1;
  }
  const targetChannel = channelToPostIn === 'ownerDms' ? await getOwnerDm(channel) : channel;
  if (!targetChannel || !targetChannel.id) {
    log("Couldn't find a way to send error notification", channel);
    return 4;
  }
  return asyncTimeout(async () => {
    try {
      await targetChannel.send(newMsg);
      log('Posted message successfully', targetChannel);
    } catch (err) {
      return handleDiscordPostError(
        targetChannel,
        err,
        newMsg,
        errorCount + 1,
      );
    }
    return retCode;
  }, delay);
};

export default handleDiscordPostError;
