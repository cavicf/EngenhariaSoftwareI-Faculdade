let usuarios = []; // Armazenar os dados dos usuários em um array para controle

// Função para atualizar a tabela
function atualizarTabela() {
    const tabelaUsuarios = document.getElementById("usuarios-list");
    tabelaUsuarios.innerHTML = ''; // Limpa a tabela antes de repopular

    // Preenche a tabela com os dados atualizados
    usuarios.forEach((usuario, index) => {
        const novaLinha = document.createElement("tr");

        novaLinha.innerHTML = `
            <td>${usuario.nomeUsuario}</td>
            <td>${usuario.email}</td>
            <td>${usuario.observacoesUsuario}</td>
            <td>
                <button class="btn-edit" data-index="${index}">Editar</button>
                <button class="btn-delete" data-index="${index}">Excluir</button>
            </td>
        `;

        tabelaUsuarios.appendChild(novaLinha);
    });
}

// Função para adicionar ou editar usuário
document.getElementById("form-usuario").addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeUsuario = document.getElementById("usuario").value; // Corrigir o ID do campo
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;  // Pode ser usado caso necessário
    const observacoesUsuario = document.getElementById("observacoes-usuario").value;

    const usuario = { nomeUsuario, email, senha, observacoesUsuario };

    // Verifica se estamos editando ou criando um novo usuário
    const indexUsuarioEditado = document.getElementById("form-usuario").dataset.editIndex;
    if (indexUsuarioEditado !== undefined) {
        // Se for edição, atualiza o usuário
        usuarios[indexUsuarioEditado] = usuario;
        delete document.getElementById("form-usuario").dataset.editIndex; // Limpa a referência de edição
    } else {
        // Se for um novo usuário, adiciona ao array
        usuarios.push(usuario);
    }

    // Limpa os campos após adicionar/editar
    document.getElementById("form-usuario").reset();

    // Atualiza a tabela com os dados mais recentes
    atualizarTabela();
});

// Lidar com a edição e exclusão de usuários
document.getElementById("usuarios-list").addEventListener("click", function (event) {
    const button = event.target;
    
    if (button.classList.contains("btn-delete")) {
        // Exclui o usuário
        const index = button.dataset.index;
        usuarios.splice(index, 1); // Remove o usuário do array

        // Atualiza a tabela
        atualizarTabela();
    } else if (button.classList.contains("btn-edit")) {
        // Carrega os dados do usuário para edição
        const index = button.dataset.index;
        const usuario = usuarios[index];

        document.getElementById("usuario").value = usuario.nomeUsuario; // Corrigir o ID do campo
        document.getElementById("email").value = usuario.email;
        document.getElementById("senha").value = usuario.senha; // Caso necessário
        document.getElementById("observacoes-usuario").value = usuario.observacoesUsuario;

        // Marca o formulário como edição
        document.getElementById("form-usuario").dataset.editIndex = index;
    }
});

// Inicializa a tabela com os usuários (caso existam ao recarregar a página)
atualizarTabela();
