const { users, writeFile } = require("../repository/data")
const verification = require("./verification");

async function putUser (req, res){
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
    const err = verification({
        nome: req.body.nome ?? user.nome,
        email: req.body.email ?? user.email
    })
    if (err) {
        res.status(400).json({err})
        return;
    }
    if(req.body.nome != undefined){
        user.nome = req.body.nome
    }
    if(req.body.email != undefined){
        user.email = req.body.email
    }

    await writeFile(users)
    res.status(200).json({user})
}

module.exports = putUser