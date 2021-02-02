# TemplateBot
Templatebot is a bot that's a template for a large-scale Typescript + NodeJS bot.

It uses modern Javascript and sets you up with a bunch of good architecture so your bot can grow without being too much of a mess.

## Features
- The flexibility of a Javascript bot with the strict typing of Typescript!
- A full command parser which handles multiple words surrounded by quotes, options and flags.
- Per-server prefixes, languages and announcement channels.
- A complex and extensible argument system that lets you define your own data types to send to your commands.
- Industry-grade internationalization using Mozilla's [Project Fluent](https://www.projectfluent.org/).
- A fully Typescript-compatible ESlint + Prettier setup ready to be edited out of the box.
- A ready-to-use database system with postgreSQL
- Docker deployment out of the box.
- A custom paginated embed system.

## Running the bot

- Clone the repository using git,
- Install Docker and `docker-compose`
- Copy `.example.env` to a new file called `.env` and fill in the database password & discord API key.
- Run `docker-compose up -d --build`
- That's it.

#### I don't wanna use docker!

So don't use docker.
- Set up a postgresql server
- Make sure it's initialized using `dbVolume/init.db`
- Install `node`, `yarn` and run `yarn install --production`
- You'll have to set up something to pass the variables in `.env` to the bot
- `yarn build` to build the bot
- `yarn start` to start it

## Getting started
Install `node` and `yarn` on your system and run `yarn` to install all packages necessary for development.

You can now edit the bot as you wish! I **highly** recommend using VSCode with the ESlint, Prettier and Fluent Syntax Highlighter extensions, they will make your editing experience much more pleasant.

If you'd like to be able to keep your bot up-to-date with changes to this template, you can run `git remote rename origin template`. This will allow you, at any time, to run `git pull template master` and benefit from the latest changes.

### Code structure
This bot is subdivided into modules. Each module focuses on one self-contained functionality of the bot. Each module is a subfolder in `src`. **As a general rule** modules should only call each other's `index.ts` declarations, there shouldn't be any searching in subdirectories.

Here's a description of the modules:
- `channel` is a small module that specifically focuses on helper functions built on top of Discord channels. This module is useful & can be extended in particular if you want your bot to DM people because Discord handles DMs weirdly.
- `command` is the command module, the heart of the bot: it takes in a string and executes a command based on that string. In particular, `runCommand` (in `command/index.ts`) is the actual entrypoint of all commands. The files defining how each command behaves are also here. We separate commands in different files to avoid making our files too large. Templatebot's command system is pretty extensible and powerful and can most likely respond to whatever complex needs you have, it provides you with the ability to *pre-parse* arguments before they reach the actual command function.
- `db`, the database module, handles all database-related functions. Files are organized by general theme of database function, such as one file for guilds actions, one for users, etc. An important principle I stick to is that public database functions should **all be exported in `db/index.ts`**, so other modules should NEVER be importing from, for example, `db/guilds`, but always `db` directly. This provides an extra layer of abstraction you can use for quick debugging, adding some preflight - postflight checks to your database operations. One good example is for `getGuildInfo`, templateBot fills in empty fields with default values. *It is very useful* and I recommend doing it.
- `discord` is the module for interfacing with the Discord API *except for sending messages* (see `send`). It receives all Discord events, it also provides a few helper functions other modules can call to access Discord data if necessary. It also contains `paginatedEmbed`, a custom module to make quick paginated embeds.
- `i18n` is the module dedicated to internationalization. You can find i18n files in `lang/`. You shouldn't ever have to touch this module. You can find an example of using `paginatedEmbed` in `command/lang.ts`.
- `send` is a bit of a weird module: it allows you to send messages. I put it in a separate module because you use it *so often* that it's good to have it separate from `discord` so there's no cyclic dependencies anywhere. `send`'s methods are built to be practical for developers: `ts` sends a translated message from the i18n key, for example, it also auto-fills in some common i18n variables we might want like the server's prefix, `eb` sends an embed, etc.
- `utils` is a catch-all utilities module for small helper functions that don't really fit in their own module yet. If you begin having a lot of code in a `utils` function, it might be worth considering moving them into a separate module.

### Creating a new command
If you'd like to create a new command, it takes a few steps, but is heavily commented so don't be scared! All of the command code happens in the `command` module. I recommend getting a feel for how commands are structures by looking at the ones provided with this bot.

Creating a command starts in `command/type.d.ts` where you have to add your command to a few definitions in order for Typescript to understand that the command exists. You then create a command file named `<commandname>.ts`, and go to `command/index.ts` to add your newly-created command to the `CmdList` dictionary. There you'll define the minimum number of args, permissions necessary to run the command, etc.

Ideally your command shouldn't *have* to do any preflight checks (argument parsing, permissions check, etc), this should all be handled *before* execution flow reaches your actual command, through the permission system and the argument parsing system. This keeps your commands **extremely simple** and extensible.

### Possible questions

#### Are there conditions to using this template?
I've worked hard on this template, and it's the result of experimenting with multiple bots I have made myself. All I ask is you **respect the aGPL license on this code**, meaning that if you somehow improve/modify this code, you *open-source your code* so I and the rest of the community can benefit from it.

#### Does this mean I have to open-source my whole bot if I use this template?
No, you just have to open-source the parts of the bot that are currently there, if you modify them. For example you can add a command `secretCommand` and not open-source that, because the template bot doesn't have that command, but if you fix a bug in `setprefix` or you improve the command parser in `command/index.ts`, you are legally required to open-source those changes!