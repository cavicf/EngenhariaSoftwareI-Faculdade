document.getElementById("form-produto").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const fornecedor = document.getElementById("fornecedor").value;
    const tipo = document.getElementById("tipo").value;
    const categoria = document.getElementById("categoria").value;
    const marca = document.getElementById("marca").value;
    const observacoes = document.getElementById("observacoes").value;
  
    const produto = { nome, preco, fornecedor, tipo, categoria, marca, observacoes };
  
    // Adiciona o produto na lista
    const tabela = document.getElementById("produtos-list");
    const novaLinha = document.createElement("tr");
  
    novaLinha.innerHTML = 
        `<td>${produto.nome}</td>
        <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
        <td>${produto.fornecedor}</td>
        <td>${produto.tipo}</td>
        <td>${produto.categoria}</td>
        <td>${produto.marca}</td>
        <td>${produto.observacoes}</td>
        <td>
            <button class="btn-edit">Editar</button>
            <button class="btn-delete">Excluir</button>
        </td>`;
  
    tabela.appendChild(novaLinha);
  
    // Limpa o formulário após inserção
    document.getElementById("form-produto").reset();
  });
  
  document.getElementById("produtos-list").addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-delete")) {
        // Exclui o produto da lista
        event.target.parentElement.parentElement.remove();
    } else if (event.target.classList.contains("btn-edit")) {
        // Edita o produto
        const linha = event.target.parentElement.parentElement;
        const nome = linha.children[0].textContent;
        const preco = linha.children[1].textContent.replace('R$', '').trim();
        const fornecedor = linha.children[2].textContent;
        const tipo = linha.children[3].textContent;
        const categoria = linha.children[4].textContent;
        const marca = linha.children[5].textContent;
        const observacoes = linha.children[6].textContent;
  
        document.getElementById("nome").value = nome;
        document.getElementById("preco").value = preco;
        document.getElementById("fornecedor").value = fornecedor;
        document.getElementById("tipo").value = tipo;
        document.getElementById("categoria").value = categoria;
        document.getElementById("marca").value = marca;
        document.getElementById("observacoes").value = observacoes;
  
        // Remove a linha antes de editar para evitar duplicação
        linha.remove();
    }
  });
  