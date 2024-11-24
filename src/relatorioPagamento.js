// Dados fictícios para exemplo
const pagamentos = [
    { cargo: "Funcionário", nome: "João", valor: 1200 },
    { cargo: "Funcionário", nome: "Maria", valor: 1300 },
    { cargo: "Gerente", nome: "Carlos", valor: 2000 },
    { cargo: "Outros", nome: "Ana", valor: 900 },
];

// Função para gerar o relatório
function gerarRelatorio() {
    const dataInicial = document.getElementById("data-inicial").value;
    const dataFinal = document.getElementById("data-final").value;
    const cargoSelecionado = document.getElementById("cargo").value;

    if (!dataInicial || !dataFinal) {
        alert("Por favor, preencha as datas obrigatórias.");
        return;
    }

    const relatorioContainer = document.getElementById("relatorio-container");
    relatorioContainer.innerHTML = ""; // Limpa o relatório anterior

    let subtotal = 0;
    let totalGeral = 0;

    const dadosFiltrados = pagamentos.filter((pagamento) => {
        return cargoSelecionado === "todos" || pagamento.cargo.toLowerCase() === cargoSelecionado.toLowerCase();
    });

    if (dadosFiltrados.length === 0) {
        relatorioContainer.innerHTML = `<p>Nenhum dado encontrado para os filtros selecionados.</p>`;
        return;
    }

    dadosFiltrados.forEach((pagamento) => {
        subtotal += pagamento.valor;
        totalGeral += pagamento.valor;
        relatorioContainer.innerHTML += `
            <div class="relatorio-item">
                <h3>Cargo: ${pagamento.cargo}</h3>
                <p>Funcionário: ${pagamento.nome}</p>
                <p>Valor Pago: R$${pagamento.valor.toFixed(2)}</p>
            </div>
        `;
    });

    relatorioContainer.innerHTML += `
        <h4>Subtotal: R$${subtotal.toFixed(2)}</h4>
        <h4>Total Geral Pago: R$${totalGeral.toFixed(2)}</h4>
    `;

    gerarGrafico(dadosFiltrados);
}

// Função para gerar o gráfico de barras
function gerarGrafico(dados) {
    const ctx = document.getElementById("grafico-pagamentos").getContext("2d");

    const dadosPorCargo = dados.reduce((acc, curr) => {
        acc[curr.cargo] = (acc[curr.cargo] || 0) + curr.valor;
        return acc;
    }, {});

    const cargos = Object.keys(dadosPorCargo);
    const valores = Object.values(dadosPorCargo);

    // Remove o gráfico existente antes de criar outro
    if (window.grafico) {
        window.grafico.destroy();
    }

    // Cria o novo gráfico
    window.grafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: cargos,
            datasets: [{
                label: "Total Pago",
                data: valores,
                backgroundColor: ["#6f42c1", "#d63384", "#6e32a7"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
            }
        }
    });
}

// Adiciona o evento ao botão "Gerar Relatório"
document.getElementById("gerar-relatorio-btn").addEventListener("click", gerarRelatorio);
