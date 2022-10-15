let tagFormularioCadastroUsuario = document.querySelector("#formularioCadastroUsuario")
tagFormularioCadastroUsuario.addEventListener("submit", function(event) {
    event.preventDefault()

    let nome = event.target.nome.value
    let email = event.target.email.value

    let formValido = true
    if (nome.trim() == "") {
        document.querySelector("#campoObrigatorio").style.display = "inline"
        formValido = false
    } else {
        document.querySelector("#campoObrigatorio").style.display = "none"
    }

    if (formValido) {
        fetch("https://63442914dcae733e8fd8e3e5.mock.io/usuarios", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                email: email
            })
        })
        .then(function(response) {
            if (!response.ok) {
                throw "Requisição chegou no servidor, mas servidor retornou com erro: " + response.statusText
            }
            return response.json()
        })
        .then(function(usuario) {
            console.log(usuario)
            let tagMensagensDeErro = document.querySelector("#mensagensDeErro")
            tagMensagensDeErro.textContent = ""
            tagMensagensDeErro.style.display = "none"
            event.target.reset
        })
        .catch(function(error) {
            console.log(error)
            let tagMensagensDeErro = document.querySelector("#mensagensDeErro")
            tagMensagensDeErro.textContent = "Ocorre um erro no cadastro. Erro: " + error
            tagMensagensDeErro.style.display = "inline"
        })
    }
})