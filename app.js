const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/expressError');
const listings = require('./routes/listing');
const reviews = require('./routes/review');
const session = require('express-session');
const flash = require('connect-flash');

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

const sessionOptions = {
    secret: 'mysupersecretcode',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    }
}

app.get('/', (req, res) => {
    res.send('Hello, I am root');
});

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => { 
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    // console.log(res.locals.success);
    next();
});

// Listings Route
app.use('/listings', listings);

// Reviews Route
app.use('/listings/:id/reviews', reviews);

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