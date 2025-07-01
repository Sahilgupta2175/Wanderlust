const User = require('../models/user');

const renderSignupForm = (req, res) => {
    res.render('./users/signup');
};

const signupRoute = async(req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash('success', `Welcome to Wanderlust!, ${username}`);
            res.redirect('/listings'); 
        });
    }
    catch(err) {
        req.flash('error', err.message);
        res.redirect('/signup');
    }
};

const renderLoginForm = (req, res) => {
    res.render('./users/login');
};

const loginRoute = async(req, res) => {
    let { username } = req.body;
    req.flash("success", `Welcome to Wanderlust, ${username}! You have successfully logged in.`);
    let redirect = res.locals.redirectUrl || '/listings';
    res.redirect(redirect);
};

const logoutRoute = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash('success', 'You have successfully logged out!');
        res.redirect('/listings');
   });
}

module.exports = { renderSignupForm, signupRoute, renderLoginForm, loginRoute, logoutRoute };