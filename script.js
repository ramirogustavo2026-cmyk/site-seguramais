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

/* =========================================================
   MODAL DE COTAÇÃO - SEGURO AUTO
========================================================= */

let etapaCotacaoAuto = 1;

let tipoSeguroAtual = "Auto";

let cepValidado = false;


function abrirModal(servico = "Auto") {

    if (
        servico !== "Auto" &&
        servico !== "Moto"
    ) {
        return;
    }


    tipoSeguroAtual = servico;


    const modal =
        document.getElementById(
            "modal-overlay"
        );


    const headerText =
        document.getElementById(
            "modal-header-text"
        );


    const headerIcon =
        document.getElementById(
            "modal-header-icon"
        );


    if (!modal) {
        return;
    }


    etapaCotacaoAuto = 1;


    /* =====================================================
       ESCONDE OS FLUXOS
    ====================================================== */

    const fluxoAuto =
        document.getElementById(
            "fluxo-auto"
        );


    const fluxoMoto =
        document.getElementById(
            "fluxo-moto"
        );


    if (fluxoAuto) {
        fluxoAuto.style.display = "none";
    }


    if (fluxoMoto) {
        fluxoMoto.style.display = "none";
    }


    /* =====================================================
       SEGURO AUTO
    ====================================================== */

    if (servico === "Auto") {

        if (headerText) {
            headerText.textContent =
                "SEGURO AUTO";
        }


        if (headerIcon) {

            headerIcon.innerHTML =
                '<i data-lucide="car"></i>';

        }


        if (fluxoAuto) {
            fluxoAuto.style.display =
                "block";
        }

    }


    /* =====================================================
       SEGURO MOTO
    ====================================================== */

    if (servico === "Moto") {

        if (headerText) {
            headerText.textContent =
                "SEGURO MOTO";
        }


        if (headerIcon) {

            headerIcon.innerHTML =
                '<i data-lucide="bike"></i>';

        }


        if (fluxoMoto) {
            fluxoMoto.style.display =
                "block";
        }

    }


    mostrarEtapaCotacaoAuto();


    modal.style.display = "flex";

    modal.classList.add("active");


    document.body.style.overflow =
        "hidden";


    if (
        typeof lucide !== "undefined"
    ) {

        lucide.createIcons();

    }

}


/* =========================================================
   FECHAR MODAL
========================================================= */

function fecharModal() {

    const modal = document.getElementById(
        "modal-overlay"
    );

    const form = document.getElementById(
        "form-cotacao"
    );


    if (modal) {

        modal.style.display = "none";

        modal.classList.remove("active");

    }


    document.body.style.overflow = "";


    if (form) {
        form.reset();
    }


    etapaCotacaoAuto = 1;
    limparErros();


    /* Outra pessoa */

    const camposOutraPessoa =
        document.getElementById(
            "campos-outra-pessoa"
        );


    if (camposOutraPessoa) {

        camposOutraPessoa.style.display =
            "none";


        camposOutraPessoa
            .querySelectorAll("input")
            .forEach(campo => {

                campo.removeAttribute(
                    "required"
                );

            });

    }


    /* Volta Segurado como opção ativa */

    const botoesCondutor =
        document.querySelectorAll(
            "#step-3-auto .btn-option"
        );


    botoesCondutor.forEach(botao => {

        botao.classList.remove("active");

    });


    if (botoesCondutor.length > 0) {

        botoesCondutor[0]
            .classList.add("active");

    }


    mostrarEtapaCotacaoAuto();

}


/* =========================================================
   MOSTRAR ETAPA
========================================================= */

function mostrarEtapaCotacaoAuto() {

    const etapas =
        document.querySelectorAll(
            "#form-cotacao .step"
        );


    etapas.forEach(etapa => {

        etapa.classList.remove(
            "active"
        );

        etapa.style.display =
            "none";

    });


    let etapa;


    if (
        etapaCotacaoAuto === 1 ||
        etapaCotacaoAuto === 2
    ) {

        etapa =
            document.getElementById(
                `step-${etapaCotacaoAuto}`
            );

    } else {

        const sufixo =
            tipoSeguroAtual === "Moto"
                ? "moto"
                : "auto";


        etapa =
            document.getElementById(
                `step-${etapaCotacaoAuto}-${sufixo}`
            );

    }


    if (etapa) {

        etapa.classList.add(
            "active"
        );

        etapa.style.display =
            "block";

    }


    atualizarProgressoCotacaoAuto();

}


