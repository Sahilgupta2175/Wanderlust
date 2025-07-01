const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const { renderSignupForm, signupRoute, renderLoginForm, loginRoute, logoutRoute } = require('../controllers/users');

router.route('/signup')
    .get(renderSignupForm)
    .post(wrapAsync(signupRoute));

router.route('/login')
    .get(renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("locals", {failureRedirect: '/login', failureFlash: true}), loginRoute);

router.get('/logout', logoutRoute);

module.exports = router;