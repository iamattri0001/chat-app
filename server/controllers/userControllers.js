const User = require('../model/userModel');
const bcrypt = require('bcrypt');


require('dotenv').config();

const tokenSecret = process.env.TOKEN_SECRET;

module.exports.register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ message: 'username already taken', status: false });
        }

        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ message: 'email already in use', status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, email });

        const tokenString = username + tokenSecret;
        const token = await bcrypt.hash(tokenString, 10);
        res.json({ userDetails: { username, token, id: user._id }, status: true });


    }
    catch (err) {
        next(err);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ message: 'Inavalid username or password', status: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ message: 'Inavalid username or password', status: false });
        }


        const tokenString = username + tokenSecret;
        const token = await bcrypt.hash(tokenString, 10);
        console.log(token);
        res.json({ userDetails: { username, token, id: user._id }, status: true });


    }
    catch (err) {
        next(err);
    }
};


module.exports.verify = async (req, res, next) => {
    try {
        const { token, username } = req.body;
        const actualTokenString = username + tokenSecret;

        const isTokenValid = await bcrypt.compare(actualTokenString, token);
        if (isTokenValid) {
            res.json({ validation: true });
        } else {
            res.json({ validation: false });
        }
    }

    catch (err) {
        next(err);
    }
}
