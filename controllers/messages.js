const Message = require("../models/message");
const sequelize = require("../util/database");


exports.postMessages = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const message = req.body.message;
        const sender = req.user.name;
        const userId = req.user.id;
        await Message.create({ message: message, sender: sender, userId: userId });
        await t.commit();
        res.status(200).json({ message: 'Message sent successfully' });
    }
    catch (err) {
        console.log(err);
        await t.rollback();
        res.status(500).json({ error: err });
    }
}

exports.getAllMessages = async (req, res, next) => {
    try {
        let messages = await Message.findAll();
        messages = messages.map(message => {
            if (req.user.name == message.sender) {
                message.sender = `You`;
            }
            return message;
        });
        res.status(200).json({ message: messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
} 