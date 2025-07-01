const Listing = require('../models/listing');

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
    const newListing = new Listing(req.body.listing);
    // console.log(req.user);
    // Set the owner to the current user
    newListing.owner = req.user._id;
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
    res.render('listings/edit.ejs', {listing});
};

const updateListingRoute = async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
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