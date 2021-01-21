# TemplateBot
Templatebot is a bot that's a template for a large-scale Typescript + NodeJS bot.

It uses modern Javascript and sets you up with a bunch of good architecture so your bot can grow without being too much of a mess.

## Features
- A full command parser which handles multiple words surrounded by quotes, options and flags.
- Per-server prefixed, languages and announcement channels.
- A complex and extensible argument system that lets you define your own data types to send to your commands.
- Industry-grade internationalization using Mozilla's [Project Fluent](https://www.projectfluent.org/play/).
- A ready-to-use database system with postgreSQL
- Docker deployment out of the box.

## Installation

- Install Docker and `docker-compose`
- Copy `.example.env` to a new file called `.env` and fill in the database password & discord API key.
- Run `docker-compose up -d --build`
- That's it.

## I don't wanna use docker because I hate cross-compatibility and easy deployment
So don't use docker.
- Set up a postgresql server
- Make sure it's initialized using `dbVolume/init.db`
- Install `node`
- You'll have to set up something to pass the variables in `.env` to the bot
- `yarn build` to build the bot
- `yarn start` to start it
