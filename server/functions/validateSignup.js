const User = require('./../models/User');
const validator = require('validator');

const validateSignup = async (req, res, next) => {
    try {
        const { role, firstName, lastName, email, phone, password, cpassword } = req.body;
        if (role === undefined || firstName === undefined || lastName === undefined || email === undefined || phone === undefined || password === undefined || cpassword === undefined) {
            res.send({ status: 'failed', message: "Please enter all the below fields!" });
            return;
        }
        if (role === "" || firstName === "" || lastName === "" || email === "" || phone === "" || password === "" || cpassword === "") {
            res.send({ status: 'failed', message: "Please enter all the below fields!" });
            return;
        }
        if (role !== 'officer' && role !== 'customer' && role !== 'admin') {
            res.send({ status: 'failed', message: "Please select a valid role" });
            return;
        }
        if (!validator.isEmail(email)) {
            res.send({ status: 'failed', message: "Email address is invalid!" });
            return;
        }
        const userExists = await User.findOne({ email }).exec();
        if (userExists != null) {
            res.send({ status: 'failed', message: "User already exists!" });
            return;
        }
        if (password != cpassword) {
            res.send({ status: 'failed', message: "Passwords do not match" });
            return;
        }
        next();
    } catch (err) {
        res.send({ status: 'failed', message: "Something went wrong, please try again." });
    }
}

module.exports = validateSignup;