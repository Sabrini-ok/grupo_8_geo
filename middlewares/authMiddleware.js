
const jwt = require('jsonwebtoken');

    module.exports = (neededRoleAdmin) => (req, res, next) => {
    const token = req.cookies.session;
    
   

    if (!token) {
        return res.redirect('/user/login');
    }

    try {
        const user = jwt.verify(token, 'secret');
        if (neededRoleAdmin && !user.admin) {
            return res.redirect('/');
        }

        req.user = user;
        next();
    } catch (error) {
        res.clearCookie('session');
        return res.redirect('/user/login');
    }

}