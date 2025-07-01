const Listing = require('../models/listing');
const Review = require('../models/review');

const createReviewRoute = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    // Set the author to the current user
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash('success', 'New review added successfully!');
    res.redirect(`/listings/${listing._id}`);
};

const destroyReviewRoute = async (req, res) => {
    let {id, reviewId} = req.params;
    console.log(id, reviewId);
    let listing = await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});

    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
}

module.exports = { createReviewRoute, destroyReviewRoute };