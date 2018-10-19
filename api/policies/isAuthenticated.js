module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
        return res.redirect('/homepage');
    }
    else{
        return res.redirect('/');
    }
};