function atualizarProgressoCotacaoAuto() {

    const itens =
        document.querySelectorAll(
            ".cotacao-progresso-item"
        );


    const linhas =
        document.querySelectorAll(
            ".cotacao-progresso-linha"
        );


    itens.forEach(item => {

        const numeroEtapa =
            Number(
                item.dataset.etapa
            );


        item.classList.remove(
            "ativo",
            "concluido"
        );


        if (
            numeroEtapa ===
            etapaCotacaoAuto
        ) {

            item.classList.add(
                "ativo"
            );

        }


        if (
            numeroEtapa <
            etapaCotacaoAuto
        ) {

            item.classList.add(
                "concluido"
            );

        }

    });


    linhas.forEach(
        (linha, indice) => {

            linha.classList.remove(
                "concluida"
            );


            if (
                indice <
                etapaCotacaoAuto - 1
            ) {

                linha.classList.add(
                    "concluida"
                );

            }

        }
    );

}


/* =========================================================
   PRÓXIMA ETAPA
========================================================= */

function proximaEtapa() {

    if (!validarEtapaCotacaoAuto()) {
        return;
    }


    if (etapaCotacaoAuto < 5) {

        etapaCotacaoAuto++;

        mostrarEtapaCotacaoAuto();

    }

}


/* =========================================================
   ETAPA ANTERIOR
========================================================= */

function etapaAnterior() {

    if (etapaCotacaoAuto > 1) {

        etapaCotacaoAuto--;

        mostrarEtapaCotacaoAuto();

    }

}


/* =========================================================
   CONDUTOR
========================================================= */

function selecionarTipoCondutor(
    tipo,
    elemento
) {

    const botoes =
        document.querySelectorAll(
            "#step-3-auto .btn-option"
        );


    botoes.forEach(botao => {

        botao.classList.remove("active");

    });


    elemento.classList.add("active");


    const camposOutraPessoa =
        document.getElementById(
            "campos-outra-pessoa"
        );


    if (!camposOutraPessoa) {
        return;
    }


    const campos =
        camposOutraPessoa.querySelectorAll(
            "input"
        );


    if (tipo === "outra_pessoa") {

        camposOutraPessoa.style.display =
            "block";


        campos.forEach(campo => {

            campo.setAttribute(
                "required",
                "true"
            );

        });

    } else {

        camposOutraPessoa.style.display =
            "none";


        campos.forEach(campo => {

            campo.removeAttribute(
                "required"
            );

            campo.value = "";

        });

    }

}

/* =========================================================
   CONDICIONAIS - SEGURO MOTO
========================================================= */


/* USO DA MOTO */

function verificarUsoMoto(valor) {

    const local =
        document.getElementById(
            "cond-p1-local"
        );


    const km =
        document.getElementById(
            "cond-p1-km"
        );


    if (local) {

        local.style.display =
            (
                valor === "1" ||
                valor === "3"
            )
                ? "block"
                : "none";

    }


    if (km) {

        km.style.display =
            (
                valor === "2" ||
                valor === "3"
            )
                ? "block"
                : "none";

    }

}


/* GARAGEM À NOITE */

function verificarGaragemNoite(
    valor
) {

    const tipoGaragem =
        document.getElementById(
            "cond-p2-tipo-garagem"
        );


    const localNoite =
        document.getElementById(
            "cond-p2-onde-estaciona"
        );


    if (tipoGaragem) {

        tipoGaragem.style.display =
            valor === "1"
                ? "block"
                : "none";

    }


    if (localNoite) {

        localNoite.style.display =
            valor === "2"
                ? "block"
                : "none";

    }

}


/* ESTACIONAMENTO NO TRABALHO */

function verificarEstacionamentoTrabalho(
    valor
) {

    const seguranca =
        document.getElementById(
            "cond-p3-seguranca"
        );


    const alertaRua =
        document.getElementById(
            "cond-p3-alerta-rua"
        );


    if (seguranca) {

        seguranca.style.display =
            valor === "2"
                ? "block"
                : "none";

    }


    if (alertaRua) {

        alertaRua.style.display =
            valor === "3"
                ? "block"
                : "none";

    }

}


/* ENTREGAS */

function verificarEntregas(
    valor
) {

    const horas =
        document.getElementById(
            "cond-p4-horas"
        );


    if (horas) {

        horas.style.display =
            valor === "1"
                ? "block"
                : "none";

    }

}


/* IDADE */

