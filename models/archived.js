const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Archived = sequelize.define("Archived", {
    message: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Archived;