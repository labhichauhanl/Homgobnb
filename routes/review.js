const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const review = require("../models/review");
const Listing = require('../models/listing');
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware")

//Reviews Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync (async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created");
  res.redirect(`/listings/${listing._id}`);
}));

// Reviews Delete Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) =>{
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId}})
  await review.findByIdAndDelete(reviewId);
  req.flash("success", "Review has been deleted");
  res.redirect(`/listings/${id}`)
}))

module.exports = router;