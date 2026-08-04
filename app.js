const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');

const MONGO_URL = 'mongodb://localhost:27017/homigobnb';

async function main() {
  await mongoose.connect(MONGO_URL);
}

main().then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.error(err));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));


//Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings});
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", {listing});
});



/*
app.get('/listings', async (req, res) => {
    let sampleListings = new Listing({
        title: 'Beach House',
        description: 'A beautiful beach house with stunning ocean views.',
        price: 1250,
        location: 'Mumbai, Maharashtra',
        country: 'India',
    })
    await sampleListings.save()
    console.log('Sample listing saved to the database');
    res.send('Sample listing saved to the database'); 
    });
*/

app.get('/', (req, res) => {
  res.send('Hello World!');
});