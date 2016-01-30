# Jack Bliss: The Bot

Seeing as how Jack Bliss wont always be around to look up stuff for us, I have created this bot in his image.
The bot is capable of parsing commands starting with the format ```!<command> <value> [Options]```

Examples
* ```!card Ysera --gold``` - will have Jack post a image of the heartstone card Ysera's Gold version
* ```!ping``` - will have Jack respond with Pong!

## Setup

Setting this up for local running is kind of a pain in the butt thanks to Discord lacking a proper API.
If you want to test things out locally then you will need to follow these basic steps

* Create a test account on Discord (this is the account the bot will use)
* Add the email/password to your environment `LOGIN_EMAIL` and `LOGIN_PASSWORD`
* Run your perferred tool on index.js to launch it

## Structure

### Commands

The key files that you need to worry about are the command files found in `/src/bot/commands` the way that you add
commands is to create a file in that directory, the name doesn't really matter but you will be loved by all other
contributors if it makes sense.

You must export following structure
```
{
  command: string // (required, singleword, do not prefix with !),
  handler: function(event, parameter, options) // (required, parameter is the value passed into the command, and options is an object from minimist
  description: string // not in use yet
}
```

### Bot

So I wont really go into the details since I feel they are pretty easy to understand.

#### `/src/bot/bot.js`

Basically handles logging in, and setting up of some basic Discordie events, it is also the entry point for commands

#### `/src/bot/commands/_dispatcher.js`

This loads all the command files, and registers their handlers, this is also the file that massages the messsage from Discord
and turns it into the content that gets passed into the command handler defined for a given command.