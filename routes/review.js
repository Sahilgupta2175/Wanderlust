const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const Review = require('../models/review');
const Listing = require('../models/listing');
const { validateReview, isLoggedIn } = require('../middleware');

// Reviews Route => post route to add a review
router.post('/', isLoggedIn, validateReview,
    wrapAsync(async (req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        // Set the author to the current user
        newReview.author = req.user._id;
        // console.log(newReview);
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