const clientes = [];
const users = [];
let editingUserIndex = null;
let editingClientIndex = null;

// Função para adicionar ou atualizar cliente
document.getElementById('clienteForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const observacoes = document.getElementById('observacoes').value.trim();

  // Validação de CPF único
  if (clientes.some((cliente, index) => cliente.cpf === cpf && index !== editingClientIndex)) {
    alert("O CPF informado já existe no sistema.");
    return;
  }

  // Validação de telefone
  if (!validarTelefone(telefone)) {
    alert("O telefone deve estar no formato (00) 00000-0000.");
    return;
  }

  const cliente = { nome, cpf, endereco, telefone, observacoes };

  if (editingClientIndex !== null) {
    clientes[editingClientIndex] = cliente;
    editingClientIndex = null;
  } else {
    clientes.push(cliente);
  }

  renderClientes();
  document.getElementById('clienteForm').reset();
});

// Função para exibir clientes na tabela
function renderClientes() {
  const clienteTable = document.getElementById('clienteTable').getElementsByTagName('tbody')[0];
  clienteTable.innerHTML = '';

  clientes.sort((a, b) => a.nome.localeCompare(b.nome)).forEach((cliente, index) => {
    const row = clienteTable.insertRow();
    row.insertCell(0).textContent = cliente.nome;
    row.insertCell(1).textContent = cliente.cpf;
    row.insertCell(2).textContent = cliente.endereco;
    row.insertCell(3).textContent = cliente.telefone;
    row.insertCell(4).textContent = cliente.observacoes;

    // Coluna de Ações com botões Editar e Excluir
    const actionsCell = row.insertCell(5);
    actionsCell.innerHTML = `
      <button onclick="editClient(${index})">Editar</button>
      <button onclick="deleteClient(${index})">Excluir</button>
    `;
  });
}

// Função para editar cliente
function editClient(index) {
  const cliente = clientes[index];
  document.getElementById('nome').value = cliente.nome;
  document.getElementById('cpf').value = cliente.cpf;
  document.getElementById('endereco').value = cliente.endereco;
  document.getElementById('telefone').value = cliente.telefone;
  document.getElementById('observacoes').value = cliente.observacoes;

  editingClientIndex = index;
}

// Função para excluir cliente
function deleteClient(index) {
  if (confirm("Tem certeza que deseja excluir este cliente?")) {
    clientes.splice(index, 1);
    renderClientes();
  }
}

// Função de máscara para o telefone
function mascaraTelefone(event) {
  let valor = event.target.value.replace(/\D/g, ''); // Remove tudo o que não for número
  valor = valor.replace(/^(\d{2})(\d)/, "($1) $2"); // Adiciona parênteses e espaço
  valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2"); // Adiciona o traço
  event.target.value = valor;
}

// Função de validação do telefone
function validarTelefone(telefone) {
  const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return regex.test(telefone);
}

// Função para adicionar ou atualizar usuário
function addOrUpdateUser() {
  const nome = document.getElementById('usuario_nome').value.trim();
  const cpf = document.getElementById('usuario_cpf').value.trim();
  const telefone = document.getElementById('usuario_telefone').value.trim();
  const cargo = document.getElementById('usuario_cargo').value;
  const observacoes = document.getElementById('usuario_observacoes').value.trim();

  // Validação de duplicidade de CPF
  if (users.some((user, index) => user.cpf === cpf && index !== editingUserIndex)) {
    alert("CPF já cadastrado!");
    return;
  }

  const user = { nome, cpf, telefone, cargo, observacoes };

  if (editingUserIndex !== null) {
    users[editingUserIndex] = user;
    editingUserIndex = null;
  } else {
    users.push(user);
  }

  displayUsers();
  clearUserForm();
}

// Função para exibir usuários na tabela
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

// Função para editar usuário
function editUser(index) {
  const user = users[index];
  document.getElementById('usuario_nome').value = user.nome;
  document.getElementById('usuario_cpf').value = user.cpf;
  document.getElementById('usuario_telefone').value = user.telefone;
  document.getElementById('usuario_cargo').value = user.cargo;
  document.getElementById('usuario_observacoes').value = user.observacoes;

  editingUserIndex = index;
}

// Função para excluir usuário
function deleteUser(index) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    users.splice(index, 1);
    displayUsers();
  }
}

// Função para limpar o formulário de usuário
function clearUserForm() {
  document.getElementById('userForm').reset();
  editingUserIndex = null;
}

// Função de filtro de busca para usuários
function filterUsers() {
  const searchValue = document.getElementById('search').value.toLowerCase();
  const filteredUsers = users.filter(user =>
    user.nome.toLowerCase().includes(searchValue) || user.cpf.includes(searchValue)
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
