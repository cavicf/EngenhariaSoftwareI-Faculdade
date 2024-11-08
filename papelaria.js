const clientes = [];

document.getElementById('clienteForm').addEventListener('submit', function (event) {
  event.preventDefault();
  
  const nome = document.getElementById('nome').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const observacoes = document.getElementById('observacoes').value.trim();

  // Validação de CPF único
  if (clientes.some(cliente => cliente.cpf === cpf)) {
    alert("O CPF informado já existe no sistema.");
    return;
  }

  // Validação de telefone
  if (!validarTelefone(telefone)) {
    alert("O telefone deve estar no formato (00) 00000-0000.");
    return;
  }

  const cliente = { nome, cpf, endereco, telefone, observacoes };
  clientes.push(cliente);
  renderClientes();
  document.getElementById('clienteForm').reset();
});

function renderClientes() {
  const clienteTable = document.getElementById('clienteTable').getElementsByTagName('tbody')[0];
  clienteTable.innerHTML = '';
  
  clientes
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .forEach((cliente) => {
      const row = clienteTable.insertRow();
      row.insertCell(0).textContent = cliente.nome;
      row.insertCell(1).textContent = cliente.cpf;
      row.insertCell(2).textContent = cliente.endereco;
      row.insertCell(3).textContent = cliente.telefone;
      row.insertCell(4).textContent = cliente.observacoes;
    });
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