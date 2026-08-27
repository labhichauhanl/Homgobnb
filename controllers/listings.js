const Listing = require("../models/listing")

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author"
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings")
  }
  res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res, next) => {

    const newListing = new Listing(req.body.listing);

    // If user uploads an image, use the Cloudinary image
    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    } 
    // If no image is uploaded, use the default image
    else {
        newListing.image = {
            url: process.env.DEFAULT_IMAGE_URL,
            filename: "default_listing"
        };
    }

    // Create search query from location + country
    const locationQuery = `${req.body.listing.location}, ${req.body.listing.country}`;

    // Ask MapTiler for coordinates
    const response = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(locationQuery)}.json?key=${process.env.MAPTILER_API_KEY}`
    );

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
        req.flash("error", "Location could not be found.");
        return res.redirect("/listings/new");
    }

    const coordinates = data.features[0].geometry.coordinates;

    newListing.geometry = {
        type: "Point",
        coordinates: coordinates
    };

    newListing.owner = req.user._id;

    await newListing.save();

    req.flash("success", "New Listing Created Successfully!");
    res.redirect(`/listings/${newListing._id}`);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings")
  }
  res.render("listings/edit.ejs", { listing })
}

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = {url, filename};
  await listing.save();
  }
  req.flash("success", "Listing has been updated!");
  res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing has been deleted!");
  res.redirect("/listings");
}