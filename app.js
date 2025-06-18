const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing");
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/expressError');
const {listingSchema, reviewSchema} = require('./schema');
const Review = require('./models/review');

const mongo_url = 'mongodb://localhost:27017/wanderlust';

main().then(() => {
    console.log('Mongodb connected successfully');
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get('/', (req, res) => {
    res.send('Hello, I am root');
});

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

// Index Route
app.get('/listings', 
    wrapAsync(async (req, res) => {
        const allListings = await Listing.find({});
        res.render('./listings/index.ejs', {allListings});
    }))
;

// New Route
app.get('/listings/new-detail', (req, res) => {
    res.render('./listings/new.ejs');
});

// Show Route
app.get('/listings/:id',
    wrapAsync(async (req, res) => {
        let id = req.params.id;
        const listing = await Listing.findById(id).populate('reviews');
        res.render('./listings/show.ejs', {listing});
    })
);

// Create Route
app.post('/listings', validateListing,
    wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect('/listings');
    })
);

// Edit Route
app.get('/listings/:id/edit', 
    wrapAsync(async (req, res) => {
        let id = req.params.id;
        const listing = await Listing.findById(id);
        res.render('listings/edit.ejs', {listing});
    })
);

// Update Route
app.put('/listings/:id', validateListing,
    wrapAsync(async (req, res) => {
        let id = req.params.id;
        await Listing.findByIdAndUpdate(id, {...req.body.listing});
        res.redirect(`/listings/${id}`);
    })
);

// Delete Route
app.delete('/listings/:id', 
    wrapAsync(async (req, res) => {
        let id = req.params.id;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        res.redirect('/listings');
    })
);

// Reviews Route => post route to add a review
app.post('/listings/:id/reviews', validateReview,
    wrapAsync(async (req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        // console.log('New review added successfully');
        // res.send('New review added successfully');
        res.redirect(`/listings/${listing._id}`);
    })
);

// Delete Review Route
app.delete('/listings/:id/reviews/:reviewId', wrapAsync(async (req, res) => {
    let {id, reviewId} = req.params;
    console.log(id, reviewId);
    let listing = await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});

    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));

// app.get('/testListing', async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My Home",
//         description: "A beautiful home in the city",
//         price: 1200,
//         location: "New York",
//         country: "USA",
//     });

//     await sampleListing.save();
//     console.log('Sample listing saved successfully');

//     res.send('Testing successful, sample listing created');
// });

app.all('*', (req, res, next) => {
    next(new ExpressError(404, 'Page Not Found!'));
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render('error.ejs', {message});
});

app.listen(8080, () => {
    console.log('Server is running on port http://localhost:8080');
});