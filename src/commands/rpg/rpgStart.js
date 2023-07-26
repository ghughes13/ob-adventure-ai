import { SlashCommandBuilder } from "discord.js";
import { createNewUser } from "../../db/mongodb.js";

const rpgStart = {
  data: new SlashCommandBuilder()
    .setName("rpg-start")
    .setDescription("Starts your RPG adventure!"),
  async execute(interaction) {
    createNewUser(interaction.user.id);
    await interaction.reply(
      "Welcome to Omni RPG! Let's get started. First, you need to choose a class. Do you want to be a Warrior, Mage, or Archer? (Use /choose-class to choose)",
    );
  },
};

export default rpgStart;
