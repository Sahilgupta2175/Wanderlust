const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const {validateListing, isLoggedIn, isOwner } = require('../middleware');
const { indexRoute, renderNewFormRoute, showListingRoute, createListingRoute, editListingRoute, updateListingRoute, destroyListingRoute } = require('../controllers/listings');

router.route("/")
    // Index Route
    .get(wrapAsync(indexRoute))
    // Create Route
    .post(isLoggedIn, validateListing, wrapAsync(createListingRoute));

// New Route
router.get('/new-detail', isLoggedIn, renderNewFormRoute);

router.route('/:id')
    // Show Route
    .get(wrapAsync(showListingRoute))
    // Update Route
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(updateListingRoute))
    // Delete Route
    .delete(isLoggedIn, isOwner, wrapAsync(destroyListingRoute));

// Edit Route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(editListingRoute));

module.exports = router;