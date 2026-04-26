require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Bot aktif sebagai ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const regex = /(?:https?:\/\/)?videy\.co\/v\?id=([a-zA-Z0-9]+)/;
  const match = message.content.match(regex);

  if (match) {
    const id = match[1];
    const newLink = `cdn2.slicedrive.com/${id}.mp4`;

    message.reply(` ${newLink}`);
  }
});

client.login(process.env.TOKEN);
