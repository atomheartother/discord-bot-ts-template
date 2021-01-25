# TemplateBot
Templatebot is a bot that's a template for a large-scale Typescript + NodeJS bot.

It uses modern Javascript and sets you up with a bunch of good architecture so your bot can grow without being too much of a mess.

## Features
- The flexibility of a Javascript bot with the strict typing of Typescript!
- A full command parser which handles multiple words surrounded by quotes, options and flags.
- Per-server prefixes, languages and announcement channels.
- A complex and extensible argument system that lets you define your own data types to send to your commands.
- Industry-grade internationalization using Mozilla's [Project Fluent](https://www.projectfluent.org/play/).
- A ready-to-use database system with postgreSQL
- Docker deployment out of the box.
- A custom paginated embed system.

## Installation

- Install Docker and `docker-compose`
- Copy `.example.env` to a new file called `.env` and fill in the database password & discord API key.
- Run `docker-compose up -d --build`
- That's it.

#### I don't wanna use docker!

So don't use docker.
- Set up a postgresql server
- Make sure it's initialized using `dbVolume/init.db`
- Install `node`
- You'll have to set up something to pass the variables in `.env` to the bot
- `yarn build` to build the bot
- `yarn start` to start it

### Possible questions

#### Are there conditions to using this template?
I've worked hard on this template, and it's the result of experimenting with multiple bots I have made myself. All I ask is you **respect the aGPL license on this code**, meaning that if you somehow improve/modify this code, you *open-source your code* so I and the rest of the community can benefit from it.

#### Does this mean I have to open-source my whole bot if I use this template?
No, you just have to open-source the parts of the bot that are currently there, if you modify them. For example you can add a command `secretCommand` and not open-source that, because the template bot doesn't have that command, but if you fix a bug in `setprefix` or you improve the command parser in `command/index.ts`, you are legally required to open-source those changes!