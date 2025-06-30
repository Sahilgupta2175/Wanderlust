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

module.exports = { isLoggedIn, saveRedirectUrl};