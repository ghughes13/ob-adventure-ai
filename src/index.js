import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import botCommands from "./commands/index.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

import "dotenv/config";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(process.env.TOKEN);

client.once(Events.ClientReady, async (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.commands = new Collection();
client.commandArray = [];

botCommands.forEach((botCommand) => {
  client.commands.set(botCommand.data.name, botCommand);
  client.commandArray.push(botCommand.data.toJSON());
});

client.on("ready", () => {
  console.log("ready");
});

const rest = new REST({
  version: "10",
}).setToken(process.env.token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: client.commandArray,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});
