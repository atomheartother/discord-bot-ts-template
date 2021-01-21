import { ShardingManager } from 'discord.js';

const manager = new ShardingManager('dist/bot.js', { token: process.env.DISCORD_TOKEN });

export default manager;
