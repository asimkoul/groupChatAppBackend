const Sequelize  = require("sequelize");
const sequelize = require("../util/database");
const GroupMember = sequelize.define('GroupMember', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = GroupMember;
