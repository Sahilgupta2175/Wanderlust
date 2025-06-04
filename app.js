const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing");
const path = require('path');
const methodOverride = require('method-override');

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
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('Hello, I am root');
});

// Index Route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render('./listings/index.ejs', {allListings});
});

// New Route
app.get('/listings/new-detail', (req, res) => {
    res.render('./listings/new.ejs');
});

// Show Route
app.get('/listings/:id', async (req, res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id);
    res.render('./listings/show.ejs', {listing});
});

// Create Route
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
});

// Edit Route
app.get('/listings/:id/edit', async (req, res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id);
    res.render('./listings/edit.ejs', {listing});
});

// Update Route
app.put('/listings/:id', async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete('/listings/:id', async (req, res) => {
    let id = req.params.id;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect('/listings');
})

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

app.listen(8080, () => {
    console.log('Server is running on port http://localhost:8080');
});