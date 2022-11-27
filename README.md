# Discord.JS Typescript NodeJS Template with Classes

This template is still being developed.

## Features:
* Discord.js bot
* Typescript types
* Legacy Commands (Text) / Commands / Buttons / Modals Interaction Handlers
* OOP (Object-Oriented Programming) Setup
* MongoDB database setup using mongoose
* Sharding and Internal Sharding at the same time (Shards and Clusters) using the discord-hybrid-sharding package

## How to install and use

**Step 1:** Clone the repository (or just download the files)
```bash
git clone https://github.com/ToborWinner/Discord.JS-Typescript-Template.git
```
**Step 2:** Open the folder in your favorite code editor.
**Step 3:** Create a file name .env
**Step 4:** Insert the following values in the .env file:
```
DISC_TOKEN=Insert here your bot's token
BOT_OWNER=Optional value, you can insert the id of the owner of the bot
MONGO_URI=The connection string for your mongodb database
```
**Step 5:** If you are in vscode, press SHIFT+CTRL (or CMD on mac)+B and select tsc build. If you want to do it from terminal just run `tsc build` in the main project folder. This should create a dist folder, which contains the javascript code ready to run for production.
**Step 6:** Start the bot.
```
npm start
```

## More info about how to use the handlers coming soon. As I mentioned above, this project is still in developement and not ready for everyone to use yet.