function verificarIdadeMoto(
    valor
) {

    const alerta =
        document.getElementById(
            "alerta-bloqueio-idade"
        );


    const botao =
        document.getElementById(
            "btn-next-step-4-moto"
        );


    if (
        valor === "menos_18"
    ) {

        if (alerta) {

            alerta.style.display =
                "block";

        }


        if (botao) {

            botao.disabled =
                true;

        }

    } else {

        if (alerta) {

            alerta.style.display =
                "none";

        }


        if (botao) {

            botao.disabled =
                false;

        }

    }

}


/* TEMPO DE HABILITAÇÃO */

function verificarHabilitacaoMoto(
    valor
) {

    const experiencia =
        document.getElementById(
            "cond-p6-experiencia"
        );


    if (experiencia) {

        experiencia.style.display =
            valor === "1"
                ? "block"
                : "none";

    }

}


/* FINALIDADE DO SEGURO */

function verificarFinalidadeSeguro(
    valor
) {

    const coberturas =
        document.getElementById(
            "cond-p8-coberturas"
        );


    if (coberturas) {

        coberturas.style.display =
            valor === "4"
                ? "block"
                : "none";

    }

}


/* HISTÓRICO DE ACIDENTES */

function verificarAcidentes(
    valor
) {

    const detalhes =
        document.getElementById(
            "cond-p9-detalhes-acidente"
        );


    const observacoes =
        document.getElementById(
            "cond-p9-observacoes"
        );


    if (detalhes) {

        detalhes.style.display =
            valor === "1"
                ? "block"
                : "none";

    }


    if (observacoes) {

        observacoes.style.display =
            valor === "2"
                ? "block"
                : "none";

    }

}

/* =========================================================
   VALIDAÇÃO DO FORMULÁRIO - SEGURO AUTO
========================================================= */

function mostrarErroCampo(
    campo,
    mensagem = "Por favor, preencha este campo."
) {

    campo.classList.add("erro");


    const inputGroup =
        campo.closest(".input-group");


    if (!inputGroup) {
        return;
    }


    let mensagemErro =
        inputGroup.querySelector(
            ".erro-mensagem"
        );


    if (!mensagemErro) {

        mensagemErro =
            document.createElement("span");


        mensagemErro.className =
            "erro-mensagem";


        inputGroup.appendChild(
            mensagemErro
        );

    }


    mensagemErro.textContent =
        mensagem;

}


/* =========================================================
   LIMPAR ERRO DE UM CAMPO
========================================================= */

function limparErroCampo(campo) {

    campo.classList.remove("erro");


    const inputGroup =
        campo.closest(".input-group");


    if (!inputGroup) {
        return;
    }


    const mensagemErro =
        inputGroup.querySelector(
            ".erro-mensagem"
        );


    if (mensagemErro) {
        mensagemErro.remove();
    }

}


/* =========================================================
   LIMPAR TODOS OS ERROS
========================================================= */

function limparErros() {

    document
        .querySelectorAll(
            "#form-cotacao .erro"
        )
        .forEach(campo => {

            campo.classList.remove("erro");

        });


    document
        .querySelectorAll(
            "#form-cotacao .erro-mensagem"
        )
        .forEach(mensagem => {

            mensagem.remove();

        });

}


/* =========================================================
   VALIDAR ETAPA ATUAL
========================================================= */

function validarEtapaCotacaoAuto() {

    let etapa;


    if (
        etapaCotacaoAuto === 1 ||
        etapaCotacaoAuto === 2
    ) {

        etapa =
            document.getElementById(
                `step-${etapaCotacaoAuto}`
            );

    } else {

        const sufixo =
            tipoSeguroAtual === "Moto"
                ? "moto"
                : "auto";


        etapa =
            document.getElementById(
                `step-${etapaCotacaoAuto}-${sufixo}`
            );

    }


    if (!etapa) {
        return true;
    }


    const campos =
        etapa.querySelectorAll(
            "input, select, textarea"
        );


    let valido = true;


    campos.forEach(campo => {

        /* ignora campos escondidos ou desabilitados */

        if (
            campo.disabled ||
            campo.offsetWidth === 0 ||
            campo.offsetHeight === 0
        ) {
            return;
        }


        const valor =
            campo.value.trim();


        /* CAMPO OBRIGATÓRIO */

        if (
            campo.required &&
            !valor
        ) {

            mostrarErroCampo(
                campo,
                "Por favor, preencha este campo."
            );

            valido = false;

            return;
        }


        /* se não é obrigatório e está vazio */

        if (!valor) {

            limparErroCampo(campo);

            return;
        }


        /* TELEFONE */

        if (
            campo.id === "telefone" &&
            !validarTelefone(valor)
        ) {

            mostrarErroCampo(
                campo,
                "Informe um telefone válido com DDD."
            );

            valido = false;

            return;
        }


        /* E-MAIL */

        if (
            campo.id === "email" &&
            !validarEmail(valor)
        ) {

            mostrarErroCampo(
                campo,
                "Informe um e-mail válido."
            );

            valido = false;

            return;
        }


        /* CPF DA OUTRA PESSOA */

        if (
            campo.id === "outra-cpf" &&
            !validarCPF(valor)
        ) {

            mostrarErroCampo(
                campo,
                "Informe um CPF válido."
            );

            valido = false;

            return;
        }


        limparErroCampo(campo);

    });


    /* coloca o cursor no primeiro erro */

    if (!valido) {

        const primeiroErro =
            etapa.querySelector(".erro");


        if (primeiroErro) {
            primeiroErro.focus();
        }

    }


    return valido;

}


