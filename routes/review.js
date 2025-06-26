const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressError');
const { reviewSchema } = require('../schema');
const Review = require('../models/review');
const Listing = require('../models/listing');

// Review Schema Validation
const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(', ');
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

// Reviews Route => post route to add a review
router.post('/', validateReview,
    wrapAsync(async (req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        // console.log('New review added successfully');
        // res.send('New review added successfully');
        req.flash('success', 'New review added successfully!');
        res.redirect(`/listings/${listing._id}`);
    })
);

// Delete Review Route
router.delete('/:reviewId', wrapAsync(async (req, res) => {
    let {id, reviewId} = req.params;
    console.log(id, reviewId);
    let listing = await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});

    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
}));

module.exports = router;