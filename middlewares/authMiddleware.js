
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const token = req.cookies.session;
    const path = req.path;

    if(path == '/login' && token){
        try {
            const decoded = jwt.verify(token, 'secret');
            req.user = decoded.id;
            next();
        } catch (error) {
            res.clearCookie('session');
            return res.redirect('/user/login');
        }
        
    }

    if(!token){
        return res.redirect('/user/login');
    }
}