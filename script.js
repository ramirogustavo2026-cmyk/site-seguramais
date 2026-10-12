/* =========================
   CARROSSEL DE SEGUROS
========================= */

const trilho = document.querySelector(".seguros-trilho");
const cards = document.querySelectorAll(".seguro-card");
const btnEsquerda = document.querySelector(".carrossel-seta.esquerda");
const btnDireita = document.querySelector(".carrossel-seta.direita");
const indicadores = document.querySelectorAll(".carrossel-indicadores span");

let indiceAtual = 0;


function quantidadeVisivel() {

    if (window.innerWidth <= 900) {
        return 1;
    }

    return 3;
}


function atualizarCarrossel() {

    if (!trilho || cards.length === 0) {
        return;
    }

    const visiveis = quantidadeVisivel();

    const larguraCard = cards[0].offsetWidth;
    const gap = 18;

    const maxIndice = cards.length - visiveis;


    if (indiceAtual > maxIndice) {
        indiceAtual = maxIndice;
    }

    if (indiceAtual < 0) {
        indiceAtual = 0;
    }


    const deslocamento =
        indiceAtual * (larguraCard + gap);


    trilho.style.transform =
        `translateX(-${deslocamento}px)`;


    indicadores.forEach((indicador) => {
        indicador.classList.remove("ativo");
    });


    if (indicadores[indiceAtual]) {
        indicadores[indiceAtual].classList.add("ativo");
    }

}


/* SÓ EXECUTA SE O CARROSSEL EXISTIR */

if (
    trilho &&
    cards.length > 0 &&
    btnDireita &&
    btnEsquerda
) {

    btnDireita.addEventListener("click", () => {

        const visiveis = quantidadeVisivel();

        const maxIndice =
            cards.length - visiveis;


        if (indiceAtual < maxIndice) {

            indiceAtual++;

        } else {

            indiceAtual = 0;

        }


        atualizarCarrossel();

    });


    btnEsquerda.addEventListener("click", () => {

        const visiveis = quantidadeVisivel();

        const maxIndice =
            cards.length - visiveis;


        if (indiceAtual > 0) {

            indiceAtual--;

        } else {

            indiceAtual = maxIndice;

        }


        atualizarCarrossel();

    });


    indicadores.forEach((indicador, indice) => {

        indicador.addEventListener("click", () => {

            const visiveis = quantidadeVisivel();

            const maxIndice =
                cards.length - visiveis;


            if (indice <= maxIndice) {

                indiceAtual = indice;

                atualizarCarrossel();

            }

        });

    });


    window.addEventListener(
        "resize",
        atualizarCarrossel
    );


    atualizarCarrossel();

}


/* =========================
   MENU MOBILE
========================= */

const botaoMenuMobile =
    document.querySelector(".menu-mobile-btn");

const menuMobile =
    document.querySelector(".menu-mobile");


if (botaoMenuMobile && menuMobile) {

    botaoMenuMobile.addEventListener(
        "click",
        () => {

            menuMobile.classList.toggle("ativo");

        }
    );


    const linksMenuMobile =
        document.querySelectorAll(".menu-mobile a");


    linksMenuMobile.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                menuMobile.classList.remove("ativo");

            }
        );

    });

}

/* =========================================================
   CARROSSEL - SEGURO AUTO
========================================================= */

const autoTrilho = document.querySelector(
    ".seguro-auto-carrossel-trilho"
);

const autoCards = document.querySelectorAll(
    ".seguro-auto-carrossel-trilho .seguro-auto-cobertura-card"
);

const autoBtnEsquerda = document.querySelector(
    ".seguro-auto-carrossel-esquerda"
);

const autoBtnDireita = document.querySelector(
    ".seguro-auto-carrossel-direita"
);

const autoIndicadores = document.querySelectorAll(
    ".seguro-auto-carrossel-indicadores span"
);

const autoCarrossel = document.querySelector(
    ".seguro-auto-carrossel"
);


let autoIndice = 0;

let autoIntervalo;


/* QUANTIDADE VISÍVEL */

function autoQuantidadeVisivel() {

    if (window.innerWidth <= 560) {
        return 1;
    }

    if (window.innerWidth <= 950) {
        return 2;
    }

    return 4;
}


/* TOTAL DE POSIÇÕES */

function autoTotalPosicoes() {

    return Math.max(
        0,
        autoCards.length - autoQuantidadeVisivel()
    );
}


/* ATUALIZAR CARROSSEL */

function atualizarCarrosselAuto() {

    if (
        !autoTrilho ||
        autoCards.length === 0
    ) {
        return;
    }


    const quantidadeVisivel =
        autoQuantidadeVisivel();

    const totalPosicoes =
        autoTotalPosicoes();


    if (autoIndice > totalPosicoes) {
        autoIndice = 0;
    }


    const gap =
        window.innerWidth <= 560
            ? 14
            : 20;


    const larguraJanela =
        autoTrilho.parentElement.clientWidth;


    const larguraCard =
        (
            larguraJanela -
            gap * (quantidadeVisivel - 1)
        ) / quantidadeVisivel;


    const deslocamento =
        autoIndice *
        (larguraCard + gap);


    autoTrilho.style.transform =
        `translateX(-${deslocamento}px)`;


    atualizarIndicadoresAuto();

}


/* INDICADORES */

function atualizarIndicadoresAuto() {

    autoIndicadores.forEach(
        (indicador, indice) => {

            indicador.classList.toggle(
                "ativo",
                indice === autoIndice
            );

        }
    );

}


/* PRÓXIMO */

function proximoAuto() {

    const totalPosicoes =
        autoTotalPosicoes();


    if (autoIndice >= totalPosicoes) {

        autoIndice = 0;

    } else {

        autoIndice++;

    }


    atualizarCarrosselAuto();

}


/* ANTERIOR */

function anteriorAuto() {

    const totalPosicoes =
        autoTotalPosicoes();


    if (autoIndice <= 0) {

        autoIndice = totalPosicoes;

    } else {

        autoIndice--;

    }


    atualizarCarrosselAuto();

}


/* AUTOPLAY */

function iniciarAutoPlay() {

    pararAutoPlay();


    autoIntervalo = setInterval(
        proximoAuto,
        3500
    );

}


function pararAutoPlay() {

    if (autoIntervalo) {

        clearInterval(autoIntervalo);

    }

}


/* EVENTOS */

if (
    autoTrilho &&
    autoCards.length > 0 &&
    autoBtnDireita &&
    autoBtnEsquerda
) {

    autoBtnDireita.addEventListener(
        "click",
        () => {

            proximoAuto();

            iniciarAutoPlay();

        }
    );


    autoBtnEsquerda.addEventListener(
        "click",
        () => {

            anteriorAuto();

            iniciarAutoPlay();

        }
    );


    autoCarrossel.addEventListener(
        "mouseenter",
        pararAutoPlay
    );


    autoCarrossel.addEventListener(
        "mouseleave",
        iniciarAutoPlay
    );


    window.addEventListener(
        "resize",
        () => {

            autoIndice = 0;

            atualizarCarrosselAuto();

        }
    );


    atualizarCarrosselAuto();

    iniciarAutoPlay();

}