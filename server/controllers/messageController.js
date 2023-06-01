const Message = require('../model/messageModel');
const { verifyToken } = require('../utils/token');

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message, username, token } = req.body;
        
        const isTokenValid = await verifyToken(username, token);
        if (!isTokenValid)
            return res.json({ msg: "unauthorized" });

        const msg = Message.create({
            message: { text: message },
            users: [from, to],
            sender: from
        });
        if (msg) {
            return res.json({ msg: "message added successfully" });
        } else {
            return res.json({ msg: "failed to add message to the DB" });
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports.getAllMessages = async (req, res, next) => {
    try {
        const { from, to, username, token } = req.body;

        const isTokenValid = await verifyToken(username, token);
        if (!isTokenValid)
            return res.json({ msg: "unauthorized" });

        const messages = Message.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 });

        const projectedMessages = (await messages).map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        });
        return res.json({ messages: projectedMessages });
    }
    catch (err) {
        next(err);
    }
}