
const path = require('path');

const controller = {
    index: (req, res) => {
        res.render(path.resolve(__dirname, '../views/index'));
    }
}
module.exports = controller;