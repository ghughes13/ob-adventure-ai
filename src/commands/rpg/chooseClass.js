import { SlashCommandBuilder } from "discord.js";
import { updateUserClass } from "../../db/mongodb.js";

const chooseClass = {
  data: new SlashCommandBuilder()
    .setName("choose-class")
    .setDescription("Choose your character's class (Archer, Mage, Warrior)")
    .addStringOption((option) =>
      option
        .setName("class")
        .setDescription("Choose your class")
        .setRequired(true)
        .addChoices(
          { name: "Archer", value: "archer" },
          { name: "Mage", value: "mage" },
          { name: "Warrior", value: "warrior" },
        ),
    ),
  async execute(interaction) {
    const selectedClass = interaction.options.getString("class");
    console.log(selectedClass);

    updateUserClass(interaction.user.id, selectedClass);

    await interaction.reply(
      "Welcome to Omni RPG! Let's get started. First, you need to choose a class. Do you want to be a Warrior, Mage, or Archer? (Use /choose-class to choose)",
    );
  },
};

export default chooseClass;
