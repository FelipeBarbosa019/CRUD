const { users } = require("../dataBase/data")

function verification (infos){
    if(!infos.nome) return "Erro, insira o nome"
    if(!infos.email) return "Erro, insira um email"
    if(typeof infos.nome != "string") return "Nome inválido"
    if(typeof infos.email != "string") return "Email inválido"
    if(!infos.email.includes("@")) return "Insira o email completo"
    const user = users.find(x => x.nome == infos.nome && x.email == infos.email && x.deleted == false)
    if(user) return "Usuário já cadastrado"
}

module.exports = verification;