/* =========================================================
   MÁSCARA DE TELEFONE
========================================================= */

function mascaraTelefone(valor) {

    valor =
        valor.replace(/\D/g, "");


    valor =
        valor.slice(0, 11);


    if (valor.length <= 10) {

        valor = valor.replace(
            /^(\d{2})(\d)/g,
            "($1) $2"
        );


        valor = valor.replace(
            /(\d{4})(\d)/,
            "$1-$2"
        );

    } else {

        valor = valor.replace(
            /^(\d{2})(\d)/g,
            "($1) $2"
        );


        valor = valor.replace(
            /(\d{5})(\d)/,
            "$1-$2"
        );

    }


    return valor;

}


/* =========================================================
   VALIDAR TELEFONE
========================================================= */

function validarTelefone(telefone) {

    const numeros =
        telefone.replace(/\D/g, "");


    if (
        numeros.length !== 10 &&
        numeros.length !== 11
    ) {
        return false;
    }


    /* bloqueia números repetidos */

    if (/^(\d)\1+$/.test(numeros)) {
        return false;
    }


    const dddsValidos =
        new Set([

            "11","12","13","14","15","16","17","18","19",

            "21","22","24","27","28",

            "31","32","33","34","35","37","38",

            "41","42","43","44","45","46","47","48","49",

            "51","53","54","55",

            "61","62","63","64","65","66","67","68","69",

            "71","73","74","75","77","79",

            "81","82","83","84","85","86","87","88","89",

            "91","92","93","94","95","96","97","98","99"

        ]);


    const ddd =
        numeros.slice(0, 2);


    if (!dddsValidos.has(ddd)) {
        return false;
    }


    if (
        numeros.length === 11 &&
        numeros[2] !== "9"
    ) {
        return false;
    }


    return true;

}


/* =========================================================
   VALIDAR E-MAIL
========================================================= */

function validarEmail(email) {

    const valor =
        email.trim().toLowerCase();


    const regex =
        /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;


    return regex.test(valor);

}


/* =========================================================
   MÁSCARA CPF
========================================================= */

function mascaraCPF(valor) {

    valor =
        valor.replace(/\D/g, "");


    valor =
        valor.slice(0, 11);


    valor =
        valor.replace(
            /(\d{3})(\d)/,
            "$1.$2"
        );


    valor =
        valor.replace(
            /(\d{3})(\d)/,
            "$1.$2"
        );


    valor =
        valor.replace(
            /(\d{3})(\d{1,2})$/,
            "$1-$2"
        );


    return valor;

}


/* =========================================================
   VALIDAR CPF
========================================================= */

function validarCPF(cpf) {

    cpf =
        cpf.replace(/\D/g, "");


    if (cpf.length !== 11) {
        return false;
    }


    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }


    let soma = 0;


    for (let i = 0; i < 9; i++) {

        soma +=
            Number(cpf[i]) *
            (10 - i);

    }


    let primeiroDigito =
        (soma * 10) % 11;


    if (primeiroDigito === 10) {
        primeiroDigito = 0;
    }


    if (
        primeiroDigito !==
        Number(cpf[9])
    ) {
        return false;
    }


    soma = 0;


    for (let i = 0; i < 10; i++) {

        soma +=
            Number(cpf[i]) *
            (11 - i);

    }


    let segundoDigito =
        (soma * 10) % 11;


    if (segundoDigito === 10) {
        segundoDigito = 0;
    }


    return (
        segundoDigito ===
        Number(cpf[10])
    );

}

