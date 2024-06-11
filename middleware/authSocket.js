const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateSocket = async (socket, next) => {
    try {
        const { token } = socket.handshake.auth;
        // console.log(token)
        if (!token) {
            throw new Error('Authentication token missing');
        }
        const decoded = jwt.verify(token, 'secretkey');
        const user = await User.findByPk(decoded.userId);
        console.log(user);
        if (!user) {
            throw new Error("Invalid token");
        }
        socket.user = user;
        next();
    } catch (error) {
        socket.emit("auth-error",{ message: error.message });
    }
};

module.exports = authenticateSocket;