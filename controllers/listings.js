const Listing = require('../models/listing');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken});

const indexRoute = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('./listings/index.ejs', {allListings});
};

const renderNewFormRoute = (req, res) => {
    res.render('./listings/new.ejs');
};

const showListingRoute = async (req, res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id).populate({path: 'reviews', populate: {path: 'author'}}).populate('owner');
    if(!listing) {
        req.flash('error', 'Listing does not exist!');
        return res.redirect('/listings');
    }
    res.render('./listings/show.ejs', {listing});
}

const createListingRoute = async (req, res) => {
    let coordinate = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    console.log(coordinate.body.features[0].geometry);
    res.send("Done");

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    // Set the owner to the current user
    newListing.owner = req.user._id;
    // Set the image URL and filename
    newListing.image = { url, filename };
    await newListing.save();
    req.flash('success', 'New listing created successfully!');
    res.redirect('/listings');
};

const editListingRoute = async (req, res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash('error', 'Listing does not exist!');
        return res.redirect('/listings');
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace('/upload', '/upload/w_250');
    res.render('listings/edit.ejs', {listing, originalImageUrl});
};

const updateListingRoute = async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };

        await listing.save();
    }

    req.flash('success', 'Listing updated successfully!');
    res.redirect(`/listings/${id}`);
};

const destroyListingRoute = async (req, res) => {
    let id = req.params.id;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash('success', 'Listing deleted successfully!');
    res.redirect('/listings');
};

module.exports = { indexRoute, renderNewFormRoute, showListingRoute, createListingRoute, editListingRoute, updateListingRoute, destroyListingRoute };