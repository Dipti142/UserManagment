
const user = require('../model/userModel');

const loadRegister = async (req, res) => {
    try {
        res.render('registration');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { loadRegister };