const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const {validateListing, isLoggedIn, isOwner } = require('../middleware');
const { indexRoute, renderNewFormRoute, showListingRoute, createListingRoute, editListingRoute, updateListingRoute, destroyListingRoute } = require('../controllers/listings');

// Index Route
router.get('/', wrapAsync(indexRoute));

// New Route
router.get('/new-detail', isLoggedIn, renderNewFormRoute);

// Show Route
router.get('/:id', wrapAsync(showListingRoute));

// Create Route
router.post('/', isLoggedIn, validateListing, wrapAsync(createListingRoute));

// Edit Route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(editListingRoute));

// Update Route
router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(updateListingRoute));

// Delete Route
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(destroyListingRoute));

module.exports = router;