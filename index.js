const btnIncluir = document.querySelector ("#botaoIncluir")  
const btnListar = document.querySelector("#botaoListar")
const confirme = document.querySelector ("h3") 
const confirme2 = document.querySelector ("h4") 

let id = 1
let produtos = []

btnIncluir.addEventListener ("click", incluir)
btnListar.addEventListener ("click", function(){
    listar(produtos);
})

function incluir() {
    //Objeto:
    let produto = {}

    //Guardando valores de entrada:
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    
    //Verificação de dados:
    try {
        if(nome == "") {
            throw `Falha no cadastro do produto, preencha o nome`
        }
        if(email == "") {
            throw `Falha no cadastro do produto, preencha o valor`
        }

        //API:
        
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
        })


        //Objeto:
        produto.id = id,
        produto.nome = nome,
        produto.email = email,

        //Array:
        produtos.push(produto)
        produto.id = id++;

        //Impressão:
        confirme.textContent = `Usuário ${produto.nome} cadastrado com sucesso!`
        confirme.style.color = "#00ff00"

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
        imagemEdit.setAttribute("onclick", "abrirPopup()")

        let imagemApagar = document.createElement('img')
        imagemApagar.src = './assests/excluir.png'
        colunaApagar.appendChild (imagemApagar)
        imagemApagar.setAttribute("onclick", "apagar("+array[i].id+")")

        let btnConfirmar = document.querySelector("#botaoEditar")
        btnConfirmar.setAttribute("onclick",  "editar("+array[i].id+")")

         //Popup visualização:
         colunaNome.setAttribute("onclick", "mostrar("+JSON.stringify(array)+", "+array[i].id+")")
         let btnFechar2 = document.querySelector ("#fechar2")
         btnFechar2.setAttribute ("onclick", "fecharpopup2()")
    }

    //Popup edição:
    let btnFechar = document.querySelector ("#fechar")
    btnFechar.addEventListener ("click", fecharPopup)
}

function mostrar(produtos, id){
    const btnAbrir = document.querySelector("#popupInfos")
    btnAbrir.style.display = 'block'

    const infoID = document.querySelector("#infoID")
    const infoNome = document.querySelector("#infoNome")
    const infoValor = document.querySelector("#infoValor")

    for (i=0; i < produtos.length; i++) {
        if(produtos[i].id == id){ 
            infoID.textContent = produtos[i].id
            infoNome.textContent = produtos[i].nome
            infoValor.textContent = produtos[i].email
        }
    }
}

function abrirPopup (){
    const btnAbrir = document.querySelector("#popup")
    btnAbrir.style.display = 'block'
}

function fecharPopup(){
    btnFechar = document.querySelector ("#popup")
    btnFechar.style.display = 'none'
    confirme2.textContent = ``
}

function fecharpopup2(){
    btnFechar = document.querySelector ("#popupInfos")
    btnFechar.style.display = 'none'
    confirme2.textContent = ``
}

function editar(id) {
    let nomeEdit = document.querySelector ("#nomeEdit").value
    let valorEdit = document.querySelector ("#valorEdit").value

    for (i=0; i < produtos.length; i++) {
        if(produtos[i].id == id){  
            produtos[i].nome = nomeEdit;
            produtos[i].valor = valorEdit;
            confirme2.textContent = `Dados alterados com sucesso, atualize a tabela clicando em "Listar produtos"`
            confirme2.style.color = "#00ff00"
        }
    } 
    // resetando display após inserção
    document.querySelector ("#nomeEdit").value = ""
    document.querySelector ("#valorEdit").value = ""
    fecharPopup();
    listar(produtos);
}   

function apagar(id) {
    produtos.forEach((arrayItem,index) => {
        if(arrayItem.id == id ){
            produtos.splice(index, 1); 
        }
    })
    listar(produtos);
}

