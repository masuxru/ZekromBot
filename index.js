require('dotenv').config();
const ExtendedClient = require('./class/ExtendedClient');

const client = new ExtendedClient();
/*
const Enmap = require("enmap");
client.Ban = new Enmap({name:"ban"});
client.qu = new Enmap({ name: 'qu' });
client.afk = new Enmap({ name: 'afk' });
/** */

client.start();

// Handles errors and avoids crashes, better to not remove them.
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
//unkown interaction error
process.on('uncaughtException', function (err) {
    console.log(err);
});