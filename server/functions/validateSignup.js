const User = require('./../models/User');
const validator = require('validator');

const validateSignup = async (req, res, next) => {
    try {
        const { role, firstName, lastName, email, phone, password, cpassword } = req.body;
        if (role === undefined || firstName === undefined || lastName === undefined || email === undefined || phone === undefined || password === undefined || cpassword === undefined) {
            throw new Error("Please enter all the below fields!");
        }
        if (role === "" || firstName === "" || lastName === "" || email === "" || phone === "" || password === "" || cpassword === "") {
            throw new Error("Please enter all the below fields!");
        }
        if (role !== 'officer' && role !== 'customer' && role !== 'admin') {
            throw new Error("Please select a valid role");
        }
        if (!validator.isEmail(email)) {
            throw new Error("Email address is invalid!");
        }
        if (!validator.isNumeric(phone) || phone.length !=10){
            throw new Error("Phone number must be numeric characters only with total length of 10 digits.")
        }
        const invalidPhoneNumbers = ['0000000000','1111111111','2222222222','3333333333','4444444444','5555555555','6666666666','7777777777','8888888888','9999999999'];
        const sizeIPN = invalidPhoneNumbers.length;
        for (let i=0; i<sizeIPN; i++){
            if (phone==invalidPhoneNumbers[i]) throw new Error('Invalid phone number');
        }
        const userExists = await User.findOne({ email }).exec();
        if (userExists != null) {
            throw new Error("User already exists!");
        }
        if (password != cpassword) {
            throw new Error("Passwords do not match");
        }
        next();
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
}

module.exports = validateSignup;