const { users } = require("../repository/data");

function getUser (req, res) {
    const activeUsers = users.filter(x => x.deleted == false);
    res.status(200).json(activeUsers);
}

module.exports = getUser;