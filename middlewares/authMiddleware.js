
const jwt = require('jsonwebtoken');

    module.exports = (needAuth, neededRoleAdmin = false) => (req, res, next) => {
    const token = req.cookies.session;
    
   

    if (!token && needAuth) {
        return res.redirect('/user/login');
    }

    try {
        const user = jwt.verify(token, 'secret');
        if (neededRoleAdmin && !user.admin) {
            return res.redirect('/');
        }

        req.userLogged = user;
        res.locals = {
            ...res.locals,
            userLogged: user
        }
        next();
    } catch (error) {
        res.clearCookie('session');
        if (needAuth) {
            return res.redirect('/user/login');
        }

        next();
    }

}