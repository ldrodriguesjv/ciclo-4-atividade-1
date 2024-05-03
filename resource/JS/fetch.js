//const apiUrl = "https://rickandmortyapi.com/api/character/";

let paginaAtual = 1;
let totalPaginas = 1;

// Função para buscar personagens em uma página específica
async function buscarPersonagensPorPagina(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  totalPaginas = data.info.pages;
  return data.results;
}

// Função para buscar personagens de uma página específica
async function buscarPersonagensDaPagina(numeroDaPagina) {
  if (typeof numeroDaPagina === 'number') {
    const url = `https://rickandmortyapi.com/api/character?page=${numeroDaPagina}`;
    return await buscarPersonagensPorPagina(url);
  } else if (typeof numeroDaPagina === 'string') {
    const url = `https://rickandmortyapi.com/api/character/?name=${numeroDaPagina}`;
    return await buscarPersonagensPorPagina(url);
  }
}

async function searchCharacter() {
  const searchInput = document.getElementById('searchInput').value;

  if (searchInput === '') {
    return await buscarPersonagensDaPagina(paginaAtual);
  } else {
    paginaAtual = 1; // Resetar a página atual para 1 ao fazer uma nova pesquisa
    return await buscarPersonagensDaPagina(searchInput);
  }
}

// Função para exibir os personagens na página
async function exibirPersonagens() {
  try {
    const personagens = await searchCharacter();
    const personagensDiv = document.getElementById('personagens');
    const paginacaoDiv = document.getElementById('paginacao');

    // Limpa a div de personagens e a div de paginação
    personagensDiv.innerHTML = '';
    paginacaoDiv.innerHTML = '';

    // Adiciona cada personagem à div
    personagens.forEach(personagem => {
      //criando a div da imagens dos personagens
      const divPersonagem = document.createElement('div');
      divPersonagem.classList.add('personagem');
      divPersonagem.id = 'image_personagem';

      //criando a imagens dos personagens
      const imagem = document.createElement('img');
      imagem.src = personagem.image;
      imagem.alt = personagem.name;
      divPersonagem.appendChild(imagem);

      //criando a div da informações
      const divInformacao = document.createElement('div');
      divInformacao.classList.add('div_informacao');
      divInformacao.id = 'id_informacao';
      divPersonagem.appendChild(divInformacao);

      //criando a informações de nome idade
      const txtnome = document.createElement('p');
      txtnome.classList.add('p_nome');
      txtnome.textContent = "CHARACTER'S NAME:  " + personagem.name.toUpperCase();
      divInformacao.appendChild(txtnome);

      const txtspecies = document.createElement('p');
      txtspecies.classList.add('p_nome');
      txtspecies.textContent = 'SPECIES:  ' + personagem.species.toUpperCase();
      divInformacao.appendChild(txtspecies);

      const txtgender = document.createElement('p');
      txtgender.classList.add('p_nome');
      txtgender.textContent = 'GENDER:  ' + personagem.gender.toUpperCase();
      divInformacao.appendChild(txtgender);

      const txtlocation = document.createElement('p');
      txtlocation.classList.add('p_nome');
      txtlocation.textContent = 'LOCTION:  ' + personagem.location.name.toUpperCase();
      divInformacao.appendChild(txtlocation);

      //colocando todas as informações dentro da div mae
      personagensDiv.appendChild(divPersonagem);
    });

    // Adiciona botões de paginação
    if (paginaAtual > 1) {
      const botaoAnterior = document.createElement('button');
      botaoAnterior.classList.add('btclass');
      botaoAnterior.textContent = 'Página Anterior';
      botaoAnterior.addEventListener('click', () => {
        paginaAtual--;
        exibirPersonagens();
      });
      paginacaoDiv.appendChild(botaoAnterior);
    }

    const botaoProximo = document.createElement('button');
    botaoProximo.classList.add('btclass');
    botaoProximo.textContent = 'Próxima Página';
    botaoProximo.addEventListener('click', () => {
      paginaAtual++;
      exibirPersonagens();
    });

    if (paginaAtual === totalPaginas) {
      botaoProximo.disabled = true;
    } else {
      botaoProximo.disabled = false;
    }

    paginacaoDiv.appendChild(botaoProximo);

  } catch (error) {
    console.error('Ocorreu um erro ao buscar os personagens:', error);
  }
}

// Chama a função para exibir os personagens ao carregar a página
window.onload = exibirPersonagens;





