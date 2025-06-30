const Listing = require('./models/listing');
const ExpressError = require('./utils/expressError');
const { listingSchema, reviewSchema } = require('./schema');

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

const isLoggedIn = (req, res, next) => {
    // console.log(req.user);
    if(!req.isAuthenticated()) {
        // originalUrl is the URL the user was trying to access before being redirected to login
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'You must be logged in to do that!');
        return res.redirect('/login');
    }
    next();
};

const saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

const isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!res.locals.currentUser._id.equals(listing.owner._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports = { validateListing, validateReview, isLoggedIn, saveRedirectUrl, isOwner};