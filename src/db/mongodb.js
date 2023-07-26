import dotenv from "dotenv";
import { mongoose } from "mongoose";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to DB");
  })
  .catch(() => console.error("Unable to connect to DB"));

mongoose.connection.on("connected", () => {});

const Schema = mongoose.Schema;

const omniRPGSchema = new Schema({
  discordUserID: String,
  class: String,
  level: Number,
  experience: Number,
  gold: Number,
  health: Number,
  mana: Number,
  strength: Number,
  dexterity: Number,
  intelligence: Number,
  luck: Number,
  weapon: String,
  armor: String,
  accessory: String,
  skills: Array,
  spells: Array,
  items: Array,
  quests: Array,
});

const omniRPGModel = mongoose.model("omniRPGSchema", omniRPGSchema);

export const createNewUser = (discordUserID) => {
  const newUser = new omniRPGModel({
    discordUserID: discordUserID,
    class: "none",
    level: 1,
    experience: 0,
    gold: 0,
    health: 0,
    mana: 0,
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    luck: 0,
    weapon: "none",
    armor: "none",
    accessory: "none",
    skills: [],
    spells: [],
    items: [],
    quests: [],
  });

  try {
    newUser.save();
  } catch (err) {
    console.log(err);
  }
};

export const updateUserClass = (discordUserID, newClass) => {
  try {
    omniRPGModel
      .findOneAndUpdate(
        { discordUserID: discordUserID },
        { class: newClass },
        { upsert: true },
      )
      .then((doc) => {
        console.log(doc);
      });
  } catch (err) {
    console.log(err);
  }
};
