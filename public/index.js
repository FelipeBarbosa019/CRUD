const btnIncluir = document.querySelector ("#botaoIncluir")  
const btnListar = document.querySelector("#botaoListar")
const btnEditar = document.querySelector("#botaoEditar")
const confirme = document.querySelector ("h3") 

let id = 1;
let userList;
let indexToUpdate;

console.log(`index=${indexToUpdate}`)

btnIncluir.addEventListener ("click", incluir)
btnListar.addEventListener ("click", function(){
    getUsers();
})
btnEditar.addEventListener ("click", function(){
    editar(indexToUpdate);
})

function getUsers() {
    //GET:
    fetch('http://localhost:8000/usuarios',
    {
        method:'GET',
        headers: { 'Content-Type': 'application/json'}
    }
    ).then ( (res)=>{
        return res.json()
    }).then ((data)=>{
        console.log(data)
        userList = data
        listar(userList)
   }
   )
}

function incluir() {
    //Guardando valores de entrada:
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    
    //Verificação de dados:
    try {
        if(nome == "") {
            throw `Falha no cadastro do usuário, preencha o nome`
        }
        if(email == "") {
            throw `Falha no cadastro do e-mail, preencha o e-mail`
        }

        //POST:
        fetch('http://localhost:8000/usuarios',
            {
                method:'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    nome: `${nome}`,
                    email: `${email}`
                })
            }
        ).then ( (res)=>{
            console.log(res)
            getUsers();
        })

        //resetando display após inserção
        document.querySelector("#nome").value = ""
        document.querySelector("#email").value = ""

    } catch (error) {
        confirme.textContent = error
        confirme.style.color = "#ff0000"
    } 
}

function listar(array){
    let tabela = document.querySelector("#tabela")
    tabela.innerHTML = ""
    confirme.textContent = ""

    console.log(array)

    // Inserindo valores na tabela:
    for (i=0; i < array.length; i++) {
        let linha = tabela.insertRow();
        let colunaId = linha.insertCell();
        let colunaNome = linha.insertCell();
        let colunaEmail = linha.insertCell();
        let colunaEditar = linha.insertCell();
        let colunaApagar = linha.insertCell();
        
        colunaId.innerHTML = array[i].id;
        colunaNome.textContent = array[i].nome;
        colunaEmail.textContent = array[i].email;

        let imagemEdit = document.createElement('img')
        imagemEdit.src = './assests/edit.svg'
        colunaEditar.appendChild (imagemEdit)
        imagemEdit.setAttribute("onclick", `abrirPopup(${i+1})`)

        let imagemApagar = document.createElement('img')
        imagemApagar.src = './assests/excluir.png'
        colunaApagar.appendChild (imagemApagar)
        imagemApagar.setAttribute("onclick", "apagar("+array[i].id+")")

        let btnConfirmar = document.querySelector("#botaoEditar")
        btnConfirmar.setAttribute("onclick",  "editar("+array[i].id+")")

         //Popup visualização:
         colunaNome.setAttribute("onclick", "mostrar("+JSON.stringify(array)+", "+array[i].id+")")
    }

    //Popup edição:
    let btnFechar = document.querySelector ("#fechar")
    btnFechar.addEventListener ("click", fecharPopup)
}

function abrirPopup (index){
    const btnAbrir = document.querySelector("#popup")
    btnAbrir.style.display = 'block'
    indexToUpdate = index;
}

function fecharPopup(){
    btnFechar = document.querySelector ("#popup")
    btnFechar.style.display = 'none'
}

function editar(id) {
    let nomeEdit = document.querySelector ("#nomeEdit").value
    let emailEdit = document.querySelector ("#valorEdit").value

    //PUT:
    fetch(`http://localhost:8000/usuarios/${id}`,
        {
            method:'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                nome: `${nomeEdit}`,
                email: `${emailEdit}`
            })
        }
    ).then ( (res)=>{
        getUsers();
    })

    document.querySelector ("#nomeEdit").value = ""
    document.querySelector ("#valorEdit").value = ""
    fecharPopup();
}   

function apagar(id) {
    //DELETE:
    fetch(`http://localhost:8000/usuarios/${id}`,
        {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json'}
        }
    ).then ( (res)=>{
        getUsers();
    })
    listar(userList);
}