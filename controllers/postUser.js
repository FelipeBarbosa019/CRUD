
const { users, writeFile } = require ("../repository/data.js")
const verification = require("./verification")

async function postUser (req, res) {
    let newUser = req.body; 
    const err = verification(newUser)
    if (err) {
        res.status(400).json({err})
        return;
    }
    newUser = {
        id: users.length + 1,
        nome: newUser.nome,
        email: newUser.email,
        deleted: false
    }
    users.push(newUser);
    await writeFile(users)
   
    res.status(201).json("Usuário cadastrado com sucesso!")
}

module.exports = postUser;