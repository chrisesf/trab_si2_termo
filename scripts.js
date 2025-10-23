const keyboard = document.getElementById("keyboard");
const grid = document.getElementById("grid");

const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'DEL',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'
];

// Lista com palavras de 5 letras com temática halloween
const wordList = ["BRUXA", "ZUMBI", "VULTO", "LOBOS", "DIABO", "FADAS", "CORVO", "SAPOS", "RATOS", "MOSCA", "COBRA", "GATOS", "VERME", "SUSTO", "PAVOR", "MORTE", "NOITE", "TREVA", 
    "ALMAS", "MAGIA", "LENDA", "CRIME", "GRITO", "CULTO", "PESAR", "MEDOS", "OSSOS", "DENTE", "CORPO", "OLHOS", "TUMBA", "COVAS", "VELAS", "FACAS", "FOICE", "CAPAS", "DOCES", 
    "FESTA", "PRETO", "LIVRO", "LUNAR", "PACTO", "MUMIA", "TAROT", "CAPUZ", "CELTA", "NEVOA", "PRESA", "CONDE", "BRUMA", "FOBIA", "LARVA", "MUSGO", "POCAO", "RUINA", "SEXTA", "PODRE",
    "CRIPTA", "UIVAR", "BAMBI", "BOMBA", "HADES", "OUIJA", "SACRO", "PAPAO", "BESTA"];

console.log(wordList.length + " palavras carregadas.");

// Variáveis do jogo
let targetWord = wordList[Math.floor(Math.random() * wordList.length)];
let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let gridBlocks = [];

// Função para normalizar texto (remover acentos)
function normalizeText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
''
// Criar o teclado
const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const row3 = document.getElementById("row3");

const keyButtons = {};

keys.forEach((key, i) => {
    const button = document.createElement('button');
    button.textContent = key;
    button.classList.add('key');
    button.setAttribute('data-key', key);

    keyButtons[key] = button;

    button.addEventListener('click', () => handleKeyPress(key));

    if (i < 10) {
        row1.appendChild(button);
    } else if (i < 20) {
        row2.appendChild(button);
    } else {
        row3.appendChild(button);
    }
});

// Criar a grade
for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.className = "gridRow";
    const rowBlocks = [];

    for (let j = 0; j < 5; j++) {
        const block = document.createElement("div");
        block.classList.add("block");
        row.appendChild(block);
        rowBlocks.push(block);
    }

    grid.appendChild(row);
    gridBlocks.push(rowBlocks);
}

// Atualizar foco visual
function updateFocus() {
    gridBlocks.forEach((row, i) => {
        row.forEach(block => {
            block.classList.remove('focused');
        });
    });

    if (currentRow < 6 && currentCol < 5 && !gameOver) {
        gridBlocks[currentRow][currentCol].classList.add('focused');
    }
}

// Manipular pressionar tecla
function handleKeyPress(key) {
    if (gameOver) return;

    if (key === 'ENTER') {
        submitGuess();
    } else if (key === 'DEL') {
        deleteLetter();
    } else {
        addLetter(key);
    }
}

// Adicionar letra
function addLetter(letter) {
    if (currentCol < 5) {
        gridBlocks[currentRow][currentCol].textContent = letter;
        currentCol++;
        updateFocus();
    }
}

// Deletar letra
function deleteLetter() {
    if (currentCol > 0) {
        currentCol--;
        gridBlocks[currentRow][currentCol].textContent = '';
        updateFocus();
    }
}

// Submeter tentativa
function submitGuess() {
    if (currentCol !== 5) {
        showMessage('Palavra incompleta!');
        return;
    }

    // Pegar a palavra digitada
    let guess = '';
    for (let i = 0; i < 5; i++) {
        guess += gridBlocks[currentRow][i].textContent;
    }

    // Verificar se a palavra está na lista
    if (!wordList.includes(guess)) {
        showMessage('Palavra não está na lista!');
        return;
    }

    // Avaliar a tentativa
    evaluateGuess(guess);

    if (guess === targetWord) {
        gameOver = true;
        setTimeout(() => showMessage(`🎃 Parabéns! Você acertou! 🎃`), 500);
    } else if (currentRow === 5) {
        gameOver = true;
        setTimeout(() => {
            showMessage(`Game Over! A palavra era: ${targetWord}`);
            showJumpscare();
        }, 500);
    } else {
        currentRow++;
        currentCol = 0;
        updateFocus();
    }
}

