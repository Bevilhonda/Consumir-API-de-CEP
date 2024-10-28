
// then significa =  ENTÃO 
// catch significa  = pegar o erro 

/* consumindo api sem o uso do async await 


var consultaCep = fetch('https://viacep.com.br/ws/87040440/json/')
  .then(resposta => resposta.json())
  .then(respostaNaTela => {
    if (respostaNaTela.erro) {
      throw Error('Esse cep não existe!');
    } else

      console.log(respostaNaTela)
  })

  .catch(erro => console.log(erro))
  .finally(mensagem => console.log('Processamento concluido'));

console.log(consultaCep);


*/


// consumindo api utilizando async await 

async function buscaEndereco(cep) {

  var mensagemErro = document.getElementById('erro'); 
  mensagemErro.innerHTML = "";

  try {

    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

    var convertFormatoConsultaCep = await consultaCep.json();

    if(convertFormatoConsultaCep.erro){
      throw Error('Cep não existente!.');
    }

    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');
    var bairro = document.getElementById('bairro');

    cidade.value = convertFormatoConsultaCep.localidade;
    logradouro.value = convertFormatoConsultaCep.logradouro;
    estado.value = convertFormatoConsultaCep.estado;
    bairro.value = convertFormatoConsultaCep.bairro;

    console.log(convertFormatoConsultaCep);

    return convertFormatoConsultaCep ;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>Cep inválido . Tente novamente </p>`;

    console.log(erro);

  }

}

let ceps = ['87040440','87040070'];
let conjuntoDeCeps = ceps.map( valores  => buscaEndereco(valores) );
console.log(conjuntoDeCeps);

Promise.all(conjuntoDeCeps).then(respostas => console.log(respostas));

var cep = document.getElementById('cep');

cep.addEventListener("focusout",()=> buscaEndereco(cep.value));