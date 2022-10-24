carregarUsuariosNoHtml()

async function carregarUsuariosNoHtml() {
    let [error, usuarios] = await new UsuarioRepository().carregarUsuarios()

    if (error) {
        exibirMensagensDeErro(error, "Ocorreu um erro ao carregar os usuários.")
        return
    }
    ocultarMensagensDeErro()

    let tagTabelaUsuarios = document.querySelector("#tabelaUsuarios")
    tagTabelaUsuarios.innerHTML = 
        `<tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Opções</th>
        </tr>`
    usuarios.forEach(usuario => {
        let tagTr = document.createElement("tr")
        tagTr.setAttribute("data-idusuario", usuario.id)

        let tagTdNome = document.createElement("td")
        tagTdNome.textContent = usuario.nome
        let tagTdEmail = document.createElement("td")
        tagTdEmail.textContent = usuario.email

        let tagTdOpcoes = document.createElement("td")

        let tagButtonEditar = document.createElement("button")
        let tagImgEditar = document.createElement("img")
        tagImgEditar.src = "img/edit.png"
        tagImgEditar.alt = "Editar usuário"
        tagButtonEditar.appendChild(tagImgEditar)

        tagButtonEditar.addEventListener("click", function(event) {
        let tagsTrUsuarios = document.querySelectorAll("#tabelaUsuarios tr")
        tagsTrUsuarios.forEach(function(trUsuario) {
            trUsuario.classList.remove("editandoCliente")
        })

        let tagBotao = event.target
        let tagTr = tagBotao.parentElement.parentElement.parentElement

        document.querySelector("#idusuario").value = usuario.id
        let nome = usuario.nome
        let email = usuario.email

        document.querySelector("#nome").value = nome
        document.querySelector("#email").value = email
        
        tagTr.classList.add("editandoCliente")
        exibirBotaoAtualizarUsuario()
        })

        let tagButtonRemover = document.createElement("button")
        tagButtonRemover.addEventListener("click", async function(event) {
            let [error, usuarioJson] = await new UsuarioRepository().removerUsuario(usuario.id)

            if (error) {
                exibirMensagensDeErro(error, "Ocorreu um erro ao remover o usuário.")
                return
            }
            ocultarMensagensDeErro()

            document.querySelector("#nome").value = ""
            document.querySelector("#email").value = ""
            document.querySelector("#idusuario").value = ""

            exibirBotaoCriarUsuario()
            carregarUsuariosNoHtml()
        })

        let tagImgRemover = document.createElement("img")
        tagImgRemover.src = "img/delete.png"
        tagImgRemover.alt = "Remover usuário"
        tagButtonRemover.appendChild(tagImgRemover)

        tagTdOpcoes.appendChild(tagButtonEditar)
        tagTdOpcoes.appendChild(tagButtonRemover)

        tagTr.appendChild(tagTdNome)
        tagTr.appendChild(tagTdEmail)
        tagTr.appendChild(tagTdOpcoes)

        tagTabelaUsuarios.appendChild(tagTr)
    });
    ocultarMensagensDeErro()

}

let tagFormularioCadastroUsuario = document.querySelector("#formularioCadastroUsuario")
tagFormularioCadastroUsuario.addEventListener("submit", async function(event) {
    event.preventDefault()

    let nome = event.target.nome.value
    let email = event.target.email.value
    let idusuario = event.target.idusuario.value
    
    if (!ehFormValido(nome)) {
        exibirMensagensDeValidacao()
        return
    }

    ocultarMensagensDeValidacao()
    
    let ehUmNovoUsuario = idusuario == ""
    if (ehUmNovoUsuario) {
        let [error, usuario] = await new UsuarioRepository().criarUsuario(nome, email)
        
        if (error) {
            exibirMensagensDeErro(error, "Ocorreu um erro ao criar o usuário.")
            return
        }        
        ocultarMensagensDeErro()

        event.target.reset()
        carregarUsuariosNoHtml()
    } else {
        let [error, usuario] = await new UsuarioRepository().atualizarUsuario(nome, email, idusuario)
        
        if (error) {
            exibirMensagensDeErro(error, "Ocorreu um erro ao atualizar o usuário.")
            return
        }
        ocultarMensagensDeErro()

        exibirBotaoCriarUsuario()        
        document.querySelector("#nome").value = ""
        document.querySelector("#email").value = ""
        carregarUsuariosNoHtml()
    }
})

function ehFormValido(nome) {
    let formValido = true
    if (nome.trim() == "") {
        formValido = false
    } else {        
        formValido = true
    }
    return formValido
}

function exibirBotaoCriarUsuario() {
    let botaoCriarUsuario = document.querySelector("#criarUsuario")
    botaoCriarUsuario.querySelector("img").src = "img/create.png"
}

function exibirBotaoAtualizarUsuario() {
    let botaoCriarUsuario = document.querySelector("#criarUsuario")
    botaoCriarUsuario.querySelector("img").src = "img/update.png"
}

function exibirMensagensDeValidacao() {
    let tagCampoObrigatorio = document.querySelector("#campoObrigatorio")
    tagCampoObrigatorio.classList.add("campoObrigatorioExibir")
}

function ocultarMensagensDeValidacao() {
    let tagCampoObrigatorio = document.querySelector("#campoObrigatorio")
    tagCampoObrigatorio.classList.remove("campoObrigatorioExibir")
}

function exibirMensagensDeErro(error, mensagem) {
    let tagMensagensDeErro = document.querySelector("#mensagensDeErro")
    tagMensagensDeErro.textContent = mensagem + " Erro: " + error
    tagMensagensDeErro.classList.add("mensagensDeErroExibir")
}

function ocultarMensagensDeErro() {
    let tagMensagensDeErro = document.querySelector("#mensagensDeErro")
    tagMensagensDeErro.textContent = ""
    tagMensagensDeErro.classList.remove("mensagensDeErroExibir")
}
