let users = [];
let editingUserIndex = null;

function addOrUpdateUser() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const cargo = document.getElementById('cargo').value;
    const observacoes = document.getElementById('observacoes').value;

    if (editingUserIndex !== null) {
        // Atualizar usuário existente
        users[editingUserIndex] = { nome, cpf, telefone, cargo, observacoes };
        editingUserIndex = null;
    } else {
        // Validação de duplicidade de CPF para inserção
        if (users.some(user => user.cpf === cpf)) {
            alert('CPF já cadastrado!');
            return;
        }

        // Adicionar novo usuário
        const user = { nome, cpf, telefone, cargo, observacoes };
        users.push(user);
    }

    displayUsers();
    clearForm();
}

function displayUsers() {
    const tbody = document.getElementById('userTable').querySelector('tbody');
    tbody.innerHTML = '';

    users.sort((a, b) => a.nome.localeCompare(b.nome)).forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.cpf}</td>
            <td>${user.telefone}</td>
            <td>${user.cargo}</td>
            <td>${user.observacoes}</td>
            <td>
                <button onclick="editUser(${index})">Alterar</button>
                <button onclick="deleteUser(${index})">Excluir</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function editUser(index) {
    const user = users[index];
    document.getElementById('nome').value = user.nome;
    document.getElementById('cpf').value = user.cpf;
    document.getElementById('telefone').value = user.telefone;
    document.getElementById('cargo').value = user.cargo;
    document.getElementById('observacoes').value = user.observacoes;

    editingUserIndex = index;
}

function deleteUser(index) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        users.splice(index, 1);
        displayUsers();
    }
}

function clearForm() {
    document.getElementById('userForm').reset();
    editingUserIndex = null;
}

function filterUsers() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.nome.toLowerCase().includes(searchValue) || 
        user.cpf.includes(searchValue)
    );

    const tbody = document.getElementById('userTable').querySelector('tbody');
    tbody.innerHTML = '';

    filteredUsers.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.cpf}</td>
            <td>${user.telefone}</td>
            <td>${user.cargo}</td>
            <td>${user.observacoes}</td>
            <td>
                <button onclick="editUser(${index})">Alterar</button>
                <button onclick="deleteUser(${index})">Excluir</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}
