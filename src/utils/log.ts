/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
import { getInfo, SupportedChannel } from '../channel';

const log = (message : any, channel : SupportedChannel = null) : void => {
  const dateString = new Date().toLocaleString('en-GB');
  if (!channel) {
    console.log(`[${dateString}]`);
    console.log(message);
    return;
  }
  const channelInfo = getInfo(channel);
  console.log(`[${dateString}\t${channelInfo}]`);
  console.log(message);
};

export default log;
