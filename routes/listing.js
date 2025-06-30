const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const {validateListing, isLoggedIn, isOwner } = require('../middleware');

// Index Route
router.get('/', 
    wrapAsync(async (req, res) => {
        const allListings = await Listing.find({});
        res.render('./listings/index.ejs', {allListings});
    }))
;

// New Route
router.get('/new-detail', isLoggedIn, (req, res) => {
    // console.log(req.user);
    res.render('./listings/new.ejs');
});

// Show Route
router.get('/:id', 
    wrapAsync(async (req, res) => {
        let id = req.params.id;
        const listing = await Listing.findById(id).populate('reviews').populate('owner');
        if(!listing) {
            req.flash('error', 'Listing does not exist!');
            return res.redirect('/listings');
        }
        console.log(listing);
        res.render('./listings/show.ejs', {listing});
    })
);

// Create Route
router.post('/', isLoggedIn, validateListing,
    wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing);
        // console.log(req.user);
        // Set the owner to the current user
        newListing.owner = req.user._id;
        await newListing.save();
        req.flash('success', 'New listing created successfully!');
        res.redirect('/listings');
    })
);

// Edit Route
router.get('/:id/edit', isLoggedIn, isOwner,
    wrapAsync(async (req, res) => {
        let id = req.params.id;
        const listing = await Listing.findById(id);
        if(!listing) {
            req.flash('error', 'Listing does not exist!');
            return res.redirect('/listings');
        }
        res.render('listings/edit.ejs', {listing});
    })
);

// Update Route
router.put('/:id', isLoggedIn, isOwner, validateListing,
    wrapAsync(async (req, res) => {
        let id = req.params.id;
        await Listing.findByIdAndUpdate(id, {...req.body.listing});
        req.flash('success', 'Listing updated successfully!');
        res.redirect(`/listings/${id}`);
    })
);

// Delete Route
router.delete('/:id', isLoggedIn, isOwner,
    wrapAsync(async (req, res) => {
        let id = req.params.id;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash('success', 'Listing deleted successfully!');
        res.redirect('/listings');
    })
);

module.exports = router;