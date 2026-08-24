const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const review = require("../models/review");
const Listing = require('../models/listing');
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware")
const reviewController = require("../controllers/review");
const { deleteListing } = require('../controllers/listings');

//Reviews Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync (reviewController.createReviewreview));

// Reviews Delete Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview))

module.exports = router;