const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//Index Route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//Create Route
router.route("/")
 .get(wrapAsync(listingController.index)) 
 .post( isLoggedIn, validateListing, upload.single("listing[image]"),
 wrapAsync(listingController.createListing)
);

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//Update Route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

module.exports = router;