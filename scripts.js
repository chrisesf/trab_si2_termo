const keyboard = document.getElementById("keyboard")

const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'DEL',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'
]

// lista com palavras de 5 letras com temática halloween
// const wordList = ["BRUXA", "ZUMBI", "VULTO", "LOBOS", "DIABO" "FADAS", "CORVO", "SAPOS", "RATOS", "MOSCA", "COBRA", "GATOS", "VERME", "SUSTO", "PAVOR", "MORTE", "NOITE", "TREVA", "ALMAS", "MAGIA", "LENDA", "FINAL", "CRIME", "GRITO", "CULTO", "SONHO", "PESAR", "MEDOS", "OSSOS", "DENTE", "CORPO", "OLHOS", "TUMBA", "PEDRA", "PORTA", "TORRE", "CERCA", "COVAS", "VELAS", "FACAS", "FOICE", "CAPAS", "DOCES", "FESTA", "PRETO", "LIVRO", "TEMPO", "SINAL", "LUAR"];

const row1 = document.getElementById("row1")
const row2 = document.getElementById("row2")
const row3 = document.getElementById("row3")

keys.forEach((key, i) => {
    const button = document.createElement('button')
    button.textContent = key
    button.classList.add('key')

    const states = [
        "usedKey",
        "correctKey",
        "presentKey"
    ]

    const rand = Math.random(states.length - 1)
    button.classList.add(states[(rand * (states.length - 1)).toFixed()])

    if (i < 10) {
        row1.appendChild(button)
    } else if (i < 20) {
        row2.appendChild(button)
    } else {
        row3.appendChild(button)
    }
})

const grid = document.getElementById("grid")

for (let i = 0; i < 6; i++) {
    const row = document.createElement("div")
    row.className = "gridRow"

    for (let j = 0; j < 5; j++) {
        const block = document.createElement("div")
        block.classList = "block"

        // Isso é um exemplo
        if (i === 0) {
            block.innerText = "A"

            const states = ["correctPos", "correctLetter", "incorrectLetter"]
            const rand = Math.random(states.length - 1)

            block.classList.add(states[(rand * (states.length - 1)).toFixed()])
        }

        if (i === 1) {
            block.classList = "block focused"
        }

        row.appendChild(block)
    }

    grid.appendChild(row)
}

// popup da equipe
const teamModal = document.getElementById('teamModal');
const openTeamModalButton = document.getElementById('teamButton');
const closeTeamModalButton = teamModal.querySelector('.close-button');

openTeamModalButton.addEventListener('click', () => {
    teamModal.style.display = 'flex'; 
});

closeTeamModalButton.addEventListener('click', () => {
    teamModal.style.display = 'none';
});

// popupo tutorial
const helpModal = document.getElementById('helpModal');
const openHelpModalButton = document.getElementById('helpButton');
const closeHelpModalButton = helpModal.querySelector('.close-button');

openHelpModalButton.addEventListener('click', () => {
    helpModal.style.display = 'flex';
});

closeHelpModalButton.addEventListener('click', () => {
    helpModal.style.display = 'none';
});

// fechar os popups se clicar fora
window.addEventListener('click', (event) => {
    if (event.target == teamModal) {
        teamModal.style.display = 'none';
    }
    if (event.target == helpModal) {
        helpModal.style.display = 'none';
    }
});