const mongoose = require('mongoose');
const initData = require('./data');
const Listing = require('../models/listing');

const MONGO_URL = 'mongodb://localhost:27017/homigobnb';

async function main() {
  await mongoose.connect(MONGO_URL);
}

main().then(() => {
  console.log('Connected to MongoDB');
})
  .catch(err => console.error(err));

const initDB = async () => {
  await Listing.deleteMany({});
  console.log('Existing listings deleted');
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "6a8758a7f1feced1979cf864" }));
  await Listing.insertMany(initData.data);
  console.log('Initial data inserted into the database');
}

initDB();