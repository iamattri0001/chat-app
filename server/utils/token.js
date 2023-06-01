const bcrypt = require('bcrypt');


require('dotenv').config();

const tokenSecret = process.env.TOKEN_SECRET;

module.exports.createToken = async (username) => {
    const tokenString = username + tokenSecret;
    const token = await bcrypt.hash(tokenString, 10);
    return token;
}


module.exports.verifyToken = async (username, token) => {
    if (!token || !username)
        return false;
    const actualTokenString = username + tokenSecret;
    const isTokenValid = await bcrypt.compare(actualTokenString, token);
    return isTokenValid;
}