const profissoesPreFixadas = [
    "Administrador",
    "Advogado",
    "Analista de Sistemas / TI",
    "Aposentado / Pensionista",
    "Arquiteto",
    "Assistente Social",
    "Autônomo",
    "Bancário",
    "Biólogo",
    "Caminhoneiro / Motorista de Carga",
    "Comerciante / Empresário",
    "Contador / Auditor",
    "Corretor de Imóveis",
    "Corretor de Seguros",
    "Dentista",
    "Dermatologista",
    "Designer / Publicitário",
    "Economista",
    "Educador Físico / Personal Trainer",
    "Empresário",
    "Enfermeiro",
    "Engenheiro",
    "Estudante",
    "Farmacêutico",
    "Fisioterapeuta",
    "Funcionário Público",
    "Jornalista / Comunicador",
    "Médico",
    "Motorista / Entregador",
    "Nutricionista",
    "Professor / Educador",
    "Psicólogo",
    "Técnico em Enfermagem",
    "Técnico em Informática",
    "Veterinário",
    "Outras Atividades"
];


function carregarProfissoes() {

    const selectProfissao =
        document.getElementById(
            "profissao-condutor"
        );


    if (!selectProfissao) {
        return;
    }


    selectProfissao.innerHTML =
        '<option value="">Selecione a profissão...</option>';


    [...profissoesPreFixadas]
        .sort((a, b) =>
            a.localeCompare(
                b,
                "pt-BR"
            )
        )
        .forEach(profissao => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                profissao;


            option.textContent =
                profissao;


            selectProfissao.appendChild(
                option
            );

        });

}

/* =========================================================
   CEP - SEGURO AUTO
========================================================= */

function mascaraCEP(valor) {

    valor = valor.replace(/\D/g, "");

    valor = valor.slice(0, 8);

    valor = valor.replace(
        /^(\d{5})(\d)/,
        "$1-$2"
    );

    return valor;
}


function buscarCEP() {

    const cepInput =
        document.getElementById("cep");


    if (!cepInput) {
        return;
    }


    const cep =
        cepInput.value.replace(/\D/g, "");


    cepValidado = false;


    if (cep.length !== 8) {
        return;
    }


    fetch(
        `https://viacep.com.br/ws/${cep}/json/`
    )

        .then(resposta =>
            resposta.json()
        )

        .then(data => {

            if (data.erro) {

                cepValidado = false;

                mostrarErroCampo(
                    cepInput,
                    "CEP não encontrado."
                );

                return;
            }


            cepValidado = true;


            const logradouro =
                document.getElementById(
                    "logradouro"
                );

            const bairro =
                document.getElementById(
                    "bairro"
                );

            const cidade =
                document.getElementById(
                    "cidade"
                );

            const uf =
                document.getElementById(
                    "uf"
                );


            if (logradouro) {

                logradouro.value =
                    data.logradouro || "";

                limparErroCampo(
                    logradouro
                );

            }


            if (bairro) {

                bairro.value =
                    data.bairro || "";

                limparErroCampo(
                    bairro
                );

            }


            if (cidade) {

                cidade.value =
                    data.localidade || "";

                limparErroCampo(
                    cidade
                );

            }


            if (uf && data.uf) {

                uf.value =
                    data.uf.toUpperCase();

                limparErroCampo(uf);

            }


            limparErroCampo(
                cepInput
            );


            const numero =
                document.getElementById(
                    "numero"
                );


            if (numero) {
                numero.focus();
            }

        })

        .catch(erro => {

            cepValidado = false;


            console.error(
                "Erro ao buscar CEP:",
                erro
            );


            mostrarErroCampo(
                cepInput,
                "Erro ao buscar CEP."
            );

        });

}


/* =========================================================
   FIPE - MARCAS
========================================================= */

function carregarMarcasFIPE() {

    const selectMarca =
        document.getElementById("marca");


    if (!selectMarca) {
        return;
    }


    selectMarca.innerHTML =
        '<option value="">Carregando marcas...</option>';


    fetch(
        "https://parallelum.com.br/fipe/api/v1/carros/marcas"
    )

        .then(resposta =>
            resposta.json()
        )

        .then(marcas => {

            selectMarca.innerHTML =
                '<option value="">Selecione a marca...</option>';


            marcas.forEach(marca => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    marca.codigo;


                option.textContent =
                    marca.nome;


                selectMarca.appendChild(
                    option
                );

            });

        })

        .catch(erro => {

            console.error(
                "Erro ao carregar marcas FIPE:",
                erro
            );


            selectMarca.innerHTML =
                '<option value="">Erro ao carregar marcas</option>';

        });

}


/* =========================================================
   FIPE - MODELOS
========================================================= */

