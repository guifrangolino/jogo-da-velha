const quadrados = document.querySelectorAll('.quadrado')
const turno = document.querySelector('#turno')
const telaFinal = document.querySelector('#telaFinal')
const btnReinicio = document.querySelector('#reinicio')
const resultado = document.querySelector('#resultado')

// console.log(Object.entries(quadrados))

let jogador = 'circulo'
let xPontos = []
let circuloPontos = []

quadrados.forEach(quad =>{
    quad.addEventListener('click', () => {
        if (quad.hasChildNodes()) {
            checarEstado()
            return
        } else {

            if (jogador == 'x') {
                jogador = 'circulo'
                circuloPontos.push(parseInt(quad.getAttribute('id').slice(-1)))
                turno.innerHTML = '<span id="turno">Vez do jogador: X</span>'
                checarEstado()
            } else if (jogador == 'circulo') {
                jogador = 'x'
                xPontos.push(parseInt(quad.getAttribute('id').slice(-1)))
                turno.innerHTML = '<span id="turno">Vez do jogador: O</span>'
                checarEstado()
            }
        
            quad.innerHTML = `<div class="${jogador}"></div>`
            checarEstado()
        }
        
        // console.log(`X: ${xPontos}`)
        // console.log(`O: ${circuloPontos}`)

    })
})

const condicoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [6, 4, 2]
]

//Arrumar a checagem de vitoria

function checarEstado() {

    condicoesVitoria.forEach(cond => {
        if (checarEmpate()) {
            telaFinal.style.display = 'flex'
            resultado.innerHTML = '<span id="resultado">Ops, parece que deu <strong>VELHA</strong></span>'
        }

        if (cond.every( e => xPontos.includes(e))) {
            telaFinal.style.display = 'flex'
            resultado.innerHTML = '<span id="resultado">O vencedor foi o jogador <strong>X</strong></span>'
        }

        if (cond.every( e => circuloPontos.includes(e))) {
            telaFinal.style.display = 'flex'
            resultado.innerHTML = '<span id="resultado">O vencedor foi o jogador <strong>O</strong></span>'
        }

    })
}

btnReinicio.addEventListener('click', () => {
    location. reload()
})

function checarEmpate() {
    return [... quadrados].every(e => e.hasChildNodes())
}