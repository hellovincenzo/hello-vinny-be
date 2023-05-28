import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'colors';

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
import Project from '@models/Project';

// Connect to DB
mongoose.connect(process.env.MONGO_URI as string);

// Read JSON files
const projects = JSON.parse(fs.readFileSync(`${__dirname}/_data/projects.json`, 'utf8'));

// Import into DB
const importData = async () => {
  try {
    await Project.create(projects);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.error({ error });
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Project.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.error({ error });
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
