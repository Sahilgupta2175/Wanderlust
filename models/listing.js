const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    category: {
        type: [String],
        enum: ['Trending', 'Rooms', 'Iconic cities', 'Mountains', 'Castles', 'Amazing Pools', 'Camping', 'Farms', 'Arctic', 'Domes', 'Boats'],
    }
});

listingSchema.post('findOneAndDelete', async (listing) => {
    if(listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews} });
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;