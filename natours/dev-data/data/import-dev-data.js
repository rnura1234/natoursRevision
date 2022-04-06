const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const Tour = require('../../model/tourModel');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATBASE_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log('database connection succesfully');
  })
  .catch((err) => {
    console.log('ERROR :', err);
  });

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours.json', 'utf8'));

async function importData() {
  await Tour.create(tours);
}
async function deleteData() {
  await Tour.deleteMany();
}

if (process.argv[2] == '--import') {
  importData();
}
if (process.argv[2] == '--delete') {
  deleteData();
}
