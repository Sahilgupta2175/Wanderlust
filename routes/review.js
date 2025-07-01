const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const Review = require('../models/review');
const Listing = require('../models/listing');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const { createReviewRoute, destroyReviewRoute } = require('../controllers/reviews');

// Reviews Route => post route to add a review
router.post('/', isLoggedIn, validateReview, wrapAsync(createReviewRoute));

// Delete Review Route
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(destroyReviewRoute));

module.exports = router;