//let board = document.querySelector('.board')
let board = document.getElementById('board'); //pegou a caixa (div)geral onde tudo está englobado
let buttonAdd = document.getElementById('add');//pegou o botão

let inputAdd = document.getElementById('novaTarefa');
//validação
let listaTarefas = []; //add as informações (localStorage)
if(localStorage.getItem('listaTarefas')){
    listaTarefas = JSON.parse(localStorage.getItem('listaTarefas')) //parse converte JSON em array
} else {
    localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));
}

//stringify converte um array em JSON
localStorage.setItem('listaTarefas',JSON.stringify(listaTarefas)); 
//chamando a função
mostrarNaTela(listaTarefas);

buttonAdd.onclick = function(event){ //aqui daremos funcionalidade ao botão

    //a partir daqui pegamos as divs e 'recriamos' toda a estrutura html
    let valorDigitado = inputAdd.value;
    //add dentro da array informações especificas
    listaTarefas.push(valorDigitado);

    // imgCheck.onclick = function(event){
    //     tarefa.remove();
    // }   
    gerarTarefa(valorDigitado, listaTarefas.length - 1); 

    // let tarefa = document.createElement('div'); //<div> 
    // tarefa.setAttribute('class', 'tarefa');

    // let titulo = document.createElement('div');
    // titulo.setAttribute('class', 'col-md-8');
    // titulo.textContent = valorDigitado;

    // let buttonCheck = document.createElement('div');
    // buttonCheck.setAttribute('class', 'col-md-2');

    // let imgCheck = document.createElement('input');
    // imgCheck.setAttribute('type', 'checkbox');

    // //se colocar a imagem
    // //let imgCheck = document.createElement('img');
    // //imgCheck.setAttribute('class', 'icon');
    // //imgCheck.setAttribute('scr', 'img/botaoCheck.jpg');

    // //para colocar dentro da nossa tarefa (um elemento, que foi criado por mim, dentro do outro)
    // //appendChild serve para englobar todo 'novo html' que foi feito
    // buttonCheck.appendChild(imgCheck);
    
    // tarefa.appendChild(titulo);
    // tarefa.appendChild(buttonCheck);
    // board.appendChild(tarefa); //id board que engloba tudo

    //atualizando a nova array com as informações de dentro
    localStorage.setItem('listaTarefas',JSON.stringify(listaTarefas));
}

function mostrarNaTela(listaTarefas){
    //para cada item da minha lista de tarefas eu 'pego' a fç gerar tarefa
    //for(let item of listaTarefas){ //seria o msm do foreach
        //gerarTarefa(item);
    //}

    board.innerHTML = "" //mandando colocar nada dentro do meu html, limpar o board

    //para aparecer as posições automaticamente
    //para cada item do array ele vai executar essa função
    //todo forEach vai ser nessa ordem -> 1 valor, depois posicao
    listaTarefas.forEach(function(valor,posicao){
        gerarTarefa(valor,posicao)
    })
}

function gerarTarefa(valorDigitado, posicao){
    let tarefa = document.createElement('div'); //<div> 
    tarefa.setAttribute('class', 'tarefa');
    //criando atributo para cada elemento ter uma identidade
    tarefa.setAttribute('posicao', posicao);

    let titulo = document.createElement('div');
    titulo.setAttribute('class', 'col-md-8');
    titulo.textContent = valorDigitado;

    let buttonCheck = document.createElement('div');
    buttonCheck.setAttribute('class', 'col-md-2');

    let imgCheck = document.createElement('input');
    imgCheck.setAttribute('type', 'checkbox');

    //se colocar a imagem
    //let imgCheck = document.createElement('img');
    //imgCheck.setAttribute('class', 'icon');
    //imgCheck.setAttribute('scr', 'img/botaoCheck.jpg');

    //para colocar dentro da nossa tarefa (um elemento, que foi criado por mim, dentro do outro)
    //appendChild serve para englobar todo 'novo html' que foi feito
    buttonCheck.appendChild(imgCheck);

    //vai retornar qual botao foi clicado (event.target)
    imgCheck.onclick = function(event){
        // let tarefaPai = event.target.parentNode.parentNode
        // tarefaPai.remove();

        //console.log(listaTarefas)
        let posicaoTarefa = tarefa.getAttribute('posicao')
        listaTarefas = listaTarefas.filter(function(valor, posicao){
            return posicao != posicaoTarefa
        })
        //depois de filtrar (tirar um elemento) mostrar na tela as novas posições
        mostrarNaTela(listaTarefas)

        //att o localStorage (deletar)
        localStorage.setItem('listaTarefas',JSON.stringify(listaTarefas))

        //console.log(listaTarefas)
        tarefa.remove(); //msm coisa acima (com tarefaPai), fazem a msm coisa
        //console.log(event.target.parentNode.parentNode) //(parentNode) me mostra o 'pai' do botão clicado - 2 parentNode (pegar avô)
    }

    tarefa.appendChild(titulo);
    tarefa.appendChild(buttonCheck);
    board.appendChild(tarefa); //id board que engloba tudo
}


