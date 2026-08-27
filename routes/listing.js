const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

// Index
router.get("/", wrapAsync(listingController.index));

// New
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show
router.get("/:id", wrapAsync(listingController.showListing));

// Create
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );

// Edit
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Update
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
   isLoggedIn, 
   isOwner,
   upload.single("listing[image]"), 
   validateListing, 
   wrapAsync(listingController.updateListing))
   .delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;