// Require the necessary discord.js classes
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
console.log(process.env.DISCORD_TOKEN);
// Log in to Discord with your client's token
client.login(
  'MTE5OTYwMzA4MDYxNDkwMzgyOQ.GhfCGr.nhl4gWXABnXcZ0lgCr2vaynUS3Yd_AsVz9Z8Fs'
);
