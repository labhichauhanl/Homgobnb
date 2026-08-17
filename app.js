const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');
const { wrap } = require('module');
const { listingSchema, reviewSchema } = require("./schema");
const review = require("./models/review")

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

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  } else {
    next();
  }
}

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  } else {
    next();
  }
}

//Index Route
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  res.render("listings/show.ejs", { listing });
}));

//Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

//Reviews Post Route
app.post("/listings/:id/reviews", validateReview, wrapAsync (async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`);
}));

// Reviews Delete Route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) =>{
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId}})
  await review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`)
}))


//Create Route
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect(`/listings`);
})
);

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.all('/*splat', (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
})

app.use((err, req, res, next) => {
  let { statusCode, message = "Something went wrong. Error Occured." } = err;
  res.render("listings/error.ejs", { message })
  // res.status(statusCode).send(message);
})