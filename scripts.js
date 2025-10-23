const keyboard = document.getElementById("keyboard")

const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'DEL',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'
]

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