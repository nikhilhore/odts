const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

const User = require('./models/User');
const Token = require('./models/Token');

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileupload());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) console.log(err);
    else console.log('Connected to mongo Database');
});

app.get('/authenticate', async (req, res) => {
    try {
        const { sessionId, tokenId } = req.cookies;
        const token = await Token.findOne({ sessionId, tokenId }).exec();
        let valid = false;
        let userId = '';
        if (token != null) {
            valid = true;
            userId = token.userId;
        }
        const user = await User.findOne({ userId }).exec();
        if (user != null) {
            user.password = undefined;
            user.__v = undefined;
        }
        res.send({ user, valid });
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

app.use('/', require('./routes/general'));
app.use('/', require('./routes/main'));
app.use('/', require('./routes/auth'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});