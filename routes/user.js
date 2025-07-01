const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const { renderSignupForm, signupRoute, renderLoginForm, loginRoute, logoutRoute } = require('../controllers/users');

router.get('/signup', renderSignupForm);

router.post('/signup', wrapAsync(signupRoute));

router.get('/login', renderLoginForm);

router.post('/login', saveRedirectUrl, 
    passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), 
    loginRoute
);

router.get('/logout', logoutRoute);

module.exports = router;