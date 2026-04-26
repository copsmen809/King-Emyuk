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

  // ambil semua link videy (max 8)
  const regex = /(?:https?:\/\/)?videy\.co\/v\?id=([a-zA-Z0-9]+)/g;
  const matches = [...message.content.matchAll(regex)];

  if (matches.length > 0) {
    // ambil max 8
    const limited = matches.slice(0, 8);

    const links = limited.map(m => {
      const id = m[1];
      return `cdn2.slicedrive.com/${id}.mp4`;
    });

    // kirim hasil
    await message.reply({
      content: `🎬 Converted (${links.length}):\n` + links.join("\n"),
    });

    // coba hapus pesan asli
    try {
      await message.delete();
    } catch (err) {
      console.log("Gagal hapus pesan (izin kurang)");
    }
  }
});

client.login(process.env.TOKEN);
