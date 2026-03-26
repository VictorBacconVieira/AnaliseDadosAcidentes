const fs = require("fs");

const texto = fs.readFileSync("e.csv", "utf-8");

const linhas = texto.trim().split(/\r?\n/);

let x = [];
let y = [];


for (let i = 1; i < linhas.length; i++) {
    let valores = linhas[i].split(",");

    if (valores.length >= 2) {
        x.push(Number(valores[0]));
        y.push(Number(valores[1]));
    }
}

function calcularRegressao(x, y) {
    let n = x.length;

    let somaX = 0, somaY = 0, somaXY = 0, somaX2 = 0;

    for (let i = 0; i < n; i++) {
        somaX += x[i];
        somaY += y[i];
        somaXY += x[i] * y[i];
        somaX2 += x[i] * x[i];
    }

    let b = (n * somaXY - somaX * somaY) / (n * somaX2 - somaX * somaX);
    let a = (somaY - b * somaX) / n;

    let mediaY = somaY / n;
    let ssTotal = 0;
    let ssRes = 0;

    for (let i = 0; i < n; i++) {
        let yPrev = a + b * x[i];
        ssTotal += Math.pow(y[i] - mediaY, 2);
        ssRes += Math.pow(y[i] - yPrev, 2);
    }

    let r2 = 1 - (ssRes / ssTotal);

    console.log("Equação: y = " + a.toFixed(2) + " + " + b.toFixed(2) + "x");
    console.log("R² = " + r2.toFixed(4));
}

calcularRegressao(x, y);