/*let paginaAtual = 1;
let totalPaginas = 1;

// Função para buscar personagens em uma página específica
  async function buscarPersonagensPorPagina(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    totalPaginas = data.info.pages;
    return data.results;
  }

  // Função para buscar personagens de uma página específica
  async function buscarPersonagensDaPagina(numeroDaPagina) {
    if(typeof numeroDaPagina==='number'){
      const url = `https://rickandmortyapi.com/api/character?page=${numeroDaPagina}`;
      return await buscarPersonagensPorPagina(url);
    }else if (typeof numeroDaPagina==='string'){
      const url = `https://rickandmortyapi.com/api/character/?name=${numeroDaPagina}`;
      return await buscarPersonagensPorPagina(url);
    } 
    }

  async function searchCharacter(){
    const searchQuery=document.getElementById('searchInput').value

    if(searchQuery===''){
      const apiUrl=paginaAtual;
      return await buscarPersonagensDaPagina(apiUrl);
    }else{
      const apiUrl = searchQuery;
      return await buscarPersonagensDaPagina(apiUrl);
    }
  }



  // Função para exibir os personagens na página
  async function exibirPersonagens() {
    try {
      const personagens = await searchCharacter();//buscarPersonagensDaPagina(paginaAtual);
      const personagensDiv = document.getElementById('personagens');
      const paginacaoDiv = document.getElementById('paginacao');

      // Limpa a div de personagens e a div de paginação
      personagensDiv.innerHTML = '';
      paginacaoDiv.innerHTML = '';

      // Adiciona cada personagem à div
      personagens.forEach(personagem => {
        //criando a div da imagens dos personagens
        const divPersonagem = document.createElement('div');
        divPersonagem.classList.add('personagem');
        divPersonagem.id='image_personagem';

        //criando a imagens dos personagens
        const imagem = document.createElement('img');
        imagem.src = personagem.image;
        imagem.alt = personagem.name;
        divPersonagem.appendChild(imagem);

        //criando a div da informações
        const divInformacao = document.createElement('div');
        divInformacao.classList.add('div_informacao');
        divInformacao.id='id_informacao';
        divPersonagem.appendChild(divInformacao);

        //criando a informações de nome idade 
        const txtnome = document.createElement('p');
        txtnome.classList.add('p_nome');
        txtnome.textContent ="CHARACTER'S NAME:  " + personagem.name.toUpperCase();
        divInformacao.appendChild(txtnome);
        
        const txtspecies=document.createElement('p');
        txtspecies.classList.add('p_nome');
        txtspecies.textContent='SPECIES:  ' + personagem.species.toUpperCase();
        divInformacao.appendChild(txtspecies);
        
        const txtgender = document.createElement('p');
        txtgender.classList.add('p_nome');
        txtgender.textContent='GENDER:  ' + personagem.gender.toUpperCase();
        divInformacao.appendChild(txtgender);
        
        const txtlocation = document.createElement('p');
        txtlocation.classList.add('p_nome');
        txtlocation.textContent='LOCTION:  ' + personagem.location.name.toUpperCase();
        divInformacao.appendChild(txtlocation);

        //colocando todas as informações dentro da div mae
        personagensDiv.appendChild(divPersonagem);
      });

      // Adiciona botões de paginação
      if (paginaAtual > 1) {
        const botaoAnterior = document.createElement('button');
        botaoAnterior.classList.add('btclass');
        botaoAnterior.textContent = 'Página Anterior';
        botaoAnterior.addEventListener('click', () => {
          paginaAtual--;
          exibirPersonagens();
        });
        paginacaoDiv.appendChild(botaoAnterior);
      }

      const botaoProximo = document.createElement('button');
      botaoProximo.classList.add('btclass');
      botaoProximo.textContent = 'Próxima Página';
      botaoProximo.addEventListener('click', () => {
        paginaAtual++;
        exibirPersonagens();
      });

      if(paginaAtual===totalPaginas){
        botaoProximo.disabled=true;
      }else{
        botaoProximo.disabled=false;
      }

      paginacaoDiv.appendChild(botaoProximo);

    } catch (error) {
      console.error('Ocorreu um erro ao buscar os personagens:', error);
    }
  }
  // Chama a função para exibir os personagens ao carregar a página
  window.onload = exibirPersonagens;
 

  await fetch(apiUrl).then(response => response.json()).then(data=>{
    const personagens=data.results;
    const personagensList = document.getElementById('personagens');
    //limpa a lista de personagens
    personagensList.innerHTML='';
    //adiciona cada personagens á lista
    personagens.forEach(personagem => {
      const imagePerson=document.createElement('img');
      const listItem=document.createElement('li');
      imagePerson.src=personagem.image;
      imagePerson.alt=personagem.name;
      listItem.appendChild(imagePerson);
      listItem.innerHTML+=personagem.name;
      //listItem.textContent=personagem.name;
      personagensList.appendChild(listItem);
      
    });
  }) .catch(error=>{console.error('Ocorreu um erro ao buscar os personagens:',error)});


  const response = await fetch(apiUrl);
  //error
  const data = await response.json();
  console.log(data);
}

*/