function carregarModelos(
    codigoMarca
) {

    const selectModelo =
        document.getElementById(
            "modelo"
        );


    if (!selectModelo) {
        return;
    }


    if (!codigoMarca) {

        selectModelo.disabled = true;


        selectModelo.innerHTML =
            '<option value="">Selecione primeiro a marca...</option>';


        return;

    }


    selectModelo.disabled = true;


    selectModelo.innerHTML =
        '<option value="">Carregando modelos...</option>';


    fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos`
    )

        .then(resposta =>
            resposta.json()
        )

        .then(data => {

            selectModelo.innerHTML =
                '<option value="">Selecione o modelo...</option>';


            data.modelos.forEach(
                modelo => {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        modelo.nome;


                    option.textContent =
                        modelo.nome;


                    selectModelo.appendChild(
                        option
                    );

                }
            );


            selectModelo.disabled =
                false;

        })

        .catch(erro => {

            console.error(
                "Erro ao carregar modelos FIPE:",
                erro
            );


            selectModelo.innerHTML =
                '<option value="">Erro ao carregar modelos</option>';


            selectModelo.disabled =
                true;

        });
    }

        /* =========================================================
   ENVIO DA COTAÇÃO - SEGURO AUTO
========================================================= */

const TEMPO_ENTRE_ENVIOS_AUTO = 60000;


/* =========================================================
   ENVIAR FORMULÁRIO
========================================================= */

function enviarFormulario() {

    /* =====================================================
       VALIDA A ETAPA ATUAL
    ====================================================== */

    if (!validarEtapaCotacaoAuto()) {
        return;
    }


    /* =====================================================
       HONEYPOT ANTI-SPAM
    ====================================================== */

    const campoHoneypot =
        document.getElementById(
            "site-contato"
        );


    if (
        campoHoneypot &&
        campoHoneypot.value.trim() !== ""
    ) {

        console.warn(
            "Envio bloqueado pelo honeypot."
        );

        return;
    }


    /* =====================================================
       IDENTIFICA O TIPO DE SEGURO
    ====================================================== */

    const tipoSeguro =
        tipoSeguroAtual === "Moto"
            ? "MOTO"
            : "AUTO";


    const sufixoFluxo =
        tipoSeguroAtual === "Moto"
            ? "moto"
            : "auto";


    const chaveUltimoEnvio =
        tipoSeguroAtual === "Moto"
            ? "ultimoEnvioCotacaoMoto"
            : "ultimoEnvioCotacaoAuto";


    /* =====================================================
       LIMITE ENTRE ENVIOS
    ====================================================== */

    const ultimoEnvio =
        Number(
            localStorage.getItem(
                chaveUltimoEnvio
            )
        ) || 0;


    const agora =
        Date.now();


    if (
        agora - ultimoEnvio <
        TEMPO_ENTRE_ENVIOS_AUTO
    ) {

        const segundosRestantes =
            Math.ceil(
                (
                    TEMPO_ENTRE_ENVIOS_AUTO -
                    (agora - ultimoEnvio)
                ) / 1000
            );


        mostrarPopupFeedback(

            "Aguarde um momento",

            `Você poderá enviar uma nova cotação em ${segundosRestantes} segundos.`,

            "aviso"

        );


        return;
    }


    /* =====================================================
       ETAPAS GERAIS
    ====================================================== */

    const etapaCliente =
        document.getElementById(
            "step-1"
        );


    const etapaEndereco =
        document.getElementById(
            "step-2"
        );


    /* =====================================================
       FLUXO ESPECÍFICO
    ====================================================== */

    const fluxoSeguro =
        document.getElementById(
            `fluxo-${sufixoFluxo}`
        );


    if (!fluxoSeguro) {

        console.error(
            `Fluxo ${tipoSeguro} não encontrado.`
        );


        mostrarPopupFeedback(

            "Erro no formulário",

            `Não foi possível identificar o formulário do Seguro ${tipoSeguro}.`,

            "erro"

        );


        return;
    }


    /* =====================================================
       BOTÃO DE ENVIO
    ====================================================== */

    const botaoEnviar =
        document.querySelector(
            `#step-5-${sufixoFluxo} .btn-primary`
        );


    let textoOriginalBotao =
        "ENVIAR COTAÇÃO";


    if (botaoEnviar) {

        textoOriginalBotao =
            botaoEnviar.innerText;


        botaoEnviar.disabled =
            true;


        botaoEnviar.innerText =
            "Enviando...";


        botaoEnviar.style.opacity =
            "0.7";


        botaoEnviar.style.cursor =
            "not-allowed";

    }


    /* =====================================================
       MONTAR RESUMO
    ====================================================== */

    let dadosResumo =
        `Nova Cotação de Seguro: ${tipoSeguro}\n\n`;


    dadosResumo +=
        "Detalhes do Cliente / Formulário:\n";


   function coletarCampos(container) {

    if (!container) {
        return;
    }


    const campos =
        container.querySelectorAll(
            "input, select, textarea"
        );


    campos.forEach(campo => {

        /* =================================================
           IGNORA TIPOS DESNECESSÁRIOS
        ================================================== */

        if (
            campo.type === "hidden" ||
            campo.type === "submit" ||
            campo.type === "button"
        ) {
            return;
        }


        /* =================================================
           IGNORA CAMPOS DESABILITADOS
        ================================================== */

        if (campo.disabled) {
            return;
        }


        /* =================================================
           IGNORA HONEYPOT
        ================================================== */

        if (
            campo.id === "site-contato"
        ) {
            return;
        }


        /* =================================================
           IGNORA APENAS CONDICIONAIS ESCONDIDAS

           IMPORTANTE:
           Não verificamos se a própria etapa está escondida,
           pois etapas anteriores ficam display:none depois
           que o usuário avança.
        ================================================== */

        let elementoPai =
            campo.parentElement;


        let campoCondicionalOculto =
            false;


        while (
            elementoPai &&
            !elementoPai.classList.contains(
                "step"
            )
        ) {

            const estilo =
                window.getComputedStyle(
                    elementoPai
                );


            if (
                estilo.display === "none"
            ) {

                campoCondicionalOculto =
                    true;

                break;
            }


            elementoPai =
                elementoPai.parentElement;

        }


        if (campoCondicionalOculto) {
            return;
        }


        /* =================================================
           RADIO / CHECKBOX
        ================================================== */

        if (
            campo.type === "radio" ||
            campo.type === "checkbox"
        ) {

            if (!campo.checked) {
                return;
            }

        } else {

            if (
                !campo.value ||
                campo.value.trim() === ""
            ) {
                return;
            }

        }


        /* =================================================
           DESCOBRIR O RÓTULO
        ================================================== */

        let rotulo =
            campo.name ||
            campo.id ||
            "Campo";


        const label =
            document.querySelector(
                `label[for="${campo.id}"]`
            );


        if (label) {

            rotulo =
                label.innerText
                    .replace("*", "")
                    .replace(":", "")
                    .trim();

        }


        /* =================================================
           FORMATAR O VALOR
        ================================================== */

        let valorFormatado =
            campo.value;


        if (
            campo.tagName.toLowerCase() ===
            "select"
        ) {

            const opcao =
                campo.options[
                    campo.selectedIndex
                ];


            if (opcao) {

                const textoOpcao =
                    opcao.text.trim();


                if (
                    textoOpcao &&
                    !textoOpcao
                        .toLowerCase()
                        .includes("selecione") &&
                    !textoOpcao
                        .toLowerCase()
                        .includes("carregando")
                ) {

                    valorFormatado =
                        textoOpcao;

                }

            }

        }


        /* =================================================
           ADICIONAR AO E-MAIL
        ================================================== */

        dadosResumo +=
            `- ${rotulo}: ${valorFormatado}\n`;

    });

}


    /* =====================================================
       COLETA DADOS
    ====================================================== */

    coletarCampos(
        etapaCliente
    );


    coletarCampos(
        etapaEndereco
    );


    coletarCampos(
        fluxoSeguro
    );


    /* =====================================================
       PARÂMETROS EMAILJS
    ====================================================== */

    const parametrosEnvio = {

        tipo_seguro:
            tipoSeguro,

        mensagem_completa:
            dadosResumo,

        data_envio:
            new Date()
                .toLocaleString(
                    "pt-BR"
                )

    };


    /* =====================================================
       ENVIO EMAILJS
    ====================================================== */

    emailjs
        .send(

            "service_h6v6mgg",

            "template_d9f3clv",

            parametrosEnvio

        )

        .then(response => {

            console.log(
                `${tipoSeguro} enviado com sucesso!`,
                response
            );


            localStorage.setItem(

                chaveUltimoEnvio,

                Date.now()

            );


            /* restaura botão */

            if (botaoEnviar) {

                botaoEnviar.disabled =
                    false;


                botaoEnviar.innerText =
                    textoOriginalBotao;


                botaoEnviar.style.opacity =
                    "1";


                botaoEnviar.style.cursor =
                    "pointer";

            }


            /* fecha modal */

            fecharModal();


            /* popup */

            mostrarPopupFeedback(

                "Cotação enviada!",

                "Recebemos suas informações com sucesso. Em breve entraremos em contato.",

                "sucesso"

            );

        })

        .catch(error => {

            console.error(
                "Erro ao enviar e-mail:",
                error
            );


            if (botaoEnviar) {

                botaoEnviar.disabled =
                    false;


                botaoEnviar.innerText =
                    textoOriginalBotao;


                botaoEnviar.style.opacity =
                    "1";


                botaoEnviar.style.cursor =
                    "pointer";

            }


            mostrarPopupFeedback(

                "Não foi possível enviar",

                "Ocorreu um erro ao enviar sua cotação. Por favor, tente novamente.",

                "erro"

            );

        });

}
/* =========================================================
   POPUP DE FEEDBACK
========================================================= */

