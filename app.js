const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const listings = require("./routes/listing");
const reviews = require("./routes/review");
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
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.all('/*splat', (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
})

app.use((err, req, res, next) => {
  let { statusCode, message = "Something went wrong. Error Occured." } = err;
  res.render("listings/error.ejs", { message })
})