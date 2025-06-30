const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { listingSchema } = require('../schema');
const ExpressError = require('../utils/expressError');
const Listing = require('../models/listing');
const { isLoggedIn } = require('../middleware');

// Listing Schema Validation
const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(', ');
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

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
router.get('/:id/edit', isLoggedIn,
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
router.put('/:id', isLoggedIn, validateListing,
    wrapAsync(async (req, res) => {
        let id = req.params.id;
        await Listing.findByIdAndUpdate(id, {...req.body.listing});
        req.flash('success', 'Listing updated successfully!');
        res.redirect(`/listings/${id}`);
    })
);

// Delete Route
router.delete('/:id', isLoggedIn,
    wrapAsync(async (req, res) => {
        let id = req.params.id;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash('success', 'Listing deleted successfully!');
        res.redirect('/listings');
    })
);

module.exports = router;