function mostrarPopupFeedback(
    titulo,
    mensagem,
    tipo = "sucesso"
) {

    const overlay =
        document.getElementById(
            "popup-feedback-overlay"
        );


    const tituloPopup =
        document.getElementById(
            "popup-feedback-title"
        );


    const mensagemPopup =
        document.getElementById(
            "popup-feedback-message"
        );


    const iconePopup =
        document.getElementById(
            "popup-feedback-icon"
        );


    if (
        !overlay ||
        !tituloPopup ||
        !mensagemPopup ||
        !iconePopup
    ) {
        return;
    }


    overlay.classList.remove(
        "erro",
        "aviso"
    );


    if (tipo === "erro") {

        overlay.classList.add(
            "erro"
        );


        iconePopup.textContent =
            "×";

    } else if (
        tipo === "aviso"
    ) {

        overlay.classList.add(
            "aviso"
        );


        iconePopup.textContent =
            "!";

    } else {

        iconePopup.textContent =
            "✓";

    }


    tituloPopup.textContent =
        titulo;


    mensagemPopup.textContent =
        mensagem;


    overlay.classList.add(
        "show"
    );

}


/* =========================================================
   FECHAR POPUP
========================================================= */

function fecharPopupFeedback() {

    const overlay =
        document.getElementById(
            "popup-feedback-overlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   AVISO DE PRIVACIDADE
========================================================= */

function abrirAvisoPrivacidade() {

    const overlay =
        document.getElementById(
            "privacidade-overlay"
        );


    if (overlay) {

        overlay.classList.add(
            "show"
        );

    }

}


function fecharAvisoPrivacidade() {

    const overlay =
        document.getElementById(
            "privacidade-overlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   EVENTOS DOS CAMPOS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const formulario =
            document.getElementById(
                "form-cotacao"
            );


        if (!formulario) {
            return;
        }


        /* REMOVE ERRO ENQUANTO DIGITA */

        formulario
            .querySelectorAll(
                "input, select, textarea"
            )
            .forEach(campo => {

                campo.addEventListener(
                    "input",
                    () => {

                        limparErroCampo(campo);

                    }
                );


                campo.addEventListener(
                    "change",
                    () => {

                        limparErroCampo(campo);

                    }
                );

            });


        /* TELEFONE */

        const telefone =
            document.getElementById(
                "telefone"
            );


        if (telefone) {

            telefone.addEventListener(
                "input",
                () => {

                    telefone.value =
                        mascaraTelefone(
                            telefone.value
                        );

                }
            );

        }


        /* CPF */

        const cpf =
            document.getElementById(
                "outra-cpf"
            );


        if (cpf) {

            cpf.addEventListener(
                "input",
                () => {

                    cpf.value =
                        mascaraCPF(
                            cpf.value
                        );

                }
            );

        }

        const cepInput =
    document.getElementById(
        "cep"
    );


    if (cepInput) {

        cepInput.addEventListener(
            "input",
            () => {

                cepValidado = false;

                cepInput.value =
                    mascaraCEP(
                        cepInput.value
                    );

            }
        );


        cepInput.addEventListener(
            "blur",
            buscarCEP
        );

    }
        carregarProfissoes();
        carregarMarcasFIPE();

const parametrosURL =
    new URLSearchParams(
        window.location.search
    );


const abrirCotacao =
    parametrosURL.get(
        "cotacao"
    );


if (
    abrirCotacao === "auto" &&
    document.getElementById(
        "modal-overlay"
    )
) {

    abrirModal("Auto");

}


if (
    abrirCotacao === "moto" &&
    document.getElementById(
        "modal-overlay"
    )
) {

    abrirModal("Moto");

}
    }
    
);