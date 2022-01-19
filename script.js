let order = [];
let clickedOrder = [];
let score = 0;
let bestScore = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1, (i==order.length-1));
    }
}

//acende a proxima cor
let lightColor = (element, number, last) => {
    number = number * 1000;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 500);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
    if (last) {
        setTimeout(() => {
           msg('Sua vez.');
        }, number + 1000);
    }

}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            return;
        }
    }
    if (clickedOrder.length == order.length) {
        score++;
        msg(`Você acertou!  Iniciando próximo nível...`);
        setTimeout(nextLevel, 2000);
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        if (order.length) {
            checkOrder();
        }
        
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    msg("Preste atenção na sequência!");
    setTimeout(shuffleOrder(), 500);
}

//funcao para game over
let gameOver = () => {
    msg(` Você perdeu o jogo! Pontuação: ${score}`);
    if (score > bestScore) {
        bestScore = score;
        document.getElementById('melhor_pontuacao').innerHTML = bestScore;
    }
    order = [];
    clickedOrder = [];

    
}

//funcao de inicio do jogo
let playGame = () => {
    msg('Iniciando novo jogo!');
    nextLevel();
}

let msg = function (msg) {
    document.getElementById("mensagem").innerHTML = msg;
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//inicio do jogo
msg("Bem vindo ao Gênesis!");