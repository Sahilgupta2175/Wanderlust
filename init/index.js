const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const mongo_url = 'mongodb://localhost:27017/wanderlust';

main().then(() => {
    console.log('Mongodb connected successfully');
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner: "6860e00c8bb61907c0a1ef74"
    }));
    await Listing.insertMany(initData.data);
    console.log('Database initialized with sample data');
}

initDB().then(() => {
    console.log('Database initialization complete');
}).catch((err) => {
    console.error(err);
})