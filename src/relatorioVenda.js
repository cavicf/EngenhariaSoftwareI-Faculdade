document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const dataInicial = document.getElementById('data-inicial').value;
    const dataFinal = document.getElementById('data-final').value;
    const tipoProduto = document.getElementById('tipo-produto').value;
    const categoria = document.getElementById('categoria').value;

    // Mock de dados
    const vendas = [
        { dataVenda: '2024-11-10', produto: 'Caderno', quantidade: 10, valorTotal: 50.00, tipoProduto: 'material-escolar', categoria: 'categoria1' },
        { dataVenda: '2024-11-11', produto: 'Caneta', quantidade: 20, valorTotal: 40.00, tipoProduto: 'material-escolar', categoria: 'categoria2' },
        { dataVenda: '2024-11-12', produto: 'Lápis', quantidade: 15, valorTotal: 22.50, tipoProduto: 'material-escolar', categoria: 'categoria1' },
        { dataVenda: '2024-11-13', produto: 'Papel', quantidade: 30, valorTotal: 90.00, tipoProduto: 'material-escritorio', categoria: 'categoria2' },
    ];

    // Filtrando os dados conforme os filtros selecionados
    const filteredVendas = vendas.filter(venda => {
        const vendaData = venda.dataVenda; // A data já está no formato yyyy-mm-dd
        return vendaData >= dataInicial && vendaData <= dataFinal && 
               (tipoProduto === 'todos' || venda.tipoProduto === tipoProduto) &&
               (categoria === 'todos' || venda.categoria === categoria);
    });

    // Exibindo a tabela com as vendas filtradas
    const tbody = document.querySelector('#sales-report tbody');
    tbody.innerHTML = '';
    let totalValor = 0;
    let totalQuantidade = 0;
    filteredVendas.forEach(venda => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${venda.dataVenda}</td>
            <td>${venda.produto}</td>
            <td>${venda.quantidade}</td>
            <td>R$ ${venda.valorTotal.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
        totalValor += venda.valorTotal;
        totalQuantidade += venda.quantidade;
    });

    // Exibindo os totais
    document.getElementById('sub-total').textContent = `R$ ${totalValor.toFixed(2)}`;
    document.getElementById('total-geral').textContent = `R$ ${totalValor.toFixed(2)}`;
    document.getElementById('totals').style.display = 'block';

    // Exibindo o gráfico
    const ctx = document.getElementById('bar-chart').getContext('2d');
    const chartData = {
        labels: ['Material Escolar', 'Material de Escritório'],
        datasets: [{
            label: 'Total Vendas (R$)',
            data: [totalValor, totalValor], // Mocked values; ideally it should be categorized
            backgroundColor: ['#6f42c1', '#d63384'],
            borderColor: ['#6f42c1', '#d63384'],
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Exibindo a tabela e o gráfico
    document.getElementById('sales-report').style.display = 'table';
    document.getElementById('chart-container').style.display = 'block';
});
