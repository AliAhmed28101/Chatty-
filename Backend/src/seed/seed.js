import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import  User  from "../models/user.model.js";


config();

import seedUsers from "./seed.users.js";

const runSeed = async () => {
  try {
    await connectDB();

    await User.deleteMany(); // optional: clears old users
    await User.insertMany(seedUsers);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runSeed();