// Avaliar tentativa
function evaluateGuess(guess) {
    const targetNormalized = normalizeText(targetWord);
    const guessNormalized = normalizeText(guess);

    const targetLetters = targetNormalized.split('');
    const guessLetters = guessNormalized.split('');
    const letterCount = {};

    // Contar letras na palavra alvo
    targetLetters.forEach(letter => {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    });

    const result = new Array(5).fill('incorrect');

    // Primeira passada: marcar posições corretas
    for (let i = 0; i < 5; i++) {
        if (guessLetters[i] === targetLetters[i]) {
            result[i] = 'correct';
            letterCount[guessLetters[i]]--;
        }
    }

    // Segunda passada: marcar letras presentes
    for (let i = 0; i < 5; i++) {
        if (result[i] === 'incorrect' && letterCount[guessLetters[i]] > 0) {
            result[i] = 'present';
            letterCount[guessLetters[i]]--;
        }
    }

    // Aplicar cores aos blocos
    for (let i = 0; i < 5; i++) {
        const block = gridBlocks[currentRow][i];
        setTimeout(() => {
            if (result[i] === 'correct') {
                block.classList.add('correctPos');
            } else if (result[i] === 'present') {
                block.classList.add('correctLetter');
            } else {
                block.classList.add('incorrectLetter');
            }
        }, i * 100);

        // Atualizar teclado
        updateKeyboard(guess[i], result[i]);
    }
}

// Atualizar cores do teclado
function updateKeyboard(letter, status) {
    const key = keyButtons[letter];
    if (!key) return;

    if (status === 'correct' && !key.classList.contains('correctKey')) {
        key.classList.remove('usedKey', 'presentKey');
        key.classList.add('correctKey');
    } else if (status === 'present' && !key.classList.contains('correctKey') && !key.classList.contains('presentKey')) {
        key.classList.remove('usedKey');
        key.classList.add('presentKey');
    } else if (status === 'incorrect' && !key.classList.contains('correctKey') && !key.classList.contains('presentKey')) {
        key.classList.add('usedKey');
    }
}

// Mostrar mensagem
function showMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #FF7518;
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        z-index: 2000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
    `;
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Teclado físico
document.addEventListener('keydown', (e) => {
    if (gameOver) return;

    const key = e.key.toUpperCase();

    if (key === 'ENTER') {
        handleKeyPress('ENTER');
    } else if (key === 'BACKSPACE') {
        handleKeyPress('DEL');
    } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
    }
});

// Popup da equipe
const teamModal = document.getElementById('teamModal');
const openTeamModalButton = document.getElementById('teamButton');
const closeTeamModalButton = teamModal.querySelector('.close-button');

openTeamModalButton.addEventListener('click', () => {
    teamModal.style.display = 'flex';
});

closeTeamModalButton.addEventListener('click', () => {
    teamModal.style.display = 'none';
});

// Popup tutorial
const helpModal = document.getElementById('helpModal');
const openHelpModalButton = document.getElementById('helpButton');
const closeHelpModalButton = helpModal.querySelector('.close-button');

openHelpModalButton.addEventListener('click', () => {
    helpModal.style.display = 'flex';
});

closeHelpModalButton.addEventListener('click', () => {
    helpModal.style.display = 'none';
});

// Fechar os popups se clicar fora
window.addEventListener('click', (event) => {
    if (event.target === teamModal) {
        teamModal.style.display = 'none';
    }
    if (event.target === helpModal) {
        helpModal.style.display = 'none';
    }
});

function showJumpscare() {
    const jumpscare = document.getElementById('jumpscare');
    const audio = document.getElementById('jumpscare-audio');

    if (audio.readyState >= 3) {
        audio.currentTime = 0;
        audio.play();
        jumpscare.style.display = 'flex';
    } else {
        audio.oncanplaythrough = () => {
            audio.currentTime = 0;
            audio.play();
            jumpscare.style.display = 'flex';
        };
        audio.load();
    }

    setTimeout(() => {
        jumpscare.style.display = 'none';
    }, 2500); // 2.5s
}
// Inicializar foco
updateFocus();
