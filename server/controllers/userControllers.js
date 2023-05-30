const User = require('../model/userModel');
const bcrypt = require('bcrypt');

const { createToken, verifyToken } = require('../utils/token');


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

        const token = await createToken(username);
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


        const token = await createToken(username)
        res.json({ userDetails: { username, token, id: user._id }, status: true });


    }
    catch (err) {
        next(err);
    }
};


module.exports.verify = async (req, res, next) => {
    try {
        const { token, username } = req.body;

        const isTokenValid = await verifyToken(username, token);

        res.json({ isTokenValid });
        if (isTokenValid) {
            console.log('Validated Token for user: ', username);
        }
    }

    catch (err) {
        next(err);
    }
}


module.exports.setavatar = async (req, res, next) => {
    try {
        const { username, id, token, image } = req.body;
        const isTokenValid = verifyToken(username, token);
        if (!isTokenValid) {
            return res.json({ message: 'unauthorized', status: false });
        }

        const user = await User.findById(id);
        user.isAvatarSet = true;
        user.avatarImage = image;
        user.save();
        res.json({ isSet: true })
        // console.log(user);
    }
    catch (err) {
        next(err);
    }
}

