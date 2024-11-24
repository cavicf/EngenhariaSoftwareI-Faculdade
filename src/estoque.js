document.getElementById("estoqueForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nomeInput = document.getElementById("nome");
    const tipoInput = document.getElementById("tipo");
    const quantidadeInput = document.getElementById("quantidade");
    const observacoesInput = document.getElementById("observacoes");

    // Capturar os valores do formulário
    const nome = nomeInput.value.trim();
    const tipo = tipoInput.value;
    const quantidade = quantidadeInput.value;
    const observacoes = observacoesInput.value.trim();

    // Validação adicional para quantidade máxima (exemplo: 100)
    if (quantidade > 100) {
        alert("A quantidade máxima permitida no estoque é 100.");
        return;
    }

    // Verificar se estamos no modo de edição
    const isEditing = this.dataset.editing === "true";

    if (isEditing) {
        // Atualizar a linha sendo editada
        const editingRow = document.getElementById(this.dataset.editingRowId);

        editingRow.cells[0].textContent = nome;
        editingRow.cells[1].textContent = tipo;
        editingRow.cells[2].textContent = quantidade;
        editingRow.cells[3].textContent = observacoes;

        // Limpar o estado de edição
        delete this.dataset.editing;
        delete this.dataset.editingRowId;

        // Alterar o texto do botão para "Adicionar Produto"
        this.querySelector("button").textContent = "Adicionar Produto";
    } else {
        // Adicionar uma nova linha na tabela
        const tableBody = document.getElementById("estoqueTable").querySelector("tbody");
        const row = tableBody.insertRow();

        // Gera um ID único para a linha
        const rowId = `row-${Date.now()}`;
        row.id = rowId;

        row.innerHTML = `
            <td>${nome}</td>
            <td>${tipo}</td>
            <td>${quantidade}</td>
            <td>${observacoes}</td>
            <td>
                <div class="btn-group">
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Excluir</button>
                </div>
            </td>
        `;

        // Eventos de editar e excluir
        row.querySelector(".btn-edit").addEventListener("click", function () {
            // Preencher os campos do formulário com os valores da linha
            nomeInput.value = row.cells[0].textContent;
            tipoInput.value = row.cells[1].textContent;
            quantidadeInput.value = row.cells[2].textContent;
            observacoesInput.value = row.cells[3].textContent;

            // Alterar o formulário para o modo de edição
            document.getElementById("estoqueForm").dataset.editing = "true";
            document.getElementById("estoqueForm").dataset.editingRowId = rowId;

            // Alterar o botão para "Salvar Alterações"
            document.getElementById("estoqueForm").querySelector("button").textContent = "Salvar Alterações";
        });

        row.querySelector(".btn-delete").addEventListener("click", function () {
            if (confirm("Tem certeza que deseja excluir este produto?")) {
                row.remove();
            }
        });
    }

    // Resetar o formulário após salvar ou adicionar
    this.reset();
});
