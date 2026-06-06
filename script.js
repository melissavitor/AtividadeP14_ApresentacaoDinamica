const catalogo = [
    {
        id: 1,
        titulo: "Interestelar",
        tipo: "filme",
        ano: 2014,
        generos: ["ficção científica", "aventura"],
        nota: 9.5,
        assistido: true
    },
    {
        id: 2,
        titulo: "Breaking Bad",
        tipo: "serie",
        ano: 2008,
        generos: ["drama", "crime"],
        nota: 9.8,
        assistido: true
    },
    {
        id: 3,
        titulo: "O Poderoso Chefão",
        tipo: "filme",
        ano: 1972,
        generos: ["drama", "crime"],
        nota: 9.2,
        assistido: false
    },
    {
        id: 4,
        titulo: "Stranger Things",
        tipo: "serie",
        ano: 2016,
        generos: ["ficção científica", "terror", "aventura"],
        nota: 8.7,
        assistido: true
    },
    {
        id: 5,
        titulo: "Parasita",
        tipo: "filme",
        ano: 2019,
        generos: ["drama", "suspense"],
        nota: 8.6,
        assistido: false
    },
    {
        id: 6,
        titulo: "Dark",
        tipo: "serie",
        ano: 2017,
        generos: ["ficção científica", "drama"],
        nota: 8.8,
        assistido: false
    },
    {
        id: 7,
        titulo: "Coringa",
        tipo: "filme",
        ano: 2019,
        generos: ["drama", "ação"],
        nota: 8.5,
        assistido: true
    },
    {
        id: 8,
        titulo: "The Last of Us",
        tipo: "serie",
        ano: 2023,
        generos: ["drama", "ação"],
        nota: 9.0,
        assistido: false
    }
];

console.log("=== Catálogo completo ===");
console.log(catalogo);

console.log("\nTítulo do primeiro item:", catalogo[0].titulo);

console.log("Ano do último item:", catalogo[catalogo.length - 1].ano);

if (catalogo[2].generos[1]) {
    console.log("Segundo gênero do terceiro item:", catalogo[2].generos[1]);
} else {
    console.log("O terceiro item não tem um segundo gênero.");
}

console.log("\n=== Todos os títulos (forEach) ===");

catalogo.forEach(function (item) {
    console.log("- [" + item.tipo + "] " + item.titulo + " (" + item.ano + ")");
});

console.log("\n=== Títulos em MAIÚSCULO (map) ===");

const titulosEmCaixaAlta = catalogo.map(function (item) {
    return item.titulo.toUpperCase();
});

console.log(titulosEmCaixaAlta);

console.log("\n=== Itens NÃO assistidos (filter) ===");

const naoAssistidos = catalogo.filter(function (item) {
    return item.assistido === false;
});

console.log("Quantidade de itens não assistidos:", naoAssistidos.length);
console.log(naoAssistidos);

console.log("\n=== Busca: primeiro item com nota >= 9 (find) ===");

const itemNotaAlta = catalogo.find(function (item) {
    return item.nota >= 9;
});

if (itemNotaAlta) {
    console.log("Título:", itemNotaAlta.titulo);
    console.log("Nota:", itemNotaAlta.nota);
} else {
    console.log("Nenhum item encontrado com nota >= 9.");
}

console.log("\n=== Médias das notas (reduce) ===");

const somaTodas = catalogo.reduce(function (acumulador, item) {
    return acumulador + item.nota;
}, 0);

const mediaGeral = somaTodas / catalogo.length;
console.log("Média geral:", mediaGeral.toFixed(2));

const apenasAssistidos = catalogo.filter(function (item) {
    return item.assistido === true;
});

const somaAssistidos = apenasAssistidos.reduce(function (acumulador, item) {
    return acumulador + item.nota;
}, 0);

const mediaAssistidos = somaAssistidos / apenasAssistidos.length;
console.log("Média dos assistidos:", mediaAssistidos.toFixed(2));

console.log("\n=== Checagens (some e every) ===");

const temItemAntigo = catalogo.some(function (item) {
    return item.ano < 2000;
});
console.log("Existe algum item com ano < 2000?", temItemAntigo);

const todosTemGenero = catalogo.every(function (item) {
    return item.generos.length >= 1;
});
console.log("Todos os itens têm pelo menos 1 gênero?", todosTemGenero);

const divOutput = document.getElementById("output");

const totalItens = catalogo.length;

const totalFilmes = catalogo.filter(function (item) {
    return item.tipo === "filme";
}).length;

const totalSeries = catalogo.filter(function (item) {
    return item.tipo === "serie";
}).length;

const totalNaoAssistidos = naoAssistidos.length;

const ranking = catalogo.slice();
ranking.sort(function (a, b) {
    return b.nota - a.nota;
});
const top3 = ranking.slice(0, 3);

let htmlResumo = "<h2>Resumo do Catálogo</h2>";
htmlResumo += "<p><strong>Total de itens:</strong> " + totalItens + "</p>";
htmlResumo += "<p><strong>Filmes:</strong> " + totalFilmes + " | <strong>Séries:</strong> " + totalSeries + "</p>";
htmlResumo += "<p><strong>Não assistidos:</strong> " + totalNaoAssistidos + "</p>";
htmlResumo += "<p><strong>Média geral de notas:</strong> " + mediaGeral.toFixed(2) + "</p>";

htmlResumo += "<h3>Top 3 maiores notas</h3><ol>";
top3.forEach(function (item) {
    htmlResumo += "<li>" + item.titulo + " — nota: " + item.nota + "</li>";
});
htmlResumo += "</ol>";

divOutput.innerHTML = htmlResumo;

// GRÁFIO: DISTRIBUIÇÃO POR GÊNERO

const contagemGeneros = {};

catalogo.forEach(function (item) {
    item.generos.forEach(function (genero) {
        if (contagemGeneros[genero]) {
            contagemGeneros[genero] = contagemGeneros[genero] + 1;
        } else {
            contagemGeneros[genero] = 1;
        }
    });
});

const rotulos = Object.keys(contagemGeneros);
const valores = Object.values(contagemGeneros);

const canvas = document.getElementById("graficoPizza");

new Chart(canvas, {
    type: "pie",
    data: {
        labels: rotulos,
        datasets: [{
            data: valores,
            backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
                "#9966FF", "#FF9F40", "#C9CBCF"
            ]
        }]
    },
    options: {
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }
});