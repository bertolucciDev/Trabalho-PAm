let generoSelecionado = 'Masculino';

const mascBtn = document.getElementById('masc-tab');
const femBtn = document.getElementById('fem-tab');
const resultadoDiv = document.getElementById('resultado');
const form = document.getElementById('imc-form');
const formContainer = document.getElementById('form-container');

mascBtn.addEventListener('click', () => {
  generoSelecionado = 'Masculino';
  ativarBotao('masc-tab', 'fem-tab');
  aplicarCorDeFundo();
  resetarFormulario();
});

femBtn.addEventListener('click', () => {
  generoSelecionado = 'Feminino';
  ativarBotao('fem-tab', 'masc-tab');
  aplicarCorDeFundo();
  resetarFormulario();
});

function ativarBotao(ativo, inativo) {
  document.getElementById(ativo).classList.add('active');
  document.getElementById(inativo).classList.remove('active');
}

function aplicarCorDeFundo() {
    const body = document.body;
  if (generoSelecionado === 'Masculino') {
    formContainer.style.backgroundColor = '#c0d9ff';
    body.style.backgroundColor = '#e0f0ff';
  } else {
    formContainer.style.backgroundColor = '#ffb3c2';
    body.style.backgroundColor = '#ffe0f0';
  }
}

function resetarFormulario() {
  form.reset();
  resultadoDiv.innerHTML = '';
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const peso = parseFloat(document.getElementById('peso').value);
  const alturaCm = parseFloat(document.getElementById('altura').value);
  const alturaM = alturaCm / 100;

  if (!nome) {
    mostrarResultado("Por favor, preencha seu nome.");
    return;
  }

  if (!peso || !alturaM || alturaM <= 0) {
    mostrarResultado("Preencha os campos corretamente.");
    return;
  }

  const imc = peso / (alturaM * alturaM);
  const classificacao = classificarIMC(imc, generoSelecionado);

  mostrarResultado(`${nome}, seu IMC é ${imc.toFixed(2)}<br><strong>${classificacao}</strong>`);
});

function classificarIMC(imc, genero) {
  if (genero === 'Feminino') {
    if (imc < 19) return 'Abaixo do peso';
    if (imc < 24) return 'Normal';
    if (imc < 29) return 'Obesidade leve';
    if (imc < 39) return 'Obesidade moderada';
    return 'Obesidade mórbida';
  } else {
    if (imc < 20) return 'Abaixo do peso';
    if (imc < 25) return 'Normal';
    if (imc < 30) return 'Obesidade leve';
    if (imc < 40) return 'Obesidade moderada';
    return 'Obesidade mórbida';
  }
}

function mostrarResultado(mensagem) {
  resultadoDiv.innerHTML = mensagem;
}
