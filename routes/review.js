const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const review = require("../models/review");
const { reviewSchema } = require("../schema");
const Listing = require('../models/listing');

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};

//Reviews Post Route
router.post("/", validateReview, wrapAsync (async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created");
  res.redirect(`/listings/${listing._id}`);
}));

// Reviews Delete Route
router.delete("/:reviewId", wrapAsync(async (req, res) =>{
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId}})
  await review.findByIdAndDelete(reviewId);
  req.flash("success", "Review has been deleted");
  res.redirect(`/listings/${id}`)
}))

module.exports = router;