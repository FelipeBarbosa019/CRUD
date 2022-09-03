const { users, writeFile } = require("../repository/data")

async function deleteUser (req, res) {
    const id = req.params.id
    if(isNaN(id)){
        res.status(400).json("Id inserido não é um número")
        return;
    }
    const user = users.find(x => x.id == id && x.deleted == false)
    if(!user){
        res.status(404).json("O usuário não existe")
        return;
    }
    user.deleted = true;
    await writeFile(users)
    res.status(200).json("Usuário apagado")
}

module.exports = deleteUser;