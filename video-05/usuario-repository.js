class UsuarioRepository {
    url = "https://63442914dcae733e8fd8e3e5.mockapi.io/usuarios"

    async carregarUsuarios() {
        try {
            let response = await fetch(this.url)
            if (!response.ok) {
                throw "Requisição chegou no servidor, mas servidor retornou com erro: " + response.statusText
            }
            let usuarios = await response.json()
            return [null, usuarios]
        } catch (error) {            
            return [error, null]
        }
    }

    async atualizarUsuario(nome, email, idusuario) {
        try {
            let response = await fetch(this.url + idusuario, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email
                })
            })
            let usuario = await response.json()
            return [null, usuario]
        } catch (error) {
            return [error, null]            
        }    
    }

    async criarUsuario(nome, email) {
        try {
            let response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email
                })
            })
            if (!response.ok) {
                throw "Requisição chegou no servidor, mas servidor retornou com erro: " + response.statusText
            }
            let usuario = response.json()
            return [null, usuario]
        } catch (error) {
            return [error, null]            
        }
    }

    async removerUsuario(idUsuario) {
        try {
            let response = await fetch(`${this.url}/${idUsuario}`, {
                method: 'DELETE'
            })
            let usuario = response.json()
            return [null, usuario]
        } catch (error) {
            return [error, null]            
        }
    }
}