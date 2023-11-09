const path = require('path');

const controller = {
    index: (req, res) => {
        
        res.render('index', {
            user: req.user
        });
    }
}

module.exports = controller;