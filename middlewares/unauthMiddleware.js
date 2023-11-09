
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.session;


    if (token) {
        return res.redirect('/');
    }

    next();
}
