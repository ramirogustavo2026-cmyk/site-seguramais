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