const { users } = require("../dataBase/data");

function getUser (req, res) {
    console.table(users)
    const activeUsers = users.filter(x => x.deleted == false);
    res.status(200).json(activeUsers);
}

module.exports = getUser;