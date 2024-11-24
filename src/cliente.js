document.getElementById("form-cliente").addEventListener("submit", function (event) {
  event.preventDefault();
  
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const observacoes = document.getElementById("observacoes").value;

  const cliente = { nome, cpf, endereco, telefone, observacoes };

  const tabela = document.getElementById("clientes-list");
  const novaLinha = document.createElement("tr");

  novaLinha.innerHTML = 
      `<td>${cliente.nome}</td>
      <td>${cliente.cpf}</td>
      <td>${cliente.endereco}</td>
      <td>${cliente.telefone}</td>
      <td>${cliente.observacoes}</td> <!-- Coluna de Observações -->
      <td>
          <button class="btn-edit">Editar</button>
          <button class="btn-delete">Excluir</button>
      </td> <!-- Coluna de Ações -->
      `;

  tabela.appendChild(novaLinha);

  document.getElementById("form-cliente").reset();
});

document.getElementById("clientes-list").addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-delete")) {
      event.target.parentElement.parentElement.remove();
  } else if (event.target.classList.contains("btn-edit")) {
      const linha = event.target.parentElement.parentElement;
      const nome = linha.children[0].textContent;
      const cpf = linha.children[1].textContent;
      const endereco = linha.children[2].textContent;
      const telefone = linha.children[3].textContent;
      const observacoes = linha.children[4].textContent; // Pega o valor da coluna de observações

      document.getElementById("nome").value = nome;
      document.getElementById("cpf").value = cpf;
      document.getElementById("endereco").value = endereco;
      document.getElementById("telefone").value = telefone;
      document.getElementById("observacoes").value = observacoes; // Preenche o campo de observações no formulário

      // Remover a linha antes de editar para evitar duplicação
      linha.remove();
  }
});
