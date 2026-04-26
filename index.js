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

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // 🔍 DEBUG (INI YANG KAMU TANYA)
  console.log("TERBACA:", message.content);

  const regex = /(?:https?:\/\/)?videy\.co\/v\?id=([a-zA-Z0-9]+)/g;
  const matches = [...message.content.matchAll(regex)];

  if (matches.length > 0) {
    const limited = matches.slice(0, 8);

    const links = limited.map(m => {
      const id = m[1];
      return `cdn2.slicedrive.com/${id}.mp4`;
    });

    await message.channel.send(links.join("\n"));

    try {
      await message.delete();
    } catch (err) {
      console.log("Gagal hapus pesan");
    }
  }
});

client.login(process.env.